import type { ReactNode } from 'react';
import { Typography } from '../../atoms/Typography/Typography';

interface AuthTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export const AuthTemplate = ({ title, subtitle, children, footer }: AuthTemplateProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <Typography variant="h2" className="mb-2">{title}</Typography>
          <Typography variant="body" className="text-ink">{subtitle}</Typography>
        </div>
        
        <div className="bg-white rounded-xxxl p-xxl border border-hairline-soft shadow-sm">
          {children}
          
          <div className="mt-8 pt-8 border-t border-hairline-soft text-center">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};
