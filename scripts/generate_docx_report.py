import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_report():
    doc = docx.Document()

    # Page setup: Standard A4
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Primary colors
    COLOR_PRIMARY = RGBColor(238, 77, 45)    # Shopee Orange #EE4D2D
    COLOR_DARK = RGBColor(34, 34, 34)        # #222222
    COLOR_MUTED = RGBColor(117, 117, 117)    # #757575
    COLOR_NAVY = RGBColor(30, 41, 59)        # Slate 800

    # Document Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_cat = p_title.add_run("LAPORAN TUGAS REKAYASA INTERAKSI\n")
    run_cat.font.size = Pt(13)
    run_cat.font.bold = True
    run_cat.font.color.rgb = COLOR_PRIMARY

    run_subcat = p_title.add_run("WORKSHEET 12: WIREFRAME & INTERACTIVE PROTOTYPE\n\n")
    run_subcat.font.size = Pt(11)
    run_subcat.font.bold = True
    run_subcat.font.color.rgb = COLOR_MUTED

    run_title = p_title.add_run("Redesain Pengalaman Pengguna (UX) Alur Checkout Shopee\nBerfokus pada Transparansi Rincian Pembayaran\n")
    run_title.font.size = Pt(16)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_DARK

    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_div = p_div.add_run("―" * 35)
    run_div.font.color.rgb = COLOR_PRIMARY

    # Metadata Box
    table_meta = doc.add_table(rows=4, cols=2)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Mata Kuliah", "Rekayasa Interaksi (Human-Computer Interaction)"),
        ("Tugas", "Worksheet 12 - Wireframe dan Prototype"),
        ("Repositori GitHub", "https://github.com/alifrahman08/tugasrekayasainteraksi"),
        ("Teknologi Prototype", "Next.js App Router, React, TypeScript, Tailwind CSS"),
    ]
    for idx, (label, val) in enumerate(meta_data):
        row = table_meta.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(label)
        r0.font.bold = True
        r0.font.size = Pt(10)
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(val)
        r1.font.size = Pt(10)
        set_cell_background(c0, "F8F9FA")
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c0, 60, 60, 100, 100)
        set_cell_margins(c1, 60, 60, 100, 100)

    doc.add_paragraph() # Spacing

    # BAB 1
    h1 = doc.add_heading("BAB 1: LATAR BELAKANG & PERMASALAHAN UX", level=1)
    h1.runs[0].font.color.rgb = COLOR_PRIMARY

    p1 = doc.add_paragraph()
    p1.paragraph_format.line_spacing = 1.15
    p1.add_run(
        "Pada platform e-commerce terkemuka seperti Shopee, tahapan checkout merupakan momen krusial yang menentukan "
        "apakah pengguna berhasil menyelesaikan pembelian atau justru membatalkan transaksi (cart abandonment). "
        "Berdasarkan analisis evaluasi interaksi, ditemukan masalah utama pada alur checkout konvensional:"
    )

    bullet_points = [
        ("Kecemasan Biaya (Checkout Anxiety): ", "Pengguna kerap merasa ragu terhadap angka total pembayaran akhir dan terpaksa melakukan pengecekan ulang berkali-kali (double-checking)."),
        ("Tumpukan Diskon yang Membingungkan: ", "Penggabungan voucher toko, voucher Shopee platform, diskon ongkos kirim, dan koin sering kali tercampur tanpa pemisahan visual yang jelas."),
        ("Biaya Tersembunyi (Hidden Fees): ", "Biaya penanganan metode pembayaran atau biaya layanan platform sering kali muncul mendadak di layar akhir tanpa edukasi perhitungan transparan."),
    ]
    for b_title, b_desc in bullet_points:
        p_b = doc.add_paragraph(style='List Bullet')
        p_b.paragraph_format.line_spacing = 1.15
        r_bt = p_b.add_run(b_title)
        r_bt.font.bold = True
        p_b.add_run(b_desc)

    p_sol = doc.add_paragraph()
    p_sol.paragraph_format.line_spacing = 1.15
    r_sol_t = p_sol.add_run("Solusi Desain Rekayasa Interaksi:\n")
    r_sol_t.font.bold = True
    p_sol.add_run(
        "Menghadirkan layar khusus (Layar 3: Rincian Pembayaran) yang berfungsi sebagai pusat transparansi finansial. "
        "Layar ini menonjolkan kartu total akhir berbobot visual tinggi (Shopee Orange), badge penghematan riil, sakelar interaktif koin, "
        "dan fitur edukatif 'Cara Hitung Transparan' yang menjelaskan formula matematis dari setiap rupiah yang ditagihkan."
    )

    # BAB 2
    h2 = doc.add_heading("BAB 2: USER PERSONA & RUANG LINGKUP (PRD)", level=1)
    h2.runs[0].font.color.rgb = COLOR_PRIMARY

    p_per = doc.add_paragraph()
    p_per.paragraph_format.line_spacing = 1.15
    p_per.add_run("Profil User Persona Utama:\n").font.bold = True
    p_per.add_run(
        "• Nama: Andi Pratama (24 Tahun)\n"
        "• Pekerjaan: Mahasiswa Tingkat Akhir / Karyawan Pemula\n"
        "• Karakteristik: Teliti dalam pengeluaran belanja online, aktif berburu voucher gratis ongkir, dan mengandalkan dompet digital (ShopeePay/GoPay).\n"
        "• Pain Point: Sering curiga nominal total berubah di menit-menit akhir dan sulit melacak potongan voucher mana yang sebenarnya aktif."
    )

    # BAB 3
    h3 = doc.add_heading("BAB 3: ALUR INTERAKSI PENGGUNA (USER FLOW)", level=1)
    h3.runs[0].font.color.rgb = COLOR_PRIMARY

    p_flow = doc.add_paragraph()
    p_flow.paragraph_format.line_spacing = 1.15
    p_flow.add_run(
        "Alur interaksi dirancang secara sekuensial dan linier dengan tetap memberikan kebebasan kontrol pengguna "
        "untuk kembali ke langkah sebelumnya sewaktu-waktu:"
    )

    flow_steps = [
        "Langkah 1: Keranjang Belanja — Pemilihan barang yang ingin dicheckout, pengaturan jumlah barang, dan pengecekan subtotal awal.",
        "Langkah 2: Informasi Checkout — Penentuan alamat tujuan pengiriman dan pemilihan jasa kurir pengiriman (Reguler/Hemat/Instant).",
        "Langkah 3: Rincian Pembayaran (Core UX) — Verifikasi rincian biaya, simulasi voucher ongkir & diskon, pemanfaatan koin, serta penegasan total pembayaran akhir.",
        "Langkah 4: Konfirmasi Pembayaran — Pemilihan metode transaksi (ShopeePay, Virtual Account, COD) dan dialog konfirmasi final.",
        "Langkah 5: Pembayaran Berhasil — Penerimaan nomor pesanan SPX, status pembayaran lunas, pelacakan kurir, dan nota digital.",
    ]
    for step in flow_steps:
        p_fs = doc.add_paragraph(style='List Number')
        p_fs.paragraph_format.line_spacing = 1.15
        p_fs.add_run(step)

    # BAB 4
    h4 = doc.add_heading("BAB 4: IMPLEMENTASI HIGH-FIDELITY PROTOTYPE (5 LAYAR UTAMA)", level=1)
    h4.runs[0].font.color.rgb = COLOR_PRIMARY

    screens_data = [
        {
            "num": "1",
            "title": "Screen 1: Keranjang Belanja",
            "img": "01_keranjang_belanja.png",
            "desc": (
                "Menampilkan daftar produk yang dipilih pengguna, foto produk, nama produk, harga asli dan diskon, "
                "kontrol kuantitas barang stepper [-] qty [+], checkbox per-produk, fitur 'Pilih Semua', dan tombol Checkout."
            ),
            "ux_points": [
                "Checkbox interaktif yang langsung mengupdate counter barang terpilih.",
                "Pencegahan error: Tombol Checkout dinonaktifkan otomatis apabila belum ada produk yang dicentang.",
                "Badge toko 'Mall' memberikan rasa aman (trustworthiness).",
            ]
        },
        {
            "num": "2",
            "title": "Screen 2: Checkout (Informasi Pengiriman & Produk)",
            "img": "02_checkout_pengiriman.png",
            "desc": (
                "Menampilkan alamat pengiriman lengkap dengan tag (Rumah/Kantor), informasi produk yang dicheckout, "
                "pilihan jasa pengiriman beserta estimasi biaya dan waktu tiba (ETA), serta kolom catatan untuk penjual."
            ),
            "ux_points": [
                "Tombol 'Ubah' membuka modal pemilihan alamat alternatif (Rumah, Kantor, Kost).",
                "Pemilihan kurir (Reguler, Hemat, Instant, Kargo) langsung memperbarui estimasi biaya kirim.",
                "Visualisasi tanggal tiba memberikan kepastian waktu kepada pembeli.",
            ]
        },
        {
            "num": "3",
            "title": "Screen 3: Rincian Pembayaran (Fokus Utama Inovasi UX)",
            "img": "03_rincian_pembayaran_utama.png",
            "desc": (
                "Layar paling penting dalam proyek. Menampilkan rincian harga produk, biaya pengiriman, voucher yang digunakan, "
                "potongan diskon, koin Shopee, dan total pembayaran akhir. Total akhir diberi penekanan visual yang sangat kontras "
                "agar pengguna langsung mengetahui nominal riil yang harus dibayar."
            ),
            "ux_points": [
                "Hero Card Total Akhir berwarna oranye Shopee dengan tipografi bold dan bayangan lembut.",
                "Badge akumulatif 'Kamu Hemat RpXX.XXX' memberikan kepuasan emosional (reward feeling).",
                "Tombol 'Cara Hitung' membuka modal transparansi rumus matematika perhitungan tanpa biaya tersembunyi.",
                "Sakelar (switch toggle) Koin Shopee interaktif dengan pembatasan otomatis maksimal 25% subtotal.",
            ]
        },
        {
            "num": "4",
            "title": "Screen 4: Konfirmasi Pembayaran",
            "img": "04_konfirmasi_pembayaran.png",
            "desc": (
                "Menampilkan ringkasan transaksi, alamat tujuan, total pembayaran akhir, tab filter kategori metode pembayaran, "
                "pilihan metode pembayaran (Transfer Bank VA, E-Wallet ShopeePay, COD), dan tombol Bayar Sekarang."
            ),
            "ux_points": [
                "Kategori saluran terorganisir rapi (ShopeePay bebas biaya penanganan, Bank VA verifikasi otomatis).",
                "Validasi error visual jika pengguna belum memilih saluran pembayaran.",
                "Dialog pop-up konfirmasi final sebelum transaksi benar-benar dieksekusi.",
            ]
        },
        {
            "num": "5",
            "title": "Screen 5: Pembayaran Berhasil & Nota Digital",
            "img": "05_pembayaran_berhasil.png",
            "desc": (
                "Menampilkan ilustrasi sukses terverifikasi, animasi perayaan konfeti, nomor pesanan simulasi unik (SPX-ID), "
                "total pembayaran lunas, timeline pelacakan status kurir, serta nota digital yang dapat dibuka/tutup."
            ),
            "ux_points": [
                "Fitur 1-klik 'Salin No. Pesanan' dengan feedback tooltip visual 'Tersalin!'.",
                "Simulasi status kurir (Pesanan Dibayar -> Penjual Menyiapkan -> Kurir Menjemput).",
                "Tombol 'Kembali ke Beranda' untuk mereset seluruh data simulasi.",
            ]
        },
    ]

    img_dir = "C:\\shoope\\screenshots"

    for s in screens_data:
        h_s = doc.add_heading(s["title"], level=2)
        h_s.runs[0].font.color.rgb = COLOR_NAVY

        p_desc = doc.add_paragraph()
        p_desc.paragraph_format.line_spacing = 1.15
        p_desc.add_run(s["desc"])

        # Insert screenshot image if exists
        img_path = os.path.join(img_dir, s["img"])
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run_img = p_img.add_run()
            run_img.add_picture(img_path, width=Inches(3.0))

            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r_cap = p_cap.add_run(f"Gambar: Prototype Mobile {s['title']}")
            r_cap.font.italic = True
            r_cap.font.size = Pt(9)
            r_cap.font.color.rgb = COLOR_MUTED

        p_ux = doc.add_paragraph()
        p_ux.add_run("Poin Rekayasa Interaksi:\n").font.bold = True
        for pt in s["ux_points"]:
            p_pt = doc.add_paragraph(style='List Bullet')
            p_pt.paragraph_format.line_spacing = 1.15
            p_pt.add_run(pt)

        doc.add_paragraph()

    # Modal Showcase
    h_modal = doc.add_heading("Fitur Pendukung: Modal Transparansi & Pemilihan Voucher", level=2)
    h_modal.runs[0].font.color.rgb = COLOR_NAVY

    p_mod_desc = doc.add_paragraph()
    p_mod_desc.paragraph_format.line_spacing = 1.15
    p_mod_desc.add_run(
        "Untuk memenuhi kebutuhan transparansi pada Layar 3, disediakan modal edukatif yang membedah perhitungan secara sistematis:"
    )

    modals = [
        ("06_modal_transparansi_rumus.png", "Modal Transparansi Rumus & Perhitungan Biaya"),
        ("07_modal_pilihan_voucher.png", "Modal Pemilihan Voucher Gratis Ongkir & Diskon"),
    ]
    for m_img, m_title in modals:
        m_path = os.path.join(img_dir, m_img)
        if os.path.exists(m_path):
            p_m = doc.add_paragraph()
            p_m.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_m.add_run().add_picture(m_path, width=Inches(3.0))

            p_mc = doc.add_paragraph()
            p_mc.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r_mc = p_mc.add_run(f"Gambar: {m_title}")
            r_mc.font.italic = True
            r_mc.font.size = Pt(9)
            r_mc.font.color.rgb = COLOR_MUTED

    # BAB 5
    h5 = doc.add_heading("BAB 5: EVALUASI PRINSIP HEURISTIK USABILITAS (NIELSEN)", level=1)
    h5.runs[0].font.color.rgb = COLOR_PRIMARY

    p_heur = doc.add_paragraph()
    p_heur.paragraph_format.line_spacing = 1.15
    p_heur.add_run("Implementasi prinsip Rekayasa Interaksi dievaluasi melalui 10 Heuristik Usabilitas Jakob Nielsen:")

    table_heur = doc.add_table(rows=6, cols=2)
    table_heur.alignment = WD_TABLE_ALIGNMENT.CENTER
    heur_data = [
        ("Prinsip Heuristik", "Penerapan pada Prototype Shopee Checkout UX Redesign"),
        ("1. Visibility of System Status", "Step progress bar 5 langkah di bagian atas selalu menunjukkan posisi alur checkout pengguna, serta subtotal yang terupdate secara real-time."),
        ("2. Match Between System and Real World", "Penggunaan istilah standar e-commerce Indonesia (Shopee Mall, Voucher XTRA, Koin Shopee, Virtual Account, COD)."),
        ("3. User Control and Freedom", "Tersedia tombol kembali (Back Navigation) di setiap layar dan tombol Reset Demo untuk mengulang dari awal tanpa hambatan."),
        ("4. Error Prevention", "Pencegahan klik checkout jika keranjang kosong dan validasi pesan error apabila pengguna belum memilih saluran pembayaran."),
        ("5. Recognition Rather than Recall", "Seluruh rincian pembiayaan dan formula kalkulasi dituliskan secara transparan sehingga pengguna tidak perlu mengingat-ingat atau menghitung manual."),
    ]
    for idx, (h_title, h_impl) in enumerate(heur_data):
        row = table_heur.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        p0, p1 = c0.paragraphs[0], c1.paragraphs[0]
        r0 = p0.add_run(h_title)
        r1 = p1.add_run(h_impl)
        if idx == 0:
            r0.font.bold = True
            r1.font.bold = True
            set_cell_background(c0, "EE4D2D")
            set_cell_background(c1, "EE4D2D")
            r0.font.color.rgb = RGBColor(255, 255, 255)
            r1.font.color.rgb = RGBColor(255, 255, 255)
        else:
            r0.font.bold = True
            set_cell_background(c0, "F8F9FA" if idx % 2 == 1 else "FFFFFF")
            set_cell_background(c1, "F8F9FA" if idx % 2 == 1 else "FFFFFF")
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)

    doc.add_paragraph()

    # BAB 6
    h6 = doc.add_heading("BAB 6: KESIMPULAN & TAUTAN PROYEK", level=1)
    h6.runs[0].font.color.rgb = COLOR_PRIMARY

    p_conc = doc.add_paragraph()
    p_conc.paragraph_format.line_spacing = 1.15
    p_conc.add_run(
        "Prototipe Shopee Checkout UX Redesign berhasil menjawab permasalahan kognitif pengguna melalui desain "
        "yang transparan, modern, dan interaktif. Dengan menyajikan pemisahan komponen harga yang tegas serta penekanan "
        "visual pada total akhir, pengguna dapat menyelesaikan proses checkout dengan penuh keyakinan tanpa keraguan.\n\n"
        "Tautan Repositori GitHub: https://github.com/alifrahman08/tugasrekayasainteraksi\n"
        "Aplikasi dapat dijalankan secara lokal melalui perintah 'npm run dev' di peramban web http://localhost:3000."
    )

    output_path = "C:\\shoope\\Laporan_Worksheet_12_Shopee_Checkout_UX_Redesign.docx"
    doc.save(output_path)
    print(f"Report successfully generated at: {output_path}")

if __name__ == "__main__":
    create_report()
