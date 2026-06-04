import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from '../../organisms/Sidebar/Sidebar';
import { Typography } from '../../atoms/Typography/Typography';
import { Menu, X } from 'lucide-react';

interface DashboardTemplateProps {
  title: string;
  children: ReactNode;
}

export const DashboardTemplate = ({ title, children }: DashboardTemplateProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:flex lg:min-h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="lg:hidden">
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between gap-4">
            <Typography variant="h3" className="text-emerald-600 font-black tracking-tight">Relecta</Typography>
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-2 rounded-full border border-slate-200 text-slate-900 transition hover:bg-slate-100"
              aria-label={sidebarOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className={`fixed inset-0 z-50 transition-all duration-300 ${sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/40"
              onClick={() => setSidebarOpen(false)}
              aria-label="Tutup sidebar"
            />
            <div className="relative h-full w-full max-w-xs bg-white shadow-2xl">
              <Sidebar />
            </div>
          </div>
        </div>

        <main className="flex-grow p-4 sm:p-6 lg:p-8 pt-6 lg:pt-8">
          <header className="mb-8">
            <Typography variant="h2">{title}</Typography>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};
