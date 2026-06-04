import type { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, className = '', ...props }: LabelProps) => {
  return (
    <label 
      className={`block text-sm font-bold text-slate-900 mb-2 ${className}`} 
      {...props}
    >
      {children}
    </label>
  );
};
