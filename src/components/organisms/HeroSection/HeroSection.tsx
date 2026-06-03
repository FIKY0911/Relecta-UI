import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography/Typography';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative bg-white pt-24 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <Typography variant="h1" className="mb-6 max-w-4xl mx-auto lg:text-[64px] leading-[1.1]">
          Buang Sampah Elektronik <span className="text-primary">Semudah Memesan Kurir</span>
        </Typography>
        <Typography variant="body" className="mb-10 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Relecta menghubungkan Anda dengan layanan pengelolaan limbah elektronik resmi. 
          Praktis, aman, dan berkontribusi langsung menjaga lingkungan.
        </Typography>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button variant="primary" className="w-full sm:w-auto px-10 py-5 text-base">
              Mulai Sekarang
            </Button>
          </Link>
          <Button variant="secondary" className="w-full sm:w-auto px-10 py-5 text-base">
            Pelajari Selengkapnya
          </Button>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-0" />
    </section>
  );
};
