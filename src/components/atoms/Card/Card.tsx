import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'feature' | 'promo';
}

export const Card = ({ children, variant = 'default', className = '', ...props }: CardProps) => {
  const variants = {
    default: 'bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/60 p-6',
    feature: 'bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow',
    promo: 'bg-slate-950 text-white rounded-[2.5rem] p-10',
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
