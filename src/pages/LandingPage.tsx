// src/pages/LandingPage.tsx

import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  FlaskConical,
  Leaf,
  Lock,
  Mail,
  Map,
  MapPin,
  Menu,
  PlayCircle,
  Recycle,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
};

type ProblemItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const stats: StatItem[] = [
  {
    icon: <Recycle size={30} />,
    value: "15.400+ kg",
    label: "Limbah elektronik tersalurkan",
    color: "green",
  },
  {
    icon: <Users size={30} />,
    value: "4.800+",
    label: "Pengguna aktif",
    color: "purple",
  },
  {
    icon: <Star size={30} />,
    value: "98%",
    label: "Tingkat kepuasan layanan",
    color: "orange",
  },
];

const problems: ProblemItem[] = [
  {
    icon: <FlaskConical size={34} />,
    title: "Kesehatan Lingkungan",
    description:
      "Limbah elektronik mengandung zat berbahaya (B3) seperti timbal dan merkuri yang merusak ekosistem jika dibuang sembarangan.",
    color: "green",
  },
  {
    icon: <Lock size={34} />,
    title: "Keamanan Data",
    description:
      "Perangkat bekas yang tidak dihancurkan dengan benar membawa risiko tinggi kebocoran data pribadi.",
    color: "purple",
  },
  {
    icon: <MapPin size={34} />,
    title: "Aksesibilitas",
    description:
      "Masyarakat umum kesulitan menemukan dan menjangkau tempat pembuangan limbah elektronik resmi yang terpercaya.",
    color: "orange",
  },
];

const features = [
  {
    icon: <Map size={34} />,
    title: "Maps Interaktif",
    description: "Temukan lokasi bank sampah elektronik terdekat dengan navigasi yang mudah.",
    color: "purple",
  },
  {
    icon: <Truck size={34} />,
    title: "Pemesanan Kurir",
    description: "Jadwalkan penjemputan limbah elektronik langsung dari rumah atau kantor Anda.",
    color: "green",
  },
  {
    icon: <CircleDollarSign size={34} />,
    title: "Estimator Nilai",
    description: "Hitung estimasi nilai ekonomis limbah Anda sebelum melakukan pemesanan.",
    color: "orange",
  },
];

const getStatStyle = (color: string) => {
  const styles: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-600",
    purple: "bg-violet-100 text-violet-600",
    orange: "bg-amber-100 text-amber-500",
  };

  return styles[color];
};

const getProblemStyle = (color: string) => {
  const styles: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-amber-50 text-amber-500",
  };

  return styles[color];
};

