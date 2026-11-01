import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'mint' | 'slate' | 'amber' | 'rose' | 'blue';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
    mint: 'bg-teal-50 text-teal-800 border-teal-200 ring-teal-500/20 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-400/20 dark:bg-[#17243A] dark:text-slate-300 dark:border-[#26364D]',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
    rose: 'bg-rose-50 text-rose-800 border-rose-200 ring-rose-500/20 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60',
    blue: 'bg-sky-50 text-sky-800 border-sky-200 ring-sky-500/20 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs md:text-sm px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm whitespace-nowrap shrink-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span className="whitespace-nowrap leading-none">{children}</span>
    </span>
  );
};
