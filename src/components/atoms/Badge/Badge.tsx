import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'attention' | 'warning' | 'critical';
  className?: string;
}

export const Badge = ({ children, variant = 'success', className = '' }: BadgeProps) => {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800',
    attention: 'bg-violet-100 text-violet-800',
    warning: 'bg-amber-100 text-amber-800',
    critical: 'bg-rose-100 text-rose-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
