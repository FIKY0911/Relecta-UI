# Relecta: Buang Sampah Elektronik Tanpa Ribet

## Product Requirements Document (PRD)

Dokumen ini mendefinisikan visi, masalah, dan fitur utama dari produk berdasarkan implementasi antarmuka pengguna saat ini.

### 1. Informasi Produk
* **Nama Produk:** Relecta
* **Slogan:** Buang Sampah Elektronik Tanpa Ribet
* **Platform:** Aplikasi Web (*Responsive*)

### 2. Ringkasan Eksekutif
Relecta adalah platform yang menghubungkan individu dengan layanan pengelolaan limbah elektronik (*e-waste*) resmi. Platform ini bertujuan untuk menyederhanakan proses pembuangan barang elektronik bekas melalui sistem penjemputan (*pickup*) langsung dari rumah, guna mencegah kerusakan lingkungan dan melindungi privasi data pengguna.

### 3. Masalah Utama yang Diselesaikan
* **Kesehatan Lingkungan:** Limbah elektronik mengandung zat berbahaya (B3) seperti timbal dan merkuri yang merusak ekosistem jika dibuang sembarangan.
* **Keamanan Data:** Perangkat bekas yang tidak dihancurkan dengan benar membawa risiko tinggi kebocoran data pribadi.
* **Aksesibilitas:** Masyarakat umum kesulitan menemukan dan menjangkau tempat pembuangan limbah elektronik resmi yang terpercaya.

### 4. Metrik Keberhasilan (Traction & Goals)
Target capaian platform yang ditampilkan untuk membangun kepercayaan publik:
* Total limbah elektronik yang tersalurkan: >15.400 kg
* Jumlah pengguna aktif platform: >4.800 pengguna
* Tingkat kepuasan layanan: 98%

### 5. Alur Pengguna (User Flow) Utama
Untuk meminimalkan hambatan teknis, pengguna dapat membuang sampah elektronik melalui 4 langkah sederhana:
1. **Pemilihan Perangkat:** Pengguna mengidentifikasi dan memilih jenis perangkat elektronik yang akan dibuang.
2. **Penentuan Lokasi:** Pengguna memasukkan alamat atau titik koordinat penjemputan barang.
3. **Proses Penjemputan:** Kurir mitra mengambil barang langsung dari lokasi yang telah ditentukan.
4. **Pengelolaan Resmi:** Limbah dibawa ke fasilitas resmi untuk didaur ulang atau dihancurkan secara aman.

### 6. Arsitektur Teknis & Standar Industri
Untuk memastikan skalabilitas dan keamanan data, pengembangan sistem ini akan dipisah secara arsitektural:
* **Frontend (Presentational Layer):** Menggunakan *Next.js* untuk menangani antarmuka (UI), *routing*, dan menampilkan data secara *client-side/server-side* yang optimal untuk performa dan SEO.
* **Backend (Business Logic & Security):** Menggunakan *Express* (atau di masa depan direfaktor ke *NestJS*) yang bertugas murni sebagai penyedia API, memproses logika penjadwalan, mengelola antrean kurir, dan memvalidasi keamanan otentikasi.

---

## Palet Warna (Color Palette)

Aplikasi Relecta menggunakan kombinasi warna bernuansa alam (hijau) sebagai warna utama untuk merepresentasikan lingkungan, didukung oleh warna aksen untuk menyorot informasi penting.

| Kategori | Tailwind Classes | Perkiraan Visual | Penggunaan Utama dalam Kode |
| :--- | :--- | :--- | :--- |
| **Primary (Emerald)** | `emerald-50`, `emerald-100`, `emerald-300`, `emerald-500`, `emerald-600`, `emerald-700` | Hijau Zamrud (Eco/Nature) | Warna *branding* utama, tombol CTA (*Jadwalkan Pickup*), lencana solusi ramah lingkungan, ikon daur ulang, dan aksen garis. |
| **Accent 1 (Violet)** | `violet-50`, `violet-100`, `violet-600` | Ungu Modern | Efek *gradient blur background*, dekorasi ilustrasi, dan indikator visual untuk isu keamanan (*Risiko Kebocoran Data*). |
| **Accent 2 (Amber)** | `amber-50`, `amber-100`, `amber-200`, `amber-500` | Kuning Oranye | Elemen peringatan/tantangan (*Akses Pengelola Resmi*), lencana verifikasi resmi, dan detail visual pada ilustrasi kotak kurir. |
| **Accent 3 (Cyan)** | `cyan-50` | Biru Muda | Variasi pemanis untuk efek dekorasi *blur background* di bagian bawah halaman. |
| **Neutral / Text (Slate)**| `slate-100`, `slate-200`, `slate-300`, `slate-500`, `slate-600`, `slate-700`, `slate-800`, `slate-900`, `slate-950` | Abu-abu Gelap Kebiruan | Teks utama (*heading* & *body copy*), garis pembatas (*border*), latar belakang gelap pada kontainer CTA, dan representasi warna perangkat elektronik. |
| **Base** | `white`, `white/90` | Putih Bersih | Latar belakang halaman utama, warna dasar kartu komponen (*cards*), dan teks di atas latar belakang gelap. |

