const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const ARTIFACT_DIR = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\3d602ca5-bb72-4bb7-81e2-77541d5a5606';
const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Launching browser at:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: {
      width: 1280,
      height: 1050,
      deviceScaleFactor: 2, // 2x Retina crisp quality for Word doc!
    },
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await sleep(1500);

  // Helper to click by button text
  async function clickButtonWithText(text) {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const btnText = await page.evaluate((el) => el.innerText, btn);
      if (btnText && btnText.includes(text)) {
        await btn.click();
        await sleep(600);
        return true;
      }
    }
    return false;
  }

  async function capturePhone(filepath) {
    const phoneEl = await page.$('#phone-device-frame');
    if (phoneEl) {
      const buffer = await phoneEl.screenshot();
      fs.writeFileSync(filepath, buffer);
    } else {
      const buffer = await page.screenshot();
      fs.writeFileSync(filepath, buffer);
    }
  }

  // 1. Screen 1: Keranjang Belanja
  console.log('Capturing Screen 1: Keranjang Belanja...');
  await clickButtonWithText('1. Keranjang');
  await sleep(800);
  const p1 = path.join(OUTPUT_DIR, '01_keranjang_belanja.png');
  await capturePhone(p1);
  fs.copyFileSync(p1, path.join(ARTIFACT_DIR, '01_keranjang_belanja.png'));

  // 2. Screen 2: Checkout
  console.log('Capturing Screen 2: Checkout...');
  await clickButtonWithText('2. Checkout');
  await sleep(800);
  const p2 = path.join(OUTPUT_DIR, '02_checkout_pengiriman.png');
  await capturePhone(p2);
  fs.copyFileSync(p2, path.join(ARTIFACT_DIR, '02_checkout_pengiriman.png'));

  // 3. Screen 3: Rincian Pembayaran (Fokus Utama)
  console.log('Capturing Screen 3: Rincian Pembayaran (Core UX)...');
  await clickButtonWithText('3. Rincian Biaya');
  await sleep(800);
  const p3 = path.join(OUTPUT_DIR, '03_rincian_pembayaran_utama.png');
  await capturePhone(p3);
  fs.copyFileSync(p3, path.join(ARTIFACT_DIR, '03_rincian_pembayaran_utama.png'));

  // 4. Modal: Transparansi Rumus Perhitungan
  console.log('Capturing Modal: Transparansi Rumus...');
  await clickButtonWithText('Cara Hitung');
  await sleep(700);
  const p4 = path.join(OUTPUT_DIR, '06_modal_transparansi_rumus.png');
  await capturePhone(p4);
  fs.copyFileSync(p4, path.join(ARTIFACT_DIR, '06_modal_transparansi_rumus.png'));
  await clickButtonWithText('Saya Mengerti');
  await sleep(500);

  // 5. Modal: Pilihan Voucher
  console.log('Capturing Modal: Pilihan Voucher...');
  await clickButtonWithText('Ubah Voucher');
  await sleep(700);
  const p5 = path.join(OUTPUT_DIR, '07_modal_pilihan_voucher.png');
  await capturePhone(p5);
  fs.copyFileSync(p5, path.join(ARTIFACT_DIR, '07_modal_pilihan_voucher.png'));
  await clickButtonWithText('Gunakan Voucher');
  await sleep(500);

  // 6. Screen 4: Konfirmasi Pembayaran
  console.log('Capturing Screen 4: Konfirmasi Pembayaran...');
  await clickButtonWithText('4. Konfirmasi');
  await sleep(800);
  const p6 = path.join(OUTPUT_DIR, '04_konfirmasi_pembayaran.png');
  await capturePhone(p6);
  fs.copyFileSync(p6, path.join(ARTIFACT_DIR, '04_konfirmasi_pembayaran.png'));

  // 7. Screen 5: Pembayaran Berhasil
  console.log('Capturing Screen 5: Pembayaran Berhasil...');
  await clickButtonWithText('5. Berhasil');
  await sleep(1000);
  const p7 = path.join(OUTPUT_DIR, '05_pembayaran_berhasil.png');
  await capturePhone(p7);
  fs.copyFileSync(p7, path.join(ARTIFACT_DIR, '05_pembayaran_berhasil.png'));

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
