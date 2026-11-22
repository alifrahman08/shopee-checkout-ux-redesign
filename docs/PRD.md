# Product Requirements Document (PRD)
## Shopee Checkout UX Redesign — Worksheet 12

- **Nama Proyek**: Shopee Checkout UX Redesign
- **Kategori**: Rekayasa Interaksi / Human-Computer Interaction
- **Target Platform**: Mobile-First Web Application (Responsive)
- **Status**: Complete Interactive Prototype (v1.0.0)

---

## 1. Executive Summary & Problem Statement

### 1.1 Masalah Pengguna
Proses checkout e-commerce seringkali menimbulkan kecemasan (*checkout anxiety*) dan beban kognitif berlebih karena:
1. Ketidakjelasan rincian biaya pengiriman kurir setelah voucher diterapkan.
2. Kebingungan antara diskon voucher penjual versus voucher Shopee platform.
3. Ketiadaan transparansi asal-muasal biaya layanan (*service fee*) dan biaya penanganan (*handling fee*).
4. Pengguna terpaksa bolak-balik memeriksa ulang (*double/triple checking*) nominal total akhir.

### 1.2 Solusi Produk
Menyusun ulang alur checkout Shopee dengan menghadirkan **Layar 3 (Rincian Pembayaran)** sebagai pusat transparansi finansial:
- Struktur hirarki visual tegas dengan warna primer oranye Shopee (`#EE4D2D`).
- Penjelasan formula perhitungan real-time tanpa biaya siluman.
- Fleksibilitas pemilihan voucher dan koin dengan simulasi hitung instan.

---

## 2. User Persona & Scope

### Persona Utama:
- **Nama**: Andi (24 tahun, Mahasiswa / Pegawai Pemula)
- **Perilaku**: Berbelanja daring secara teliti, selalu mencari promo gratis ongkir, dan ingin memastikan pengeluaran tepat sesuai saldo rekening/e-wallet.
- **Tujuan**: Membayar pesanan dengan cepat tanpa khawatir ada biaya tak terduga yang lolos dari pantauan.

### Ruang Lingkup (Scope):
- Prototype difokuskan pada alur checkout lengkap 5 layar interaktif:
  1. Keranjang Belanja
  2. Informasi Checkout & Pengiriman
  3. Rincian Pembayaran (Core UX)
  4. Konfirmasi & Pemilihan Metode Pembayaran
  5. Status Pembayaran Berhasil
- Data bersifat simulasi terpadu (*consistent mock dataset*), tanpa backend database atau payment gateway eksternal riil.

---

## 3. Spesifikasi Layar & Fungsionalitas

### Screen 1: Keranjang Belanja (Cart)
- **Komponen**:
  - Daftar produk dengan thumbnail, judul, varian, dan harga normal/coret.
  - Checkbox pemilihan produk (independen dan Select-All).
  - Kontrol jumlah item (*Quantity stepper*).
  - Penghapusan produk dari keranjang.
  - Subtotal terhitung otomatis.
- **Kriteria Penerimaan**:
  - Tombol Checkout tidak dapat ditekan jika tidak ada produk yang dicentang.

### Screen 2: Informasi Checkout (Shipping & Items)
- **Komponen**:
  - Pemilihan alamat pengiriman (Rumah, Kantor, Kost).
  - Ringkasan produk yang dicheckout.
  - Pemilihan opsi kurir pengiriman (Reguler, Hemat, Instant, Kargo) beserta estimasi tanggal tiba.
  - Input catatan untuk penjual.
- **Kriteria Penerimaan**:
  - Alamat dan kurir dapat diganti kapan saja via modal dan nilainya mempengaruhi estimasi ongkir.

### Screen 3: Rincian Pembayaran (Core UX Focus)
- **Komponen**:
  - Hero card total pembayaran akhir terverifikasi dengan aksen oranye dan bayangan lembut.
  - Badge akumulasi nominal penghematan.
  - Tombol transparansi perhitungan yang memunculkan formula matematika.
  - Komponen voucher interaktif (Gratis Ongkir + Diskon Belanja).
  - Sakelar koin Shopee (maksimal 25% dari subtotal).
  - Tabel rincian pembiayaan terpisah per komponen.
- **Kriteria Penerimaan**:
  - Setiap interaksi voucher atau koin langsung mengubah angka total akhir secara reaktif.

### Screen 4: Konfirmasi Pembayaran (Payment Method Selection)
- **Komponen**:
  - Rekapitulasi pesanan dan alamat tujuan.
  - Pilihan metode pembayaran:
    - ShopeePay (Saldo simulasi Rp450.000, Biaya admin Rp0).
    - Transfer Bank Virtual Account (BCA, Mandiri, BRI, Biaya Rp1.000).
    - E-Wallet lain (GoPay, DANA).
    - COD (Bayar di Tempat, Biaya Rp2.500).
  - Validasi error jika metode belum dipilih.
  - Dialog pop-up konfirmasi final sebelum transaksi diproses.
- **Kriteria Penerimaan**:
  - Tombol bayar tidak dapat memproses tanpa metode yang dipilih secara valid.

### Screen 5: Pembayaran Berhasil (Success & Receipt)
- **Komponen**:
  - Ikon sukses terverifikasi dengan animasi konfeti.
  - Nomor pesanan simulasi unik yang dapat disalin dengan satu klik.
  - Ringkasan waktu pembayaran dan metode terpilih.
  - Accordion nota digital yang dapat dibuka/tutup.
  - Pelacakan status pengiriman kurir.
  - Tombol kembali ke beranda untuk mengulang simulasi.

---

## 4. Rincian Metrik & Prinsip Heuristik Nielsen

1. **Visibility of System Status**: Pengguna selalu mengetahui total harga terkini, jumlah produk terpilih, status voucher aktif, dan tahapan langkah 1 hingga 5 via progress bar.
2. **Match Between System and Real World**: Terminologi yang akrab bagi pengguna Shopee Indonesia (Mall, Voucher XTRA, Koin Shopee, Virtual Account, COD).
3. **User Control and Freedom**: Pengguna bebas berpindah antar langkah maju-mundur, mengganti voucher, dan mereset simulasi sewaktu-waktu.
4. **Error Prevention**: Pencegahan checkout kosong pada keranjang dan validasi pilihan metode pembayaran sebelum submit.
5. **Recognition Rather than Recall**: Seluruh komponen biaya dirinci secara transparan sehingga pengguna tidak perlu mengingat nominal atau menghitung manual di luar aplikasi.
