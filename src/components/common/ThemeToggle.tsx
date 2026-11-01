import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('nutriwise_theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try {
        localStorage.setItem('nutriwise_theme', 'dark');
      } catch {
        // Ignore quota error
      }
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('nutriwise_theme', 'light');
      } catch {
        // Ignore quota error
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  if (!hasMounted) return null;

  return (
    <aside aria-label="Appearance controls" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center ${
          isDark
            ? 'bg-slate-900/95 text-amber-300 border-slate-700/90 hover:border-amber-400 shadow-amber-500/10'
            : 'bg-white/95 text-slate-700 border-slate-200/90 hover:border-emerald-400 hover:text-emerald-700 shadow-slate-900/15'
        }`}
      >
        <span className="sr-only">Toggle dark mode</span>
        {isDark ? (
          <Sun className="w-5 h-5 sm:w-5 sm:h-5 transition-transform duration-500 rotate-0 hover:rotate-90 animate-fade-in text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 sm:w-5 sm:h-5 transition-transform duration-500 rotate-0 hover:-rotate-12 animate-fade-in text-slate-700 hover:text-emerald-700" />
        )}

        {/* Floating Tooltip Bubble */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white border border-slate-700">
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </span>
      </button>
    </aside>
  );
};
