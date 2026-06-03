# Relecta - Product Requirement Document (Frontend MVP)

## Overview

### Nama Produk

Relecta

### Tagline

Buang Sampah Elektronik Semudah Memesan Kurir

### Deskripsi

Relecta adalah platform digital yang menghubungkan masyarakat dan perkantoran dengan layanan pengelolaan limbah elektronik resmi milik pemerintah.

Aplikasi ini membantu pengguna menemukan lokasi bank sampah elektronik, menghitung estimasi nilai limbah elektronik, serta melakukan pemesanan jasa pengangkutan limbah elektronik melalui antarmuka yang sederhana dan mudah digunakan.

---

# Product Goals

* Menjadi penghubung antara masyarakat dan layanan pengelolaan limbah elektronik pemerintah.
* Mempermudah proses pemesanan jasa angkut limbah elektronik.
* Mengurangi distribusi limbah elektronik ke pengepul ilegal.
* Membantu pemerintah meningkatkan penyerapan limbah elektronik.
* Meningkatkan efisiensi penggunaan sumber daya melalui proses daur ulang.

---

# Problem Statement

## Permasalahan Masyarakat

* Sulit menemukan lokasi bank sampah elektronik resmi.
* Kesulitan mengakses layanan pengangkutan limbah elektronik.
* Kurangnya informasi mengenai nilai ekonomis limbah elektronik.

## Permasalahan Lingkungan

* Banyak limbah elektronik masuk ke jalur pengolahan ilegal.
* Pencemaran lingkungan akibat peleburan limbah yang tidak sesuai standar.

## Permasalahan Pemerintah

* Rendahnya tingkat penyerapan limbah elektronik dari masyarakat.
* Sulit menjangkau masyarakat secara langsung.

---

# Target Users

## Primary Users

### Masyarakat Kota Jakarta

Karakteristik:

* Memiliki perangkat elektronik bekas.
* Membutuhkan proses pembuangan yang praktis.
* Menginginkan layanan resmi dan terpercaya.

### Perkantoran

Karakteristik:

* Memiliki limbah elektronik dalam jumlah besar.
* Membutuhkan proses pengangkutan yang lebih terorganisir.

---

# Scope Project

## Frontend Only

Aplikasi tidak menggunakan:

* Backend
* REST API
* GraphQL
* Database Server
* Authentication Server

Seluruh data disimpan menggunakan:

* Zustand
* Zustand Persist Middleware
* Browser LocalStorage

---

# MVP Features

## 1. Authentication

### Register

Pengguna dapat membuat akun baru.

Fitur:

* Nama Lengkap
* Email
* Password
* Konfirmasi Password

Validasi:

* Email wajib unik.
* Password minimal 8 karakter.

Data tersimpan ke LocalStorage.

---

### Login

Pengguna dapat login menggunakan akun yang telah didaftarkan.

Validasi dilakukan menggunakan data yang tersimpan pada LocalStorage.

---

### Logout

Menghapus session login aktif.

---

## 2. Dashboard

Menampilkan:

* Informasi pengguna
* Jumlah pesanan
* Shortcut pemesanan
* Lokasi bank sampah terdekat
* Riwayat aktivitas

---

## 3. Maps Bank Sampah

Menampilkan:

* Peta interaktif
* Marker lokasi bank sampah
* Detail lokasi

Data menggunakan dummy data statis.

---

## 4. Address Management

Pengguna dapat:

* Menambahkan alamat
* Mengubah alamat
* Menyimpan alamat utama

Data tersimpan di LocalStorage.

---

## 5. Order Management

Pengguna dapat:

* Memilih jenis barang elektronik
* Menentukan jumlah barang
* Menentukan jadwal penjemputan
* Melihat ringkasan pesanan
* Menyimpan pesanan

Data tersimpan di LocalStorage.

---

## 6. Estimation Calculator

Menghitung estimasi nilai limbah elektronik.

Contoh estimasi:

| Barang     | Nilai    |
| ---------- | -------- |
| Laptop     | Rp50.000 |
| Smartphone | Rp20.000 |
| TV         | Rp35.000 |
| Printer    | Rp25.000 |

Data harga menggunakan dummy data.

---

## 7. Order History

Menampilkan seluruh riwayat pesanan pengguna.

Data diambil dari LocalStorage.

---

## 8. Success Page

Menampilkan:

* Nomor pesanan
* Jadwal penjemputan
* Ringkasan pesanan
* Tombol kembali ke dashboard

---

## 9. Settings

Menampilkan:

* Profil pengguna
* Logout
* Reset aplikasi

Reset aplikasi akan menghapus seluruh data LocalStorage Relecta.

---

# User Flow

