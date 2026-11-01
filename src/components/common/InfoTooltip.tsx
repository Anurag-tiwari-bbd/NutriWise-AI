import React, { useState, useRef, useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';
import { PLAIN_LANGUAGE_TERMS, TermKey } from '../../data/plainLanguageTerms';

// Global single-open state management
let activeTooltipId: string | null = null;
const tooltipListeners = new Set<(id: string | null) => void>();

function setActiveTooltip(id: string | null) {
  activeTooltipId = id;
  tooltipListeners.forEach((listener) => listener(id));
}

export interface InfoTooltipProps {
  /** Key referencing a predefined term in plainLanguageTerms.ts */
  termKey?: TermKey;
  /** Custom title if not using a predefined term */
  title?: string;
  /** Custom plain-language explanation if not using a predefined term */
  explanation?: string;
  /** Custom aria-label for accessibility (e.g., "Learn what BMR means") */
  ariaLabel?: string;
  /** Preferred placement: 'bottom' | 'top' | 'auto' (default: 'bottom') */
  placement?: 'bottom' | 'top' | 'auto';
  /** Horizontal alignment: 'left' | 'center' | 'right' | 'auto' (default: 'auto') */
  align?: 'left' | 'center' | 'right' | 'auto';
  /** Size variant of the circular "i" icon */
  size?: 'sm' | 'md';
  /** Additional wrapper class for the trigger button */
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  termKey,
  title: customTitle,
  explanation: customExplanation,
  ariaLabel: customAriaLabel,
  placement = 'bottom',
  align = 'auto',
  size = 'md',
  className = '',
}) => {
  const instanceId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; arrowPlacement: 'top' | 'bottom' }>({
    top: 0,
    left: 0,
    arrowPlacement: 'top',
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Retrieve content from dictionary or custom props
  const termData = termKey ? PLAIN_LANGUAGE_TERMS[termKey] : undefined;
  const title = customTitle || termData?.title || 'Help Information';
  const explanation = customExplanation || termData?.explanation || 'Explanation not available.';
  const ariaLabel = customAriaLabel || termData?.ariaLabel || `Learn what ${title} means`;

  // Sync with global single-active tooltip manager
  useEffect(() => {
    const handleActiveChange = (id: string | null) => {
      if (id !== instanceId && isOpen) {
        setIsOpen(false);
      }
    };
    tooltipListeners.add(handleActiveChange);
    return () => {
      tooltipListeners.delete(handleActiveChange);
    };
  }, [instanceId, isOpen]);

  // Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Compute position relative to viewport
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !isOpen || isMobile) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverEl = popoverRef.current;
    
    // Header height detection to ensure popover never renders behind fixed navbar
    const headerEl = document.querySelector('header');
    const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 80;

    const popoverWidth = popoverEl ? popoverEl.offsetWidth : 300;
    const popoverHeight = popoverEl ? popoverEl.offsetHeight : 160;

    const gap = 8;
    const margin = 12;
    const safeTopLimit = Math.max(headerBottom + 4, margin);

    // Calculate horizontal position (clamped to viewport)
    let left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
    if (align === 'left') {
      left = triggerRect.left;
    } else if (align === 'right') {
      left = triggerRect.right - popoverWidth;
    }

    if (left < margin) {
      left = margin;
    } else if (left + popoverWidth > window.innerWidth - margin) {
      left = window.innerWidth - margin - popoverWidth;
    }

    // Default: Below trigger
    let top = triggerRect.bottom + gap;
    let arrowPlacement: 'top' | 'bottom' = 'top';

    const spaceBelow = window.innerHeight - margin - (triggerRect.bottom + gap);
    const spaceAbove = triggerRect.top - gap - safeTopLimit;

    // Check if placement should be flipped to top
    if (placement === 'top') {
      if (spaceAbove >= popoverHeight) {
        top = triggerRect.top - gap - popoverHeight;
        arrowPlacement = 'bottom';
      } else {
        top = triggerRect.bottom + gap;
        arrowPlacement = 'top';
      }
    } else {
      // Default: bottom
      if (spaceBelow < popoverHeight && spaceAbove >= popoverHeight) {
        top = triggerRect.top - gap - popoverHeight;
        arrowPlacement = 'bottom';
      } else {
        top = triggerRect.bottom + gap;
        arrowPlacement = 'top';
      }
    }

    // Safety clamp: never bleed above safeTopLimit or below window height
    if (top < safeTopLimit) {
      // If trigger itself is above header, push below trigger
      top = Math.max(safeTopLimit, triggerRect.bottom + gap);
      arrowPlacement = 'top';
    }
    if (top + popoverHeight > window.innerHeight - margin) {
      top = Math.max(safeTopLimit, window.innerHeight - margin - popoverHeight);
    }

    setCoords({ top, left, arrowPlacement });
  }, [isOpen, isMobile, placement, align]);

  // Recalculate position on scroll, resize, and orientationchange
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('orientationchange', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('orientationchange', handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  // Recalculate once popover mounts or resizes
  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });
    observer.observe(popoverRef.current);

    return () => observer.disconnect();
  }, [isOpen, updatePosition]);

  // Handle clicking outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
        setActiveTooltip(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  // Handle Escape key to close and refocus trigger
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveTooltip(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Trigger toggle click
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
      setActiveTooltip(null);
    } else {
      setIsOpen(true);
      setActiveTooltip(instanceId);
    }
  };

  // Hover handlers with debounce
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
    setActiveTooltip(instanceId);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveTooltip(null);
    }, 150);
  };

  const handlePopoverMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handlePopoverMouseLeave = () => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveTooltip(null);
    }, 150);
  };

  const sizeClasses = {
    sm: 'w-3.5 h-3.5 text-[9px]',
    md: 'w-4 h-4 text-[10px]',
  };

  return (
    <>
      {/* Trigger Button (Remains inline inside parent component) */}
      <span className={`inline-flex items-center align-middle ml-1.5 select-none ${className}`}>
        <button
          ref={triggerRef}
          type="button"
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={handleToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            setIsOpen(true);
            setActiveTooltip(instanceId);
          }}
          onBlur={() => {
            closeTimeoutRef.current = setTimeout(() => {
              setIsOpen(false);
              setActiveTooltip(null);
            }, 200);
          }}
          className={`rounded-full flex items-center justify-center font-bold font-sans transition-all duration-150 border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${sizeClasses[size]} ${
            isOpen
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
              : 'text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100 hover:text-emerald-900 border-emerald-200/90 shadow-subtle dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-900/60'
          }`}
        >
          <span className="sr-only">{ariaLabel}</span>
          <span aria-hidden="true" className="font-serif italic font-bold leading-none">i</span>
        </button>
      </span>

      {/* Portal Container (Rendered directly in document.body to bypass all overflows & stacking contexts) */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        isMobile ? (
          /* Mobile View: High-Accessibility Bottom Sheet / Dialog with Backdrop */
          <div className="fixed inset-0 z-[9999] flex flex-col justify-end pointer-events-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
              onClick={() => {
                setIsOpen(false);
                setActiveTooltip(null);
              }}
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal */}
            <div
              ref={popoverRef}
              role="dialog"
              aria-label={title}
              className="relative w-full max-w-lg mx-auto bg-white dark:bg-[#111C30] rounded-t-3xl shadow-2xl border-t border-emerald-200/80 dark:border-[#26364D] p-5 z-10 animate-slide-up flex flex-col gap-3"
            >
              {/* Drag handle pill */}
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto -mt-1 mb-1" />

              {/* Title & Close */}
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100/80 dark:border-[#26364D]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                    {title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setActiveTooltip(null);
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#17243A] transition-colors"
                  aria-label="Close explanation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Plain-Language Content */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {explanation}
              </p>

              {/* Dismiss Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">NutriWise Plain-Language Guide</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setActiveTooltip(null);
                  }}
                  className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-bold text-xs rounded-xl transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Floating Popover: Positioned dynamically via getBoundingClientRect() */
          <div
            ref={popoverRef}
            role="dialog"
            aria-label={title}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="z-[9999] w-72 sm:w-80 p-4 bg-white dark:bg-[#111C30] rounded-2xl shadow-2xl border border-emerald-200/90 dark:border-[#26364D] ring-1 ring-slate-900/10 dark:ring-black/40 text-slate-700 dark:text-slate-200 pointer-events-auto transition-opacity duration-150 animate-fade-in"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100/80 dark:border-[#26364D]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Info className="w-3 h-3" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs tracking-tight">
                  {title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setActiveTooltip(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#17243A] transition-colors"
                aria-label="Close tooltip"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Explanation Content */}
            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {explanation}
            </p>

            {/* Footer with Hint */}
            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-[#26364D] flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span>Plain-Language Help</span>
              <span className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">Press Esc to close</span>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
};
