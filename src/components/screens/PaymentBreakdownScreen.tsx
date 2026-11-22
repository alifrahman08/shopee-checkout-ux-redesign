'use client';

import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah, formatNumber } from '../../utils/format';
import {
  Sparkles,
  Ticket,
  Truck,
  Coins,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { VoucherModal } from '../modals/VoucherModal';
import { CalculationExplainerModal } from '../modals/CalculationExplainerModal';

export const PaymentBreakdownScreen: React.FC = () => {
  const {
    breakdown,
    appliedShippingVoucher,
    appliedProductVoucher,
    coinsBalance,
    useCoins,
    setUseCoins,
    activePaymentMethod,
    goToNextScreen,
  } = useCheckout();

  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isExplainerModalOpen, setIsExplainerModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-shopee-bgLight pb-32">
      {/* 1. HERO CARD: PENEKANAN VISUAL TOTAL AKHIR & PENGHEMATAN */}
      <div className="bg-gradient-to-br from-shopee-primary via-[#F54B2A] to-[#E03A17] text-white p-4 mx-3 mt-3 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-sm pointer-events-none" />
        <div className="absolute right-12 -top-8 w-24 h-24 bg-white/10 rounded-full blur-sm pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-orange-100 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Total Pembayaran Terverifikasi
            </span>
            <button
              onClick={() => setIsExplainerModalOpen(true)}
              className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur text-white px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 active:scale-95"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Cara Hitung</span>
            </button>
          </div>

          {/* Prominent final amount */}
          <div className="mt-2.5">
            <div className="text-3xl font-black tracking-tight text-white drop-shadow-xs">
              {formatRupiah(breakdown.finalTotal)}
            </div>
            <p className="text-xs text-orange-100 mt-0.5">
              Sudah termasuk produk, ongkir bersih, diskon voucher & biaya layanan.
            </p>
          </div>

          {/* Savings Badge */}
          {breakdown.grandTotalSavings > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Kamu Hemat {formatRupiah(breakdown.grandTotalSavings)}!</span>
              </div>
              <span className="text-[11px] text-white/90 bg-black/20 px-2 py-0.5 rounded-full font-medium">
                Kombinasi Diskon Aktif
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. TRANSPARENT CALCULATION CALLOUT */}
      <div className="mx-3 mt-2.5">
        <button
          onClick={() => setIsExplainerModalOpen(true)}
          className="w-full bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-left hover:bg-emerald-100/50 transition-colors shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900 group-hover:text-emerald-950">
                Transparansi Rincian Harga
              </p>
              <p className="text-[11px] text-emerald-700">
                Klik untuk melihat formula dan perincian tiap komponen biaya
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 3. VOUCHER & DISKON INTERAKTIF */}
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-shopee-orangeSubtle text-shopee-primary flex items-center justify-center">
              <Ticket className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-gray-900">Voucher Shopee & Diskon</span>
          </div>

          <button
            onClick={() => setIsVoucherModalOpen(true)}
            className="text-xs font-bold text-shopee-primary hover:text-shopee-primaryHover flex items-center gap-0.5"
          >
            <span>Ubah Voucher</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Applied Vouchers Preview */}
        <div className="pt-2.5 space-y-2">
          {appliedShippingVoucher ? (
            <div className="flex items-center justify-between bg-emerald-50/60 border border-emerald-200/70 rounded-lg p-2 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-800">{appliedShippingVoucher.title}</span>
                  <span className="block text-[10px] text-emerald-700 font-medium">
                    Potongan ongkos kirim aktif
                  </span>
                </div>
              </div>
              <span className="font-bold text-emerald-600 text-xs">
                -{formatRupiah(breakdown.shippingDiscount)}
              </span>
            </div>
          ) : (
            <div
              onClick={() => setIsVoucherModalOpen(true)}
              className="text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg p-2 text-center cursor-pointer hover:border-shopee-primary"
            >
              + Pasang Voucher Gratis Ongkir
            </div>
          )}

          {appliedProductVoucher ? (
            <div className="flex items-center justify-between bg-orange-50/60 border border-orange-200/70 rounded-lg p-2 text-xs">
              <div className="flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-shopee-primary flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-800">{appliedProductVoucher.title}</span>
                  <span className="block text-[10px] text-shopee-primary font-medium">
                    Kode: {appliedProductVoucher.code}
                  </span>
                </div>
              </div>
              <span className="font-bold text-shopee-primary text-xs">
                -{formatRupiah(breakdown.voucherDiscount)}
              </span>
            </div>
          ) : (
            <div
              onClick={() => setIsVoucherModalOpen(true)}
              className="text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg p-2 text-center cursor-pointer hover:border-shopee-primary"
            >
              + Pasang Voucher Diskon Toko / Shopee
            </div>
          )}
        </div>
      </div>

      {/* 4. TUKAR KOIN SHOPEE (INTERAKTIF SWITCH) */}
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-200 p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-900">Tukarkan Koin Shopee</span>
              <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                Milikmu: {formatNumber(coinsBalance)} Koin
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Gunakan koin untuk potongan tambahan hingga{' '}
              <strong className="text-amber-700 font-semibold">
                {formatRupiah(breakdown.shopeeCoinsDeduction)}
              </strong>
            </p>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setUseCoins(!useCoins)}
          aria-label="Gunakan Koin Shopee"
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
            useCoins ? 'bg-amber-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              useCoins ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 5. TABEL RINCIAN PEMBAYARAN SISTEMATIS */}
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
        <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center justify-between">
          <span>Struktur Rincian Pembayaran</span>
          <span className="text-[11px] font-normal text-gray-500 lowercase">
            ({breakdown.selectedItemsTotalQty} barang)
          </span>
        </h3>

        <div className="pt-3 space-y-2.5 text-xs">
          {/* Subtotal Produk */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal Produk</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                {formatRupiah(breakdown.totalProductPrice)}
              </span>
              {breakdown.productSavings > 0 && (
                <span className="block text-[10px] text-gray-400 line-through">
                  {formatRupiah(breakdown.totalOriginalProductPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Total Ongkos Kirim */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600">Total Ongkos Kirim</span>
              <span className="block text-[10px] text-gray-400">Jasa kirim reguler</span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                {formatRupiah(breakdown.shippingFee)}
              </span>
            </div>
          </div>

          {/* Diskon Pengiriman */}
          {breakdown.shippingDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 bg-emerald-50/50 -mx-2 px-2 py-1 rounded">
              <span className="font-medium">Potongan Ongkos Kirim</span>
              <span className="font-bold">-{formatRupiah(breakdown.shippingDiscount)}</span>
            </div>
          )}

          {/* Diskon Voucher Shopee */}
          {breakdown.voucherDiscount > 0 && (
            <div className="flex items-center justify-between text-shopee-primary bg-orange-50/50 -mx-2 px-2 py-1 rounded">
              <span className="font-medium">Voucher Diskon ({appliedProductVoucher?.code})</span>
              <span className="font-bold">-{formatRupiah(breakdown.voucherDiscount)}</span>
            </div>
          )}

          {/* Koin Shopee Digunakan */}
          {breakdown.shopeeCoinsDeduction > 0 && (
            <div className="flex items-center justify-between text-amber-700 bg-amber-50/50 -mx-2 px-2 py-1 rounded">
              <span className="font-medium">Koin Shopee Digunakan</span>
              <span className="font-bold">-{formatRupiah(breakdown.shopeeCoinsDeduction)}</span>
            </div>
          )}

          {/* Biaya Layanan */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Biaya Layanan Aplikasi</span>
              <div
                title="Biaya operasional & proteksi transaksi Shopee"
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsExplainerModalOpen(true)}
              >
                <Info className="w-3 h-3" />
              </div>
            </div>
            <span className="font-semibold text-gray-900">{formatRupiah(breakdown.serviceFee)}</span>
          </div>

          {/* Biaya Penanganan Metode Pembayaran */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Biaya Penanganan Pembayaran</span>
              <span className="text-[10px] text-gray-400">
                ({activePaymentMethod?.name || 'Metode Pembayaran'})
              </span>
            </div>
            <span
              className={`font-semibold ${
                breakdown.paymentHandlingFee === 0 ? 'text-emerald-600' : 'text-gray-900'
              }`}
            >
              {breakdown.paymentHandlingFee === 0
                ? 'Gratis'
                : formatRupiah(breakdown.paymentHandlingFee)}
            </span>
          </div>

          {/* Garis batas tegas untuk Total Akhir */}
          <div className="border-t-2 border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-gray-900 uppercase">
                  Total Pembayaran Akhir
                </span>
                <span className="block text-[10px] text-gray-500">
                  Sudah dipotong semua voucher & diskon
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-shopee-primary">
                  {formatRupiah(breakdown.finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar: Action to Screen 4 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-float-bottom px-4 py-2.5 z-20 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-gray-500 font-medium">Total Akhir Terverifikasi:</div>
          <div className="text-lg font-black text-shopee-primary leading-tight">
            {formatRupiah(breakdown.finalTotal)}
          </div>
          {breakdown.grandTotalSavings > 0 && (
            <div className="text-[10px] font-bold text-emerald-600">
              Hemat {formatRupiah(breakdown.grandTotalSavings)}
            </div>
          )}
        </div>

        <button
          onClick={goToNextScreen}
          className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-shopee-primary hover:bg-shopee-primaryHover text-white shadow-md shadow-shopee-primary/30 active:scale-95 transition-all"
        >
          <span>Lanjut Pembayaran</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modals */}
      <VoucherModal isOpen={isVoucherModalOpen} onClose={() => setIsVoucherModalOpen(false)} />
      <CalculationExplainerModal
        isOpen={isExplainerModalOpen}
        onClose={() => setIsExplainerModalOpen(false)}
      />
    </div>
  );
};