1. User membuka Landing Page.
2. User melakukan Register.
3. User Login.
4. User mengisi alamat.
5. User masuk Dashboard.
6. User membuka halaman Order.
7. User memilih jenis barang elektronik.
8. Sistem menghitung estimasi nilai.
9. User mengonfirmasi pesanan.
10. Sistem menyimpan pesanan.
11. Halaman Success ditampilkan.
12. User dapat melihat riwayat pesanan.

---

# Pages

## Public Pages

### Landing Page

Section:

* Hero
* Problem
* Solution
* Features
* Benefits
* Footer

### Login Page

### Register Page

---

## Protected Pages

### Dashboard Page

### Maps Page

### Address Page

### Order Page

### Order History Page

### Success Page

### Settings Page

---

# Design System

## Color Palette

Primary (Relecta Cobalt)
#B5BAFF

Secondary (Sky Accent)
#AEE2FF

Accent (Eco Green)
#D9F9DF

Background
#FFFFFF

Text (Ink Deep)
#1C1E21


---

## Design Style

* Modern
* Minimalist
* Eco-Friendly
* Mobile First
* Clean UI

---

# Technology Stack

## Core

* React
* Vite

## Styling

* Tailwind CSS

## Routing

* React Router DOM

## Form Handling

* React Hook Form
* Zod

## State Management

* Zustand
* Zustand Persist

## Maps

* React Leaflet

## Icons

* Lucide React

---

# Frontend Architecture

## Pattern

Atomic Design + Feature Based Architecture

Tujuan:

* Reusable Component
* Maintainable Code
* Scalable Project Structure
* Separation of Concerns

---

# Folder Structure

src/

├── app/
│   ├── providers/
│   └── routes/
│
├── pages/
│
├── features/
│   ├── auth/
│   ├── address/
│   ├── order/
│   ├── maps/
│   └── settings/
│
├── components/
│
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Badge/
│   │   ├── Card/
│   │   └── Typography/
│
│   ├── molecules/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── AddressForm/
│   │   ├── EstimateCard/
│   │   ├── OrderSummary/
│   │   └── LocationCard/
│
│   ├── organisms/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── HeroSection/
│   │   ├── DashboardStats/
│   │   ├── OrderForm/
│   │   ├── MapSection/
│   │   └── Footer/
│
│   └── templates/
│       ├── MainTemplate/
│       ├── AuthTemplate/
│       ├── DashboardTemplate/
│       └── OrderTemplate/
│
├── stores/
│
├── hooks/
│
├── services/
│
├── utils/
│
├── data/
│
└── assets/

---

# State Management

## authStore

State:

* users
* currentUser
* isAuthenticated

Actions:

* register()
* login()
* logout()

Storage Keys:

* relecta-users
* relecta-session

---

## addressStore

State:

* addresses

Actions:

* createAddress()
* updateAddress()
* deleteAddress()

Storage Key:

* relecta-addresses

---

## orderStore

State:

* orders
* currentOrder

Actions:

* createOrder()
* updateOrder()
* deleteOrder()
* calculateEstimate()

Storage Key:

* relecta-orders

---

## mapStore

State:

* locations

Actions:

* getLocations()
* selectLocation()

---

# LocalStorage Strategy

## User Accounts

Storage Key:

relecta-users

Menyimpan seluruh akun yang telah melakukan registrasi.

---

## Session Login

Storage Key:

relecta-session

Menyimpan user yang sedang login.

---

## User Address

Storage Key:

relecta-addresses

Menyimpan alamat pengguna.

---

## Orders

Storage Key:

relecta-orders

Menyimpan seluruh pesanan pengguna.

---

# Dummy Data Scope

Data dummy hanya digunakan untuk:

## Bank Sampah

File:

data/bankLocations.js

---

## Daftar Harga Elektronik

File:

data/electronicPrices.js

---

## Jenis Barang Elektronik

File:

data/electronicTypes.js

---

Semua data lain wajib berasal dari input pengguna dan disimpan ke LocalStorage.

---

# MVP Limitation

* Data hanya tersedia pada browser yang sama.
* Tidak dapat sinkron antar perangkat.
* Data hilang jika browser storage dibersihkan.
* Password tidak terenkripsi server-side.
* Authentication hanya berjalan pada sisi frontend.

---

# Success Metrics

## User

* User dapat membuat akun.
* User dapat login menggunakan akun yang dibuat sendiri.
* User dapat membuat pesanan dalam kurang dari 3 menit.

## Product

* Seluruh data tersimpan menggunakan LocalStorage.
* Tidak memerlukan backend.

## Technical

* Responsive Mobile dan Desktop.
* Atomic Design diterapkan secara konsisten.
* Feature-Based Architecture diterapkan secara konsisten.
* Seluruh state menggunakan Zustand Persist.
* Lighthouse Score minimal 80.
