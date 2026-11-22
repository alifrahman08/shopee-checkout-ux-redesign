# Changelog
Semua perubahan penting dalam pengembangan prototype Shopee Checkout UX Redesign akan dicatat di dokumen ini.

## [1.0.0] - 2026-11-22
### Ditambahkan
- **Layar 1 (Keranjang Belanja)**:
  - Mock dataset 4 produk resmi Shopee Mall dengan gambar berkualitas tinggi dan variasi lengkap.
  - Checkbox per-produk dan fitur "Pilih Semua".
  - Quantity counter interaktif `[-]` dan `[+]` dengan pembatasan stok.
  - Tombol hapus item dari keranjang.
  - Floating bottom bar dengan subtotal dinamis dan tombol checkout.
- **Layar 2 (Informasi Checkout)**:
  - Kartu alamat pengiriman interaktif dengan modal pemilihan alamat (Rumah, Kantor, Kost).
  - Kartu rincian produk yang dicheckout.
  - Pemilihan opsi kurir pengiriman (Reguler, Hemat, Instant, Kargo) via modal interaktif.
  - Input pesan/catatan untuk penjual.
- **Layar 3 (Rincian Pembayaran - UX Highlight)**:
  - Kartu Hero total pembayaran akhir berbobot visual tinggi dengan warna oranye Shopee.
  - Badge akumulasi total penghematan pengguna.
  - Modal penjelasan transparansi perhitungan dan formula matematis.
  - Modal pemilihan voucher (Voucher Gratis Ongkir dan Voucher Diskon Belanja).
  - Switch interaktif pemanfaatan Koin Shopee (hingga 15.000 koin).
  - Tabel rincian pembiayaan transparan tanpa biaya tersembunyi.
- **Layar 4 (Konfirmasi Pembayaran)**:
  - Tab kategori filter metode pembayaran (E-Wallet, Transfer Bank VA, COD).
  - Saluran pembayaran lengkap: ShopeePay, SPayLater, BCA VA, Mandiri VA, BRI VA, GoPay, dan COD.
  - Validasi error apabila metode belum dipilih.
  - Modal pop-up dialog konfirmasi akhir sebelum menyelesaikan transaksi.
- **Layar 5 (Pembayaran Berhasil)**:
  - Efek perayaan konfeti interaktif.
  - Status pembayaran terverifikasi lunas.
  - Nomor pesanan simulasi unik dengan fitur salin ke clipboard.
  - Accordion nota digital (Digital Receipt) yang dapat dibuka/tutup.
  - Simulasi pelacak status kurir/pengiriman bertahap.
  - Tombol kembali ke beranda untuk mereset seluruh state simulasi.
- **Komponen Pendukung & Shell**:
  - Mobile frame iPhone 15 dengan Dynamic Island, status bar jam dan baterai.
  - Step Progress Bar 5 tahapan checkout visual.
  - Quick Jump Bar untuk langsung menguji layar 1, 2, 3, 4, atau 5.
  - Tombol toggle mode Full-Width vs Phone Chassis.
  - Tombol callout penjelasan masalah dan solusi UX.
- **Dokumentasi Lengkap**:
  - `README.md` terstruktur dengan panduan instalasi dan penjelasan alur.
  - `docs/PRD.md` (Product Requirements Document).
  - `docs/CHANGELOG.md`.
