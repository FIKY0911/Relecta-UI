import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'attention' | 'warning' | 'critical';
  className?: string;
}

export const Badge = ({ children, variant = 'success', className = '' }: BadgeProps) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    attention: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
