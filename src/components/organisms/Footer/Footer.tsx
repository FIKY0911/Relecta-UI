import { Typography } from '../../atoms/Typography/Typography';

export const Footer = () => {
  // Fungsi logis untuk mengarahkan layar langsung ke posisi paling atas dokumen
  const scrollToTop = (e) => {
    e.preventDefault(); // Mencegah manipulasi URL hash bawaan tag anchor
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Transisi pergeseran layar yang halus
    });
  };

  return (
    <footer className="bg-white border-t border-hairline-soft pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom Informasi Utama & Logo */}
          <div className="col-span-1 md:col-span-2">
            {/* Logo Relecta di klik otomatis scroll ke paling atas */}
            <a href="/" onClick={scrollToTop} className="inline-block select-none mb-6">
              <Typography variant="h3" className="text-primary font-bold">Relecta</Typography>
            </a>
            <Typography variant="body" className="text-slate-500 max-w-sm leading-relaxed">
              Platform digital pengelolaan limbah elektronik resmi untuk masa depan yang lebih hijau.
            </Typography>
          </div>
          
          {/* Kolom Tautan Produk (Smooth Scroll Internal Navigasi) */}
          <div>
            <Typography variant="body" className="font-bold mb-6">Product</Typography>
            <ul className="space-y-4">
              <li>
                {/* Dihubungkan ke puncak halaman */}
                <a href="/" onClick={scrollToTop} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                {/* Dihubungkan ke id="masalah" di LandingPage */}
                <a href="#masalah" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  Problem
                </a>
              </li>
              <li>
                {/* Dihubungkan ke id="fitur" di LandingPage */}
                <a href="#fitur" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                {/* Dihubungkan ke id="tentang" di LandingPage */}
                <a href="#tentang" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  Benefits
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom Informasi Perusahaan */}
          <div>
            <Typography variant="body" className="font-bold mb-6">Company</Typography>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bagian Hak Cipta & Sosial Media */}
        <div className="pt-8 border-t border-hairline-soft flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="caption" className="text-slate-400">
            © 2026 Relecta. All rights reserved.
          </Typography>
          <div className="flex gap-6">
            <span className="text-sm font-medium text-slate-400 cursor-pointer hover:text-primary transition-colors">Twitter</span>
            <span className="text-sm font-medium text-slate-400 cursor-pointer hover:text-primary transition-colors">Instagram</span>
            <span className="text-sm font-medium text-slate-400 cursor-pointer hover:text-primary transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
