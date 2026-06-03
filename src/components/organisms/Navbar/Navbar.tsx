import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography/Typography';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Problem', href: '#masalah' },
    { label: 'Features', href: '#fitur' },
    { label: 'Benefits', href: '#tentang' },
  ];

  // Fungsi logis untuk menangani scroll ke posisi paling atas halaman
  const scrollToTop = (e) => {
    e.preventDefault(); // Mencegah reload halaman atau manipulasi URL hash bawaan tag <a>
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Efek transisi bergeser halus
    });
    setMenuOpen(false); // Menutup menu mobile jika logo diklik saat menu terbuka
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-hairline-soft px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO BRAND (Diperbarui dengan fungsi Smooth Scroll ke Atas) */}
        <a href="/" onClick={scrollToTop} className="flex items-center gap-2 select-none">
          <Typography variant="h3" className="text-primary font-bold tracking-tight">
            Relecta
          </Typography>
        </a>

        {/* Toggle Menu Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-full border border-slate-200 text-ink transition hover:bg-slate-100"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen ? 'true' : 'false'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-sm font-bold text-ink hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Aksi Autentikasi Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="secondary" className="hidden sm:block">Log In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mt-4 rounded-3xl border border-hairline-soft bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3">
            
            {/* Menu Navigasi Mobile */}
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-sm font-bold text-ink hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Aksi Autentikasi Mobile */}
            <div className="flex flex-col gap-3 pt-3 border-t border-hairline-soft">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Log In</Button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
