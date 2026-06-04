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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <Typography variant="h2" className="mb-2 font-black text-slate-900">{title}</Typography>
          <Typography variant="body" className="text-slate-600">{subtitle}</Typography>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          {children}
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};
