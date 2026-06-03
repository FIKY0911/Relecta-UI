import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'feature' | 'promo';
}

export const Card = ({ children, variant = 'default', className = '', ...props }: CardProps) => {
  const variants = {
    default: 'bg-white rounded-xxl border border-hairline-soft p-6',
    feature: 'bg-white rounded-xxxl p-xxl border border-hairline-soft shadow-sm',
    promo: 'bg-ink-deep text-white rounded-xxxl p-xxxl',
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
