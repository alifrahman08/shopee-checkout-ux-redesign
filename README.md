# Shopee Checkout UX Redesign 🛍️
> **Tugas Rekayasa Interaksi — Worksheet 12: Wireframe & Interactive Prototype**

Proyek ini adalah prototipe antarmuka dan interaksi pengguna (UI/UX) web interaktif yang merancang ulang alur checkout Shopee. Fokus inovasi utama adalah memecahkan kebingungan pengguna dalam memeriksa dan memastikan rincian pembayaran serta total akhir yang harus dibayar.

---

## 📑 Daftar Isi
1. [Latar Belakang & Masalah UX](#-latar-belakang--masalah-ux)
2. [Solusi Desain Rekayasa Interaksi](#-solusi-desain-rekayasa-interaksi)
3. [Alur Pengguna (User Flow)](#-alur-pengguna-user-flow)
4. [Penjelasan 5 Layar Utama](#-penjelasan-5-layar-utama)
5. [Fitur Interaktif & Logika Perhitungan](#-fitur-interaktif--logika-perhitungan)
6. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
7. [Panduan Menjalankan Proyek](#-panduan-menjalankan-proyek)
8. [Dokumentasi Tambahan](#-dokumentasi-tambahan)

---

## 🎯 Latar Belakang & Masalah UX

### UX Problem (Pain Point):
Pada aplikasi e-commerce konvensional seperti Shopee, proses checkout seringkali membebani kognitif pengguna (*cognitive overload*):
- **Ketidakpastian Total Biaya**: Pengguna harus berulang kali melakukan verifikasi (*double-checking*) harga produk, ongkos kirim kurir, potongan voucher toko vs voucher Shopee, tukar koin, serta biaya layanan/penanganan.
- **Biaya Tersembunyi (*Hidden/Surprise Fees*)**: Biaya layanan aplikasi dan biaya penanganan metode pembayaran sering kali muncul mendadak tanpa transparansi perhitungan.
- **Sulit Memahami Potongan Voucher**: Pengguna kesulitan membedakan apakah voucher yang digunakan adalah voucher gratis ongkir atau diskon produk, serta berapa nilai riil penghematannya.

---

## 💡 Solusi Desain Rekayasa Interaksi

1. **Dedicated Payment Breakdown Screen (Layar 3 - Pusat Transparansi)**:
   - Memisahkan dan menonjolkan layar rincian pembayaran sebelum konfirmasi akhir.
   - **Hero Visual Card**: Kartu total pembayaran bergradasi oranye khas Shopee dengan tipografi kontras tinggi yang mempertegas angka total bersih.
   - **Badge Akumulasi Penghematan**: Menampilkan *"Kamu Hemat RpXX.XXX"* untuk memberikan *positive emotional feedback*.
   - **Fitur Edukatif "Cara Hitung Transparan"**: Modal interaktif yang membongkar rumus kalkulasi:
     $$\text{Total Akhir} = \text{Subtotal Produk} + \text{Ongkir Bersih} - \text{Diskon Voucher} - \text{Koin Shopee} + \text{Biaya Layanan} + \text{Biaya Penanganan}$$
2. **Interaktivitas Real-Time Tanpa Reload**:
   - Pemilihan voucher (Gratis Ongkir + Diskon/Cashback) langsung memperbarui nominal secara instan.
   - Sakelar (*toggle switch*) Koin Shopee interaktif dengan batas perhitungan otomatis (hingga 25% subtotal).
   - Pengubahan jumlah produk (+/-) di keranjang langsung disinkronkan ke seluruh alur checkout berikutnya.
3. **Penyempurnaan Validasi & Error Prevention**:
   - Mencegah *empty payment method submission* dengan pesan validasi visual yang jelas.
   - Dialog konfirmasi akhir sebelum dana dipotong untuk mencegah ketidaksengajaan klik.
4. **Desain Mobile-First Adaptif**:
   - Disajikan dalam frame smartphone modern (iPhone 15 bezel, dynamic island, status bar waktu & baterai), lengkap dengan tombol toggle mode full-width responsif untuk kenyamanan evaluasi dan presentasi tugas.

---

## 🗺️ Alur Pengguna (User Flow)

```
[ Layar 1: Keranjang Belanja ]
              │ (Pilih item, atur kuantitas, subtotal terhitung)
              ▼
[ Layar 2: Informasi Checkout ]
              │ (Pilih alamat rumah/kantor, pilih kurir & estimasi)
              ▼
[ Layar 3: Rincian Pembayaran ]  ⭐⭐⭐ (FOKUS UTAMA REDESIGN)
              │ (Pilih voucher gratis ongkir/diskon, switch koin, cek rumus transparansi)
              ▼
[ Layar 4: Konfirmasi Pembayaran ]
              │ (Pilih metode Transfer Bank VA / ShopeePay / E-Wallet / COD, dialog konfirmasi)
              ▼
[ Layar 5: Pembayaran Berhasil ]
                (Animasi konfeti, salin No. Pesanan SPX, nota digital, tracking status kurir)
```

---

## 📱 Penjelasan 5 Layar Utama

### 🛒 Layar 1: Keranjang Belanja (`CartScreen`)
- **Fitur**:
  - Daftar produk dengan foto berkualitas tinggi, nama produk lengkap, variasi warna/ukuran, dan badge Official Store Mall.
  - Kontrol jumlah item (*quantity stepper* `[-] qty [+]`) dengan validasi stok maksimal.
  - Checkbox per-produk serta checkbox *"Pilih Semua"*.
  - Tombol hapus produk per-item.
  - Ringkasan subtotal harga dan nominal penghematan di floating bottom bar.
  - Tombol **"Checkout (X)"** aktif hanya jika minimal 1 produk terpilih.

### 🚚 Layar 2: Checkout (`CheckoutScreen`)
- **Fitur**:
  - Kartu **Alamat Pengiriman** dengan label (Rumah/Kantor/Kost) dan tombol *"Ubah"* yang membuka modal pemilihan alamat alternatif.
  - Ringkasan produk yang sedang dicheckout beserta kolom catatan untuk penjual (*seller note*).
  - Pilihan **Jasa Pengiriman** (Reguler, Hemat, Instant 2 Jam, Kargo) dengan estimasi waktu tiba (ETA) dan biaya dasar pengiriman.
  - Tombol **"Lanjutkan ke Rincian"** menuju Layar 3.

### 💳 Layar 3: Rincian Pembayaran (`PaymentBreakdownScreen`) — *Fokus Utama*
- **Fitur**:
  - **Hero Total Pembayaran**: Kartu oranye besar dengan nominal total pembayaran akhir yang sangat jelas dan tebal.
  - **Banner Penghematan Total**: Rekapitulasi total rupiah yang dihemat pengguna.
  - **Tombol Transparansi Rincian**: Membuka modal kalkulasi edukatif dengan penjelasan rumus matematis dan alasan setiap komponen biaya.
  - **Pengaturan Voucher Interaktif**: Modal pemilihan 1 Voucher Gratis Ongkir dan 1 Voucher Diskon/Cashback dengan validasi minimal belanja.
  - **Sakelar Koin Shopee**: Switch interaktif untuk memanfaatkan saldo koin pengguna.
  - **Tabel Rincian Terstruktur**: Memisahkan Subtotal Produk, Ongkir, Potongan Voucher, Koin, Biaya Layanan Shopee (Rp1.000), dan Biaya Penanganan Metode Pembayaran.
  - Tombol **"Lanjut Pembayaran"** menuju Layar 4.

### 🔐 Layar 4: Konfirmasi Pembayaran (`ConfirmationScreen`)
- **Fitur**:
  - Ringkasan ringkas produk, kuantitas, alamat penerima, dan nominal tagihan akhir.
  - Pilihan **Metode Pembayaran** yang dikelompokkan:
    - *E-Wallet*: ShopeePay (Bebas Biaya Admin), SPayLater, GoPay, DANA.
    - *Transfer Bank (Virtual Account)*: BCA VA, Mandiri VA, BRI BRIVA.
    - *COD*: Bayar di Tempat saat kurir tiba.
  - Indikator biaya penanganan per metode (misal Rp0 untuk ShopeePay, Rp1.000 untuk Bank VA).
  - **Validasi Input**: Peringatan visual jika pengguna belum memilih metode pembayaran.
  - **Modal Konfirmasi Akhir**: Dialog dialog persetujuan sebelum pembayaran diselesaikan.
  - Tombol **"Bayar Sekarang"**.

### 🎉 Layar 5: Pembayaran Berhasil (`SuccessScreen`)
- **Fitur**:
  - Animasi perayaan *confetti* warna-warni saat layar dimuat.
  - Ikon centang hijau dengan efek pulsasi dan status *"Pembayaran Berhasil! Pesanan Sedang Diproses"*.
  - **Nomor Pesanan Simulasi** (contoh: `SPX-ID-20261122-8947`) lengkap dengan tombol interaktif *"Salin No."* dan indikator tooltip tersalin.
  - Waktu transaksi dan metode pembayaran yang dipakai.
  - **Nota Digital Terbuka/Tutup (*Expandable Digital Receipt*)**: Menampilkan seluruh rincian komponen biaya yang telah lunas.
  - **Status Pelacakan Pengiriman (Timeline)**: Indikator visual progres dari *Pembayaran Terverifikasi* $\rightarrow$ *Penjual Menyiapkan Pesanan* $\rightarrow$ *Kurir Menjemput Paket*.
  - Tombol **"Kembali ke Beranda (Ulangi Demo)"** untuk mereset seluruh simulasi state ke awal.

---

## ⚡ Fitur Interaktif & Logika Perhitungan

Seluruh kalkulasi dilakukan secara reaktif via React Context (`CheckoutContext`):

| Komponen Biaya | Logika & Nilai Default |
|---|---|
| **Subtotal Produk** | $\sum (\text{Harga Produk} \times \text{Kuantitas})$ untuk semua item yang dicentang |
| **Ongkos Kirim Dasar** | Rp18.000 (Reguler), Rp12.000 (Hemat), Rp35.000 (Instant), Rp25.000 (Kargo) |
| **Diskon Ongkir** | $\min(\text{Biaya Ongkir}, \text{Voucher Ongkir})$ jika total belanja $\ge$ min. spend voucher |
| **Diskon Produk** | Persentase (misal 15% capped Rp35.000) atau nominal tetap (Rp20.000) |
| **Koin Shopee** | $\min(\text{Saldo Koin}, 25\% \times \text{Subtotal Produk})$ saat switch diaktifkan |
| **Biaya Layanan** | Rp1.000 (biaya pemeliharaan sistem & proteksi transaksi Shopee) |
| **Biaya Penanganan** | Rp0 (ShopeePay), Rp1.000 (Bank VA / GoPay), Rp2.500 (COD) |
| **Total Akhir** | **Dihitung otomatis dan konsisten di seluruh layar** |

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 14 (App Router)
- **Library UI**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icon Pack**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State Management**: React Context API (`CheckoutContext`)
- **Layout Chassis**: Smartphone Bezel Frame Mockup dengan Dynamic Island & Quick Screen Switcher Toolbar

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat:
- Node.js (versi 18.x atau lebih baru, direkomendasikan Node 20 / 24)
- npm atau pnpm

### Langkah Instalasi:

1. **Buka Terminal di Direktori Proyek**:
   ```bash
   cd c:\shoope
   ```

2. **Jalankan Aplikasi dalam Mode Development**:
   ```bash
   npm run dev
   ```

3. **Buka di Peramban Web (Browser)**:
   Buka URL: [http://localhost:3000](http://localhost:3000)

4. **Mode Build & Produksi (Opsional)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Struktur Direktori Proyek

```
c:\shoope\
├── docs/
│   ├── PRD.md                 # Product Requirements Document lengkap
│   └── CHANGELOG.md           # Catatan rilis dan evolusi prototype
├── src/
│   ├── app/
│   │   ├── globals.css        # Konfigurasi Tailwind & scrollbar kustom
│   │   ├── layout.tsx         # Root HTML layout & Metadata
│   │   └── page.tsx           # Entry point aplikasi & Screen Switcher
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MobileFrame.tsx     # Frame smartphone, Dynamic Island & Presentation Bar
│   │   │   ├── HeaderNav.tsx       # Shopee App Header & Back navigation
│   │   │   └── StepProgressBar.tsx # Indikator 5 langkah visual
│   │   ├── modals/
│   │   │   ├── AddressModal.tsx             # Modal ganti alamat pengiriman
│   │   │   ├── ShippingModal.tsx            # Modal ganti jasa kirim
│   │   │   ├── VoucherModal.tsx             # Modal pilih voucher ongkir & diskon
│   │   │   └── CalculationExplainerModal.tsx# Modal transparansi rumus biaya
│   │   └── screens/
│   │       ├── CartScreen.tsx               # Layar 1: Keranjang Belanja
│   │       ├── CheckoutScreen.tsx           # Layar 2: Checkout Info
│   │       ├── PaymentBreakdownScreen.tsx   # Layar 3: Rincian Pembayaran (Core UX)
│   │       ├── ConfirmationScreen.tsx       # Layar 4: Konfirmasi & Pilih Metode
│   │       └── SuccessScreen.tsx            # Layar 5: Pembayaran Berhasil
│   ├── context/
│   │   └── CheckoutContext.tsx   # State global & mesin kalkulasi harga
│   ├── data/
│   │   └── mockData.ts          # Dataset simulasi produk, alamat, voucher, kurir, bank
│   ├── types/
│   │   └── index.ts             # Definisi TypeScript interfaces
│   └── utils/
│       └── format.ts            # Formatter mata uang Rupiah & generator No. Order
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🎓 Informasi Tugas Kuliah
- **Mata Kuliah**: Rekayasa Interaksi (Human-Computer Interaction)
- **Tugas**: Worksheet 12 - Wireframe dan Prototype
- **Topik**: Redesain Alur Checkout & Transparansi Rincian Pembayaran Shopee
- **Tipe Proyek**: High-Fidelity Interactive Web Prototype