---

## Komponen Frontend: `LandingPage.tsx`

Berikut adalah implementasi UI beranda menggunakan React, Tailwind CSS, dan Lucide Icons.

```tsx
// src/pages/LandingPage.tsx

import {
  BadgeCheck,
  CalendarDays,
  FlaskConical,
  Leaf,
  Lock,
  MapPin,
  Menu,
  PlayCircle,
  Recycle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

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
    title: "Mengandung Bahan Berbahaya B3",
    description:
      "Limbah elektronik mengandung zat berbahaya seperti timbal, merkuri, dan kadmium yang dapat merusak lingkungan dan kesehatan.",
    color: "green",
  },
  {
    icon: <Lock size={34} />,
    title: "Risiko Kebocoran Data",
    description:
      "Perangkat yang tidak dikelola dengan benar berisiko menyebabkan kebocoran data pribadi dan informasi penting.",
    color: "purple",
  },
  {
    icon: <MapPin size={34} />,
    title: "Sulitnya Akses Pengelola Resmi",
    description:
      "Banyak orang kesulitan menemukan layanan pengelolaan limbah elektronik resmi yang praktis dan terpercaya.",
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

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute right-0 top-64 h-[420px] w-[420px] rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-cyan-50 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="mx-auto mt-4 flex w-[94%] max-w-7xl items-center justify-between rounded-3xl border border-slate-100 bg-white/90 px-6 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Recycle size={27} strokeWidth={2.8} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-emerald-600">
            Relecta
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-slate-700 lg:flex">
          <a href="#" className="relative text-emerald-600">
            Beranda
            <span className="absolute -bottom-3 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-emerald-500" />
          </a>
          <a href="#problem" className="transition hover:text-emerald-600">
            Masalah
          </a>
          <a href="#cara-kerja" className="transition hover:text-emerald-600">
            Cara Kerja
          </a>
          <a href="#fitur" className="transition hover:text-emerald-600">
            Fitur
          </a>
          <a href="#manfaat" className="transition hover:text-emerald-600">
            Manfaat
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-emerald-500 px-7 py-3 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50">
            Masuk
          </button>
          <button className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-700">
            Jadwalkan Pickup
          </button>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 lg:hidden">
          <Menu size={22} />
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto grid w-[90%] max-w-7xl items-center gap-14 pb-20 pt-20 lg:grid-cols-2 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Leaf size={18} />
            Solusi e-waste resmi dan ramah lingkungan
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
            Buang Sampah Elektronik Tanpa Ribet
          </h1>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-600 md:text-4xl">
            Semudah Menjadwalkan Kurir
          </h2>

          <div className="mt-3 h-1.5 w-56 rounded-full bg-emerald-500" />

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Relecta menghubungkan Anda dengan layanan pengelolaan limbah
            elektronik resmi. Praktis, aman, dan berkontribusi langsung menjaga
            lingkungan.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-700">
              <CalendarDays size={20} />
              Jadwalkan Sekarang
            </button>

            <button className="inline-flex items-center justify-center gap-3 rounded-full border border-emerald-500 bg-white px-8 py-4 font-bold text-emerald-600 transition hover:-translate-y-0.5 hover:bg-emerald-50">
              <PlayCircle size={21} />
              Lihat Cara Kerja
            </button>
          </div>

          <div className="mt-9 grid gap-4 text-sm font-semibold text-slate-600 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={22} />
              Aman & Terpercaya
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="text-emerald-500" size={22} />
              Ramah Lingkungan
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-amber-500" size={22} />
              Terdaftar Resmi
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="relative mx-auto min-h-[520px] w-full max-w-xl">
          <div className="absolute right-0 top-10 h-[430px] w-[430px] rounded-full bg-emerald-100/70" />
          <div className="absolute left-8 top-20 h-[360px] w-[360px] rounded-full bg-violet-100/60" />

          <div className="absolute right-2 top-20 rounded-3xl bg-white px-5 py-4 shadow-xl shadow-slate-200">
            <div className="flex items-center gap-3">
              <Leaf className="text-emerald-600" size={25} />
              <div>
                <p className="text-sm font-extrabold text-emerald-600">
                  Untuk bumi
                </p>
                <p className="text-xs font-semibold text-emerald-500">
                  yang lebih baik
                </p>
              </div>
            </div>
          </div>

          {/* Courier */}
          <div className="absolute right-10 top-36 z-20">
            <div className="relative">
              <div className="mx-auto h-20 w-20 rounded-full bg-amber-100 shadow-md">
                <div className="absolute left-6 top-7 h-2 w-2 rounded-full bg-slate-800" />
                <div className="absolute right-6 top-7 h-2 w-2 rounded-full bg-slate-800" />
                <div className="absolute left-8 top-11 h-2 w-5 rounded-full border-b-2 border-slate-700" />
              </div>

              <div className="absolute -top-4 left-2 h-9 w-20 rounded-t-full bg-emerald-600">
                <Recycle
                  size={18}
                  className="absolute left-8 top-2 text-white"
                />
              </div>

              <div className="mx-auto mt-2 flex h-48 w-32 flex-col items-center rounded-t-[42px] bg-emerald-600 pt-7 shadow-xl">
                <Recycle size={26} className="text-white" />
                <div className="mt-5 h-20 w-20 rounded-2xl bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Collection box */}
          <div className="absolute bottom-20 left-4 z-10 h-52 w-80 rounded-3xl bg-emerald-600 shadow-2xl shadow-emerald-900/20">
            <div className="absolute -top-16 left-4 h-20 w-[280px] rotate-[-3deg] rounded-2xl bg-amber-200 shadow-lg" />
            <Recycle
              size={82}
              className="absolute left-1/2 top-16 -translate-x-1/2 text-white/80"
            />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xl font-extrabold text-white">
              Relecta
            </p>
          </div>

          {/* Electronics */}
          <div className="absolute bottom-72 left-24 z-20 h-32 w-44 rounded-xl bg-slate-800 p-3 shadow-2xl">
            <div className="h-full rounded-lg bg-slate-950" />
            <div className="absolute -bottom-4 left-1/2 h-4 w-32 -translate-x-1/2 rounded-b-lg bg-slate-300" />
          </div>

          <div className="absolute bottom-72 left-64 z-30 h-36 w-20 rotate-[-8deg] rounded-2xl bg-slate-900 p-2 shadow-xl">
            <div className="h-full rounded-xl bg-slate-800" />
          </div>

          <div className="absolute bottom-60 left-80 z-20 h-28 w-28 rounded-2xl bg-slate-100 shadow-xl">
            <div className="mx-auto mt-5 h-12 w-16 rounded-lg bg-slate-300" />
            <div className="mx-auto mt-3 h-3 w-16 rounded-full bg-emerald-300" />
          </div>

          <div className="absolute bottom-28 left-0 z-20 h-28 w-32 rounded-2xl bg-slate-900 p-4 shadow-xl">
            <div className="text-lg font-bold text-white">+</div>
            <div className="absolute bottom-4 right-4 text-lg font-bold text-white">
              -
            </div>
          </div>

          <div className="absolute bottom-8 left-64 z-30 h-7 w-36 rounded-full border-[10px] border-slate-800" />

          <div className="absolute bottom-20 right-0 z-10 h-40 w-40 rounded-3xl bg-emerald-700 shadow-2xl">
            <Recycle
              size={54}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-8 grid w-[90%] max-w-6xl gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
          >
            <div className="flex items-center gap-5">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${getStatStyle(
                  item.color
                )}`}
              >
                {item.icon}
              </div>
              <div>
                <p
                  className={`text-3xl font-black ${
                    item.color === "green"
                      ? "text-emerald-600"
                      : item.color === "purple"
                      ? "text-violet-600"
                      : "text-amber-500"
                  }`}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
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
        className="mt-20 bg-gradient-to-b from-emerald-50/70 to-white py-24"
      >
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Tantangan e-waste
            </p>
            <h2 className="text-4xl font-black tracking-tight text-slate-950">
              Masalah yang Kami Hadapi
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-emerald-500" />
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {problems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
              >
                <div
                  className={`mb-7 flex h-20 w-20 items-center justify-center rounded-[1.7rem] ${getProblemStyle(
                    item.color
                  )}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="py-24">
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Cara Kerja
            </p>
            <h2 className="text-4xl font-black tracking-tight text-slate-950">
              Jadwalkan pickup hanya dalam beberapa langkah
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Relecta membantu proses pengumpulan limbah elektronik menjadi
              sederhana, aman, dan dapat dilacak.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-4">
            {[
              "Pilih jenis perangkat",
              "Tentukan lokasi pickup",
              "Kurir mengambil barang",
              "Limbah dikelola resmi",
            ].map((step, index) => (
              <div
                key={step}
                className="relative rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {step}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Proses mudah dengan panduan jelas agar pengguna dapat
                  menyalurkan e-waste secara bertanggung jawab.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-20 w-[90%] max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-10 text-white shadow-2xl md:p-14">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                Mulai dari rumah Anda
              </p>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Punya perangkat elektronik tidak terpakai?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Jadwalkan penjemputan sekarang dan bantu kurangi limbah
                elektronik berbahaya dengan cara yang aman dan resmi.
              </p>
            </div>

            <div className="flex md:justify-end">
              <button className="rounded-full bg-emerald-500 px-9 py-4 font-extrabold text-white shadow-xl shadow-emerald-500/25 transition hover:bg-emerald-600">
                Jadwalkan Pickup
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
