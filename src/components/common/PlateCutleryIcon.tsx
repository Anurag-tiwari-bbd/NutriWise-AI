import React from 'react';

interface PlateCutleryIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * PlateCutleryIcon - Dining place setting emblem:
 * A round dining plate centered between a 3-tine fork on the left and a knife on the right.
 * Designed to conform to Lucide icon style (24x24 viewBox, stroke-width 2, rounded caps).
 */
export const PlateCutleryIcon: React.FC<PlateCutleryIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Center Dining Plate */}
      <circle cx="12" cy="12" r="4" />
      {/* Left Fork: 3 tines and handle */}
      <path d="M2.5 4v3a1.5 1.5 0 0 0 3 0V4" />
      <path d="M4 4v16" />
      {/* Right Knife: spine, blade cutting edge, and handle */}
      <path d="M18.5 4v16" />
      <path d="M18.5 4c1.5 0 2.5 1 2.5 3v3c0 .8-.8 1.5-2.5 1.5" />
    </svg>
  );
};
