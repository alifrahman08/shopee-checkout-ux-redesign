import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shopee Checkout UX Redesign | Worksheet 12 Prototype',
  description:
    'Rancangan ulang alur checkout Shopee dengan fokus transparansi rincian pembayaran untuk tugas Rekayasa Interaksi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-neutral-900 overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
