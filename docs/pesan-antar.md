# Alur Pesan Antar (Order Flow) - Relacta

Dokumen ini mendeskripsikan alur pemesanan penjemputan elektronik yang telah diimplementasikan, termasuk penambahan fitur **Metode Pembayaran (E-Wallet & QRIS)**.

---

## Langkah 1 — Detail Barang
Pengguna memasukkan rincian perangkat elektronik yang ingin disetorkan.
- **Kategori**: Memilih jenis elektronik (Laptop, Smartphone, TV, Printer, dll).
- **Nama Spesifik**: Nama/merk perangkat (contoh: Laptop Asus).
- **Berat (kg)**: Estimasi berat perangkat.
- Dapat menambahkan lebih dari satu barang per pesanan.

## Langkah 2 — Alamat Lokasi
Pengguna memilih lokasi penjemputan dari daftar alamat tersimpan.
- Alamat utama ditandai badge "Utama".
- Jika belum ada, diarahkan untuk menambah alamat baru.

## Langkah 3 — Jadwal & Transportasi
Pengguna mengatur waktu dan armada penjemputan.
- **Tanggal Penjemputan**: Jam operasional 09:00 - 17:00 WIB.
- **Kondisi Barang**: Ringan / Sedang / Parah.
- **Opsi Transportasi**: Motor, Mobil Pickup, Truk, atau Gerobak (semua Gratis).

## Langkah 4 — Metode Pembayaran ✅ (Baru)
Pengguna memilih metode pembayaran yang digunakan.

### Dompet Digital (E-Wallet)
| Metode | Warna Badge |
|--------|------------|
| GoPay  | Hijau |
| OVO    | Ungu |
| DANA   | Biru |

Setelah memilih salah satu E-Wallet, muncul input **Nomor HP terdaftar** di wallet tersebut.

### QRIS
- Pilihan tunggal dengan preview placeholder kode QR.
- Kompatibel dengan semua aplikasi bank & dompet digital.
- Kode QR aktif akan tampil setelah pesanan dikonfirmasi.

---

## Ringkasan Pesanan (Order Summary)
Panel sticky di kanan layar (atau bawah di mobile) yang selalu update:
- Daftar barang beserta harga satuan.
- Subtotal & Biaya Pengiriman (Gratis).
- **Total Keseluruhan** (Grand Total).
- Indikator langkah berjalan: "Langkah X dari 4".

---

## Alur Data ke History & Detail Pesanan

Field `paymentMethod` disimpan ke dalam `orderStore` (persisted di `localStorage`) dan ditampilkan di:

| Halaman | Tampilan |
|---------|----------|
| **Riwayat Pesanan** (`/history`) | Badge berwarna (GoPay=hijau, OVO=ungu, DANA=biru, QRIS=abu) |
| **Detail Pesanan** (`/history/:id`) | Baris di breakdown biaya dengan ikon dompet/QR |
| **Halaman Sukses** (`/success`) | Baris di ringkasan invoice setelah pesanan dibuat |

---

## File yang Dimodifikasi

| File | Perubahan |
|------|-----------|
| `src/stores/orderStore.ts` | Tambah type `PaymentMethod` dan field di interface `Order` |
| `src/pages/OrderPage.tsx` | Tambah Step 4 UI Pembayaran (E-Wallet + QRIS + input HP) |
| `src/pages/OrderHistoryPage.tsx` | Tampilkan badge metode pembayaran di setiap kartu pesanan |
| `src/pages/OrderDetailPage.tsx` | Tampilkan baris pembayaran di breakdown rincian biaya |
| `src/pages/SuccessPage.tsx` | Tampilkan baris pembayaran di ringkasan invoice |
