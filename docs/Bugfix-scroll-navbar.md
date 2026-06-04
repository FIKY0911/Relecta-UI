# Laporan & Rencana Perbaikan: Bug Auto-Scroll pada Landing Page

## Deskripsi Masalah
Pengguna melaporkan bahwa saat menggulir (*scroll*) halaman ke bawah, halaman tiba-tiba "melompat" atau secara otomatis melakukan *scroll* kembali ke atas. Hal ini membuat halaman terasa *glitchy* dan sulit untuk dinavigasi.

## Analisis Penyebab (Root Cause)
Setelah meninjau kode fitur *auto-hide* Navbar di `src/pages/LandingPage.tsx`, ditemukan masalah pada implementasi `useEffect` untuk mendengarkan *event scroll*:

```tsx
// Kode saat ini
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    // ...
    setLastScrollY(currentScrollY); // BERMASALAH
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  // ...
}, [lastScrollY]);
```

1. **Re-render Berlebihan (Infinite Render Loop pada Scroll):** 
   Setiap kali pengguna menggeser *scroll* meski hanya 1 piksel, fungsi `setLastScrollY` akan memperbarui state React. Karena `LandingPage` adalah komponen yang sangat besar (berisi gambar, grid, dan banyak SVG), React harus melakukan kalkulasi ulang (re-render) seluruh halaman secara masif (bisa mencapai puluhan kali dalam satu detik).
2. **Layout Thrashing & Hilangnya Jangkar Scroll:**
   Siklus render yang sangat berat dan tiada henti pada saat *scroll* menyebabkan browser kewalahan (*layout thrashing*). Browser gagal mempertahankan jangkar posisi gulir (*scroll anchor*), yang pada akhirnya membuat tata letak DOM berantakan sesaat dan me-reset posisi *scroll* secara paksa ke bagian atas.

## Rencana Perbaikan (Fix Plan)

Untuk mengatasi lompatan tersebut tanpa menghilangkan fitur *auto-hide* Navbar, kita perlu mengubah cara penyimpanan *state* agar posisi *scroll* tidak memicu siklus render dari React secara berulang.

**Langkah Implementasi:**
1. **Mengganti `useState` menjadi `useRef`:**
   Nilai `lastScrollY` akan disimpan ke dalam `useRef` (yakni `lastScrollY.current`). Tidak seperti `useState`, memperbarui nilai di dalam `useRef` **tidak akan memicu re-render**.
2. **Impor `useRef` dari React:**
   Menambahkan `import { useState, useEffect, useRef } from "react";`.
3. **Pembersihan Dependency:**
   Karena `useRef` tidak terikat dengan siklus *render*, kita bisa mengosongkan *dependency array* `[]` pada `useEffect`. Ini memastikan *event listener* `scroll` hanya dipasang satu kali dan bekerja jauh lebih efisien.

Dengan perbaikan ini, komponen hanya akan melakukan re-render **maksimal dua kali**: satu kali saat Navbar disembunyikan (`isVisible: false`), dan satu kali saat dimunculkan (`isVisible: true`). Hal ini akan menghilangkan beban komputasi berat dan mencegah terjadinya auto-scroll ke atas.
