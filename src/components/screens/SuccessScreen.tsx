'use client';

import React, { useEffect, useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import {
  CheckCircle2,
  Copy,
  Check,
  Package,
  Truck,
  ArrowRight,
  RotateCcw,
  Receipt,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

export const SuccessScreen: React.FC = () => {
  const { orderResult, resetAll, breakdown } = useCheckout();
  const [copied, setCopied] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    try {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EE4D2D', '#26AA99', '#FFBA00', '#FF7A45', '#52C41A'],
        });
      });
    } catch {
      // Graceful fallback if confetti module is not available in environment
    }
  }, []);

  const handleCopyOrderId = () => {
    if (!orderResult?.orderId) return;
    navigator.clipboard?.writeText(orderResult.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const order = orderResult || {
    orderId: 'SPX-ID-20261122-8924',
    orderDate: '22 Nov 2026, 18:05 WIB',
    paymentMethod: { name: 'ShopeePay' },
    breakdown: breakdown,
    items: [],
  };

  return (
    <div className="flex flex-col min-h-full bg-shopee-bgLight pb-28 animate-in fade-in duration-300">
      {/* 1. Header Banner Sukses */}
      <div className="bg-gradient-to-b from-emerald-600 to-emerald-700 text-white pt-8 pb-10 px-4 text-center rounded-b-3xl shadow-md relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -left-10 -top-10 w-36 h-36 bg-white/10 rounded-full blur-xs pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xs pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-emerald-400/40 animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-xl font-black mt-3.5 tracking-tight text-white">
            Pembayaran Berhasil!
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs">
            Pesanan kamu telah dikonfirmasi dan pembayaran otomatis terverifikasi sistem Shopee.
          </p>

          <div className="mt-4 bg-emerald-800/60 backdrop-blur-xs border border-emerald-400/30 rounded-xl px-4 py-2 inline-flex items-center gap-2">
            <span className="text-[11px] text-emerald-200">Total Dibayar:</span>
            <span className="text-lg font-black text-white">
              {formatRupiah(order.breakdown.finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Order Details Card */}
      <div className="mx-3 -mt-5 bg-white rounded-2xl border border-gray-200 p-4 shadow-md relative z-10 space-y-3.5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <span className="text-[11px] text-gray-400 block">Nomor Pesanan</span>
            <span className="font-mono font-bold text-gray-900 text-sm">{order.orderId}</span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="flex items-center gap-1 text-[11px] font-semibold text-shopee-primary bg-shopee-orangeSubtle px-2.5 py-1.5 rounded-lg hover:bg-orange-100 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin No.</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Waktu Pembayaran:</span>
            <span className="font-medium text-gray-900">{order.orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Metode Pembayaran:</span>
            <span className="font-bold text-gray-900">{order.paymentMethod?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status Transaksi:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Lunas / Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* 3. Status Pelacakan Pengiriman (Simulasi Timeline) */}
      <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
        <h3 className="text-xs font-bold text-gray-900 pb-2.5 border-b border-gray-100 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-shopee-primary" /> Status Pengiriman
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
            Sedang Diproses
          </span>
        </h3>

        <div className="pt-3 pl-2 space-y-4 text-xs relative">
          {/* Vertical progress line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-200" />

          {/* Timeline Step 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-emerald-50">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-xs">Pesanan Berhasil Dibayar</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Sistem memvalidasi pembayaran</p>
            </div>
          </div>

          {/* Timeline Step 2 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-5 h-5 rounded-full bg-shopee-primary text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-shopee-orangeSubtle animate-pulse">
              <Package className="w-3 h-3" />
            </div>
            <div>
              <p className="font-bold text-shopee-primary text-xs">Penjual Menyiapkan Pesanan</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Paket sedang dikemas rapi dengan bubble wrap
              </p>
            </div>
          </div>

          {/* Timeline Step 3 */}
          <div className="flex items-start gap-3 relative opacity-60">
            <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0 z-10">
              <Clock className="w-3 h-3" />
            </div>
            <div>
              <p className="font-medium text-gray-700 text-xs">Menunggu Penjemputan Kurir</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Shopee Xpress Standard</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Expandable Digital Receipt (Rincian Nota) */}
      <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
        <button
          onClick={() => setShowReceipt(!showReceipt)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-900 hover:text-shopee-primary transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-shopee-primary" /> Rincian Nota Digital
          </span>
          {showReceipt ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {showReceipt && (
          <div className="pt-3 mt-3 border-t border-gray-100 space-y-2.5 text-xs text-gray-600 animate-in fade-in">
            <div className="flex justify-between">
              <span>Subtotal Produk:</span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(order.breakdown.totalProductPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Pengiriman:</span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(order.breakdown.shippingFee)}
              </span>
            </div>
            {order.breakdown.shippingDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Diskon Pengiriman:</span>
                <span className="font-semibold">
                  -{formatRupiah(order.breakdown.shippingDiscount)}
                </span>
              </div>
            )}
            {order.breakdown.voucherDiscount > 0 && (
              <div className="flex justify-between text-shopee-primary">
                <span>Diskon Voucher Shopee:</span>
                <span className="font-semibold">
                  -{formatRupiah(order.breakdown.voucherDiscount)}
                </span>
              </div>
            )}
            {order.breakdown.shopeeCoinsDeduction > 0 && (
              <div className="flex justify-between text-amber-700">
                <span>Koin Shopee Digunakan:</span>
                <span className="font-semibold">
                  -{formatRupiah(order.breakdown.shopeeCoinsDeduction)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Biaya Layanan & Penanganan:</span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(order.breakdown.serviceFee + order.breakdown.paymentHandlingFee)}
              </span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
              <span>Total Akhir:</span>
              <span className="text-shopee-primary font-black text-sm">
                {formatRupiah(order.breakdown.finalTotal)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 5. Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-float-bottom p-3 z-20 flex gap-2.5">
        <button
          onClick={resetAll}
          className="flex-1 py-3 bg-shopee-primary hover:bg-shopee-primaryHover text-white font-bold rounded-xl text-xs shadow-md shadow-shopee-primary/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kembali ke Beranda (Ulangi Demo)</span>
        </button>
      </div>
    </div>
  );
};
