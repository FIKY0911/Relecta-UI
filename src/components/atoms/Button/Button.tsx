import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'buy' | 'secondary';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    buy: 'btn-buy',
    secondary: 'btn-secondary',
  };

  return (
    <button 
      className={`${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
