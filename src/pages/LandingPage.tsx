import { MainTemplate } from '../components/templates/MainTemplate/MainTemplate';
import { HeroSection } from '../components/organisms/HeroSection/HeroSection';
import { FeatureSection } from '../components/organisms/FeatureSection/FeatureSection';
import { Typography } from '../components/atoms/Typography/Typography';
import { Card } from '../components/atoms/Card/Card';
import { Button } from '../components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Leaf, BarChart3, Users, Recycle } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Lokasi Tidak Terdeteksi',
    description: 'Masyarakat sulit menemukan lokasi bank sampah elektronik resmi di sekitar mereka.',
  },
  {
    title: 'Akses Layanan Sulit',
    description: 'Kesulitan dalam mengakses layanan pengangkutan limbah elektronik yang terpercaya.',
  },
  {
    title: 'Kurang Edukasi Nilai',
    description: 'Minimnya informasi mengenai nilai ekonomis dan dampak lingkungan dari limbah elektronik.',
  },
];

const FEATURES = [
  {
    title: 'Maps Interaktif',
    description: 'Temukan lokasi bank sampah elektronik terdekat dengan navigasi yang mudah.',
  },
  {
    title: 'Pemesanan Kurir',
    description: 'Jadwalkan penjemputan limbah elektronik langsung dari rumah atau kantor Anda.',
  },
  {
    title: 'Estimator Nilai',
    description: 'Hitung estimasi nilai ekonomis limbah Anda sebelum melakukan pemesanan.',
  },
];

const STATS = [
  { icon: <Recycle size={24} className="text-emerald-600" />, value: '15,400+', label: 'Kg Limbah Didaur Ulang' },
  { icon: <Users size={24} className="text-cobalt" />, value: '4,800+', label: 'Pengguna Aktif' },
  { icon: <BarChart3 size={24} className="text-amber-600" />, value: '98%', label: 'Tingkat Kepuasan Layanan' },
];

const BENEFITS = [
  { icon: <ShieldCheck size={20} className="text-green-600" />, text: 'Layanan resmi milik pemerintah yang terjamin keamanannya.' },
  { icon: <Zap size={20} className="text-amber-500" />, text: 'Proses pemesanan yang cepat, transparan, dan real-time.' },
  { icon: <Leaf size={20} className="text-emerald-500" />, text: 'Membantu mengurangi pencemaran zat kimia beracun di lingkungan.' },
];

export const LandingPage = () => {
  return (
    // Kita berikan id="home" di sini sebagai jangkar posisi paling atas halaman
    <MainTemplate>
      <div id="home">
        <HeroSection />
      </div>

      {/* Stat Overlay Section */}
      <section className="relative z-20 -mt-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, idx) => (
            <Card key={idx} className="flex items-center gap-4 p-6 bg-white shadow-xl border border-hairline-soft rounded-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 bg-slate-50 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <Typography variant="h3" className="font-extrabold text-ink-deep leading-tight">{stat.value}</Typography>
                <Typography variant="caption" className="text-slate-500 font-medium">{stat.label}</Typography>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Target ID: #masalah */}
      <div id="masalah" className="scroll-mt-24">
        <FeatureSection 
          title="Masalah yang Kami Hadapi"
          subtitle="Limbah elektronik yang tidak terkelola dengan baik mengandung zat berbahaya B3 yang merusak ekosistem kita."
          features={PROBLEMS}
          variant="soft"
        />
      </div>

      {/* Solution Banner Interaktif */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Card variant="promo" className="relative overflow-hidden flex flex-col items-center text-center py-20 px-8 rounded-3xl bg-gradient-to-br from-cobalt to-indigo-900 shadow-2xl">
            <Typography variant="h2" className="text-white mb-4 relative z-10 font-bold max-w-3xl leading-tight">
              Solusi Digital Terpadu untuk Masa Depan Hijau Indonesia
            </Typography>
            <Typography variant="body" className="text-white/80 max-w-2xl mb-10 relative z-10 leading-relaxed">
              Relecta hadir sebagai jembatan inklusif antara masyarakat dan jaringan pengumpul sampah elektronik resmi pemerintah, memastikan perangkat bekas Anda dimurnikan kembali dengan aman.
            </Typography>
            <div className="relative z-10 flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button variant="buy" className="bg-accent text-green-900 hover:bg-accent/90 shadow-lg px-8 py-3.5 font-bold flex items-center gap-2">
                  Mulai Ambil Peran Sekarang
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </Card>
        </div>
      </section>

      {/* Target ID: #fitur */}
      <div id="fitur" className="scroll-mt-24">
        <FeatureSection 
          title="Fitur Unggulan"
          subtitle="Kemudahan aksesibilitas penuh dalam setiap genggaman langkah daur ulang Anda."
          features={FEATURES}
        />
      </div>

      {/* Target ID: #tentang */}
      <div id="tentang" className="scroll-mt-24">
        <section className="py-24 px-6 bg-slate-50/60 border-t border-b border-hairline-soft">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Bagian Kiri Teks Keunggulan */}
            <div>
              <Typography variant="h2" className="mb-4 font-bold text-ink-deep tracking-tight leading-tight">
                Mengapa Memilih Platform Relecta?
              </Typography>
              <Typography variant="body" className="text-slate-500 mb-10 leading-relaxed">
                Kami memadukan akuntabilitas regulasi lingkungan hidup dengan kenyamanan teknologi modern demi proses penanggulangan e-waste yang bebas hambatan.
              </Typography>
              
              <div className="space-y-6">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-white border border-hairline-soft rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div>
                      <Typography variant="body" className="text-slate-700 font-medium leading-relaxed">
                        {benefit.text}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/register">
                  <Button variant="secondary" className="group font-bold text-cobalt flex items-center gap-2 border-cobalt hover:bg-cobalt/5">
                    Pelajari Regulasi Selengkapnya
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bagian Kanan Visual CSS Mockup */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-[2.5rem] border border-hairline-soft shadow-2xl overflow-hidden flex flex-col justify-between p-8 md:p-12 relative z-10">
                <div className="w-full h-full bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-cobalt/10 text-cobalt rounded-2xl flex items-center justify-center mb-4">
                    <Recycle size={32} />
                  </div>
                  <Typography variant="body" className="font-bold text-ink-deep mb-1">
                    Sistem Pelacakan Manifest Hijau
                  </Typography>
                  <Typography variant="caption" className="text-slate-400 max-w-xs leading-relaxed">
                    Menampilkan representasi grafis perjalanan limbah Anda menuju pusat peleburan resmi yang tersertifikasi secara transparan.
                  </Typography>
                </div>
              </div>
              
              {/* Ornamen Background Visual */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-[2.5rem] -z-0 animate-pulse" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-0" />
            </div>

          </div>
        </section>
      </div>

    </MainTemplate>
  );
};