export const LandingPage = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>
        
        {/* Blur Blobs */}
        <div className="absolute -left-20 top-0 h-[600px] w-[600px] rounded-full bg-emerald-100/40 blur-[120px] animate-pulse" />
        <div className="absolute -right-20 top-20 h-[500px] w-[500px] rounded-full bg-violet-100/40 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-50/30 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-50/40 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="fixed left-1/2 top-6 z-50 flex w-[94%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-[2rem] border border-white/40 bg-white/70 px-8 py-4 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-lg shadow-emerald-800/40 flex-shrink-0 transition-transform group-hover:scale-105">
            <img
              src="/src/assets/Logo.jpeg"
              alt="Relecta Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Relecta<span className="text-emerald-500">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-slate-700 lg:flex">
          <a href="#" className="relative text-emerald-600">
            Beranda
            <span className="absolute -bottom-3 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-emerald-500" />
          </a>
          <a href="#problem" className="transition hover:text-emerald-600">
            Masalah
          </a>
          <a href="#fitur" className="transition hover:text-emerald-600">
            Fitur
          </a>
          <a href="#cara-kerja" className="transition hover:text-emerald-600">
            Cara Kerja
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-emerald-500 px-7 py-3 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-700"
          >
            Jadwalkan Pickup
          </Link>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 lg:hidden">
          <Menu size={22} />
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto grid w-[90%] max-w-7xl items-center gap-14 pb-20 pt-40 lg:grid-cols-2 lg:pt-48">
        <div className="relative">
          {/* Floating decorative icons */}
          <div className="absolute -left-12 top-0 -z-10 animate-bounce hidden xl:block opacity-40">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm">
              <Leaf size={24} />
            </div>
          </div>
          <div className="absolute -right-8 bottom-20 -z-10 animate-pulse hidden xl:block opacity-40">
            <div className="p-3 rounded-2xl bg-violet-50 text-violet-500 border border-violet-100 shadow-sm">
              <Recycle size={24} />
            </div>
          </div>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 backdrop-blur-sm px-5 py-2 text-xs font-black uppercase tracking-widest text-emerald-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Solusi e-waste resmi & ramah lingkungan
          </div>

          <h1 className="max-w-3xl text-6xl font-black leading-[1.1] tracking-tighter text-slate-950 md:text-7xl">
            Buang Sampah <br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Elektronik</span> <br />
            Tanpa Ribet
          </h1>

          <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-500">
            Relecta menghubungkan Anda dengan layanan pengelolaan limbah
            elektronik resmi. <span className="text-slate-900 font-bold">Praktis, aman, dan berkontribusi langsung</span> menjaga
            kelestarian lingkungan kita bersama.
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-10 py-5 font-black text-white shadow-2xl shadow-emerald-600/40 transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-emerald-600/60"
            >
              <CalendarDays size={20} />
              Jadwalkan Sekarang
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>

            <button className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-slate-200 bg-white px-10 py-5 font-black text-slate-900 transition-all hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-xl hover:shadow-emerald-500/10">
              <PlayCircle size={22} className="group-hover:text-emerald-500" />
              Lihat Cara Kerja
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-3 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                <ShieldCheck size={22} />
              </div>
              <span className="text-sm font-bold text-slate-700">Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                <Leaf size={22} />
              </div>
              <span className="text-sm font-bold text-slate-700">100% Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-transform group-hover:scale-110">
                <BadgeCheck size={22} />
              </div>
              <span className="text-sm font-bold text-slate-700">Terdaftar Resmi</span>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="relative mx-auto hidden w-full max-w-xl lg:flex items-center justify-center">
          <img
            src="/src/assets/Banner.png"
            alt="Relecta – Pilah Sampah Elektronik"
            className="w-full h-auto object-contain select-none scale-110"
            style={{ mixBlendMode: 'multiply' }}
            draggable={false}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-auto -mt-12 grid w-[90%] max-w-6xl gap-8 md:grid-cols-3 z-10">
        {stats.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-500/10"
          >
            {/* Hover decorative element */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10 ${getStatStyle(item.color)}`} />
            
            <div className="flex flex-col items-center gap-6 text-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg transition-transform duration-500 group-hover:rotate-[10deg] ${getStatStyle(
                  item.color
                )}`}
              >
                {item.icon}
              </div>
              <div>
                <p
                  className={`text-4xl font-black tracking-tighter ${
                    item.color === "green"
                      ? "text-emerald-600"
                      : item.color === "purple"
                      ? "text-violet-600"
                      : "text-amber-500"
                  }`}
                >
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                  {item.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Problem Section */}
      <section
        id="problem"
        className="relative mt-32 py-32 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />
        
        {/* Floating elements */}
        <div className="absolute left-10 top-20 text-emerald-100 animate-bounce delay-700 hidden lg:block opacity-50">
          <Recycle size={60} />
        </div>
        <div className="absolute right-20 bottom-20 text-violet-100 animate-pulse hidden lg:block opacity-50">
          <FlaskConical size={80} />
        </div>

        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="mb-20 flex flex-col items-center text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
              Tantangan e-waste
            </p>
            <h2 className="text-5xl font-black tracking-tight text-slate-950">
              Masalah yang <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kami Hadapi</span>
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-emerald-500" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {problems.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-[3rem] border border-white bg-white/50 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_100px_rgba(15,23,42,0.12)]"
              >
                <div
                  className={`mb-10 flex h-24 w-24 items-center justify-center rounded-[2.5rem] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${getProblemStyle(
                    item.color
                  )}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {item.title}
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-slate-500 font-medium">
                  {item.description}
                </p>
                
                <div className={`mt-8 flex h-1 w-12 rounded-full transition-all duration-500 group-hover:w-24 ${getProblemStyle(item.color)}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="relative mt-20 py-32 overflow-hidden bg-white">
        {/* Decorative background blur */}
        <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-violet-100/30 blur-[100px]" />
        <div className="absolute -left-20 bottom-20 text-amber-100 animate-bounce hidden lg:block opacity-50">
          <Star size={40} />
        </div>
        <div className="absolute right-10 top-20 text-emerald-100 animate-pulse hidden lg:block opacity-50">
          <Leaf size={50} />
        </div>

        <div className="mx-auto w-[90%] max-w-7xl relative">
          <div className="mb-20 flex flex-col items-center text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-violet-600">
              Fitur Unggulan
            </p>
            <h2 className="text-5xl font-black tracking-tight text-slate-950">
              Kemudahan dalam <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Setiap Langkah</span>
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-violet-500" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(15,23,42,0.1)] hover:border-violet-200"
              >
                <div
                  className={`mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] ${getProblemStyle(
                    item.color
                  )}`}
                >
                  <div className="text-violet-600">{item.icon}</div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight transition-colors group-hover:text-violet-600">
                  {item.title}
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-slate-500 font-medium">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-violet-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                  Pelajari Selengkapnya <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="relative py-32 bg-slate-50/50">
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
              Alur Pengguna
            </p>
            <h2 className="text-5xl font-black tracking-tight text-slate-950">
              Jadwalkan pickup hanya <br /> <span className="text-emerald-600">dalam 4 langkah</span>
            </h2>
            <p className="mt-8 text-xl leading-relaxed text-slate-500 font-medium">
              Relecta membantu proses pengumpulan limbah elektronik menjadi
              sederhana, aman, dan dapat dilacak sepenuhnya.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
            {/* Connection line for desktop */}
            <div className="absolute top-28 left-0 right-0 h-1 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 hidden lg:block -z-10" />

            {[
              {
                title: "Pemilihan Perangkat",
                desc: "Identifikasi & pilih jenis perangkat elektronik yang akan didaur ulang.",
                icon: <Recycle size={24} />
              },
              {
                title: "Penentuan Lokasi",
                desc: "Masukkan alamat lengkap atau tandai titik koordinat penjemputan.",
                icon: <MapPin size={24} />
              },
              {
                title: "Proses Penjemputan",
                desc: "Kurir mitra menjemput barang sesuai jadwal yang Anda tentukan.",
                icon: <Truck size={24} />
              },
              {
                title: "Pengelolaan Resmi",
                desc: "Barang dikelola di fasilitas resmi untuk daur ulang yang aman.",
                icon: <ShieldCheck size={24} />
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="group relative rounded-[2.5rem] border border-white bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-black text-white shadow-lg shadow-emerald-600/30 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-500 font-medium">
                  {step.desc}
                </p>
                
                <div className="mt-8 flex items-center gap-3 text-emerald-600/30 transition-colors group-hover:text-emerald-500">
                  {step.icon}
                  <div className="h-0.5 w-full bg-current rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto mb-32 w-[90%] max-w-7xl">
        {/* Extreme Glow */}
        <div className="absolute -inset-4 rounded-[4rem] bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-600 opacity-20 blur-3xl"></div>
        
        <div className="relative overflow-hidden rounded-[3rem] border-4 border-white bg-slate-950 p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.3)] md:p-20">
          
          {/* Animated Background Gradients */}
          <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-emerald-500/30 blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-500/30 blur-[120px]"></div>
          
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          </div>

          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></span>
                Ready to make an impact?
              </div>
              <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter md:text-7xl">
                Punya perangkat <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">tidak terpakai?</span>
              </h2>
              <p className="mt-10 max-w-2xl text-xl leading-relaxed text-slate-400 font-medium">
                Jangan biarkan limbah elektronik Anda merusak masa depan. 
                <span className="text-white"> Jadwalkan penjemputan sekarang</span> dan jadilah bagian dari revolusi hijau.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end">
              <Link
                to="/register"
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] bg-emerald-500 px-12 py-7 text-xl font-black text-white shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-500 hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-[0_30px_70px_rgba(16,185,129,0.5)] lg:w-auto"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Jadwalkan Pickup Gratis
                  <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>
              
              <div className="flex items-center gap-4 text-slate-500 font-bold px-4">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span>Terverifikasi & Aman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section (NEW) */}
      <footer className="border-t border-slate-200 bg-slate-50 pb-8 pt-20">
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {/* Brand Information */}
            <div className="lg:col-span-2">
              <Link 
                to="/" 
                className="flex items-center gap-3"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
              <div className="h-10 w-10 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src="/src/assets/Logo.jpeg"
                    alt="Relecta Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-emerald-600">
                  Relecta
                </span>
              </Link>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
                Solusi cerdas untuk mengelola limbah elektronik Anda. Kami
                menghubungkan masyarakat dengan mitra pengelola daur ulang resmi
                demi menjaga kelestarian bumi dan meminimalisir risiko bahaya
                e-waste.
              </p>

              {/* Social Media */}
              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-emerald-600 hover:text-white"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pintasan</h3>
              <ul className="mt-6 space-y-4 text-slate-600">
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#cara-kerja"
                    className="transition hover:text-emerald-600"
                  >
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="transition hover:text-emerald-600">
                    Fitur Layanan
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Lokasi Drop-off
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">Perusahaan</h3>
              <ul className="mt-6 space-y-4 text-slate-600">
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-emerald-600">
                    Bantuan & FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-200 pt-8 sm:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 Relecta. Hak Cipta Dilindungi.
            </p>
            <div className="mt-4 flex gap-6 text-sm font-medium text-slate-500 sm:mt-0">
              <a href="#" className="transition hover:text-emerald-600">
                Indonesia
              </a>
              <a href="#" className="transition hover:text-emerald-600">
                English
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
