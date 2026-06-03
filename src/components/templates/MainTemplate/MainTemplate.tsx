import type { ReactNode } from "react";
import { Navbar } from '../../organisms/Navbar/Navbar';
import { Footer } from '../../organisms/Footer/Footer';

interface MainTemplateProps {
  children: ReactNode;
}

export const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
