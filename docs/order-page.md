# Order Flow — Surface & Interaction Spec

## Overview
Konfigurasi pemesanan (Order Page) dirancang menggunakan prinsip **Horizontal Flow (Mendatar)**, memberikan ruang bernapas (whitespace) yang luas pada kanvas putih (`{colors.canvas}`) dengan fokus pada pengalaman merchandising produk yang premium. Antarmuka menghindari tata letak vertikal yang kaku, melainkan menggunakan navigasi progresif horizontal di bagian atas, dipadukan dengan *sticky summary* di sisi kanan.

Setiap elemen interaktif mengikuti aturan bentuk pil (`{rounded.full}`) dan kartu dengan sudut melengkung halus (`{rounded.xxxl}`), tanpa menggunakan bayangan tebal (flat elevation level 0), mengandalkan *hairline borders* (`{colors.hairline-soft}`) untuk memisahkan konteks struktural.

---

## 1. Layout Architecture (Horizontal Flow)

Alur pemesanan dibagi menjadi area pandang yang lebar (landscape-oriented) dengan rasio pembagian kolom **58/42** pada Desktop (merujuk pada standar PDP layout):

- **Top Navigation (Horizontal Stepper):** Indikator progres membentang secara mendatar di bagian atas konten utama. Menggunakan garis hubung halus dan penanda step berupa lingkaran (`{rounded.circle}`) berukuran 40x40px.
- **Main Content Area (58% width):** Kanvas utama untuk interaksi pengguna. Menggunakan grid mendatar (2-up) untuk menampilkan kartu opsi agar memanfaatkan lebar layar secara optimal tanpa banyak ruang kosong di kanan.
- **Purchase Summary Rail (42% width):** Panel ringkasan yang *sticky* di sebelah kanan. Memiliki batas maksimal lebar (`max-width: 380px`) untuk menjaga kepadatan informasi (information density), dibalut komponen `card-checkout-summary`.

---

## 2. Component Specifications

### A. Horizontal Progress Stepper
- **Layout:** Mendatar (Row), membentang penuh di atas *Main Content Area* dengan margin bawah `{spacing.section-sm}` (48px).
- **Node Inactive:** Latar putih `{colors.canvas}`, border 2px `{colors.hairline}`, teks `{colors.stone}`.
- **Node Active:** Latar aksen utama, teks putih `{colors.canvas}`, tanpa border luar, memberikan kontras tertinggi di halaman.
- **Connecting Line:** Garis setebal 2px menghubungkan antar node, menggunakan warna `{colors.hairline-soft}` untuk langkah yang belum dilalui.

### B. Input Detail Barang (Grid Mendatar)
Formulir input barang direstrukturisasi menjadi tata letak mendatar (inline form) untuk menekan kebutuhan *vertical scrolling*:
- **Row Layout:** [Dropdown Kategori] — [Input Nama Spesifik] — [Input Berat] — [Tombol Hapus]. Seluruhnya sejajar dalam satu baris horizontal di Desktop.
- **Input Styling:** Mengikuti standar `text-input`, tinggi `44px`, border `1px solid {colors.hairline}`, sudut `{rounded.lg}` (8px). 
- **Focus State:** Border berubah menjadi tebal `2px` saat *focused*, menggunakan `outline: none` absolut untuk menghilangkan *default browser ring*.
- **Add Button:** Tombol *ghost* (`button-ghost`) berbentuk mendatar, diletakkan di bawah baris terakhir.

### C. Vehicle Choice Cards (Kartu Angkutan)
Opsi transportasi dirender menggunakan grid mendatar (2 kolom pada desktop).
- **Surface:** `radio-option` (Latar `{colors.canvas}`, sudut `{rounded.lg}`).
- **Selected State:** Border berubah menjadi `2px solid` aksen utama (tanpa efek *hover* berupa shadow/angkat).
- **Konten:** Ikon armada berukuran 32px di kiri, diikuti nama armada (`{typography.body-md-bold}`) dan label biaya pengiriman di kanan atas.

### D. Sticky Purchase Summary
Panel samping kanan menggunakan pola `card-checkout-summary`.
- **Surface:** Latar `{colors.canvas}`, sudut `{rounded.xl}` (16px), border `1px solid {colors.hairline-soft}`.
- **Elevation:** Level 2 shadow (`rgba(20, 22, 26, 0.3) 0px 1px 4px 0px`) agar terpisah tegas secara hierarki dari kanvas utama saat di-*scroll*.
- **Item Row:** Menampilkan nama barang menggunakan `{typography.body-sm-bold}` di sebelah kiri dan total estimasi di kanan.
- **Biaya Pengiriman:** Baris statis yang menampilkan teks "Gratis" dalam balutan `badge-success`.
- **CTA Button:** Menggunakan `button-buy-cta` (Pill shape 100px, warna solid, padding 14px 30px) dengan teks "KONFIRMASI SEKARANG".

---

## 3. Interaction & States

- **No-Hover Elevation:** Memegang prinsip desain yang ada, kartu interaktif (seperti opsi alamat dan transportasi) **tidak** memunculkan bayangan (`box-shadow`) ketika di-hover. Perubahan state (*hover/active*) hanya ditandai dengan transisi ketebalan dan warna border.
- **Zero Cost (Gratis):** Seluruh opsi transportasi difiksasi pada biaya pengiriman Rp0. Label harga diganti dengan gaya `badge-success` ("GRATIS") untuk penekanan merchandising positif.
- **Empty States:** Menggunakan ruang negatif yang luas; jika belum ada barang atau alamat, tampilkan logo ikonik berukuran sedang di tengah kanvas kosong dengan tipografi `{typography.heading-md}` (berat 300) guna mempertahankan kesan minimalis dan *confident*.

---

## 4. Typography Hierarchy Halaman Pemesanan

Hierarki tipografis mengikuti variabel *Optimistic VF* secara presisi:

| Elemen | Token Tipografi | Penggunaan |
|---|---|---|
| Judul Halaman | `{typography.display-lg}` | "Jadwalkan Penjemputan" (Size 48px, Weight 500) |
| Judul Seksi | `{typography.heading-sm}` | "Detail Barang", "Opsi Transportasi" (Size 24px) |
| Teks Panduan | `{typography.subtitle-md}` | "Masukkan rincian perangkat..." (Size 18px, Weight 400) |
| Label Input | `{typography.caption-bold}` | "KATEGORI" (Size 12px, Weight 700) |
| Value Input | `{typography.body-md}` | Teks input dalam field (Size 16px, Weight 400, LS -0.16px) |
| Tombol CTA | `{typography.button-md}` | Label tombol utama (Size 14px, Weight 700, LS -0.14px) |

## 5. Pelaksanaan Komponen (`OrderPage.tsx`)
1. **Refactor Stepper:** Hapus implementasi *Vertical Timeline Stepper* di sisi kiri layar. Ubah menjadi *Horizontal Stepper* mendatar yang berada tepat di bawah judul utama halaman.
2. **Refactor Detail Barang:** Ubah kolom form dari format bertumpuk vertikal menjadi *inline horizontal row* (di mana Dropdown, Input, dan Berat berada pada satu garis *row* horizontal di desktop).
3. **Refactor Summary:** Terapkan standar `card-checkout-summary` dengan border 1px dan shadow level 2; pastikan label pengiriman "Gratis" menggunakan token warna sukses (Emerald).
