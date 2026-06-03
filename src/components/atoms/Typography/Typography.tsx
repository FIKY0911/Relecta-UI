import type { ReactNode, ElementType } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: ReactNode;
  className?: string;
}

export const Typography = ({ variant = 'body', children, className = '' }: TypographyProps) => {
  const variants = {
    h1: 'text-[48px] font-medium leading-tight',
    h2: 'text-[36px] font-medium leading-tight',
    h3: 'text-[24px] font-medium leading-tight',
    body: 'text-[16px] leading-normal',
    caption: 'text-[12px] leading-tight',
  };

  const Component = (variant.startsWith('h') ? variant : 'p') as ElementType;

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};
