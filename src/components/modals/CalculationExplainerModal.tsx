'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Minus, Plus, Equal } from 'lucide-react';

interface CalculationExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculationExplainerModal: React.FC<CalculationExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { breakdown, appliedShippingVoucher, appliedProductVoucher, useCoins, activePaymentMethod } =
    useCheckout();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Transparansi Rincian Biaya</h3>
              <p className="text-xs text-gray-500">Perhitungan sistematis & transparan tanpa biaya siluman</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Card Formula */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-3.5">
            <p className="font-bold text-gray-800 text-xs mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-shopee-primary" /> Rumus Perhitungan Total Akhir:
            </p>
            <div className="bg-white/80 backdrop-blur rounded-lg p-2.5 font-mono text-[11px] text-gray-800 space-y-1">
              <div>Total = (Subtotal Produk)</div>
              <div className="text-emerald-700">+ (Ongkos Kirim Bersih)</div>
              <div className="text-shopee-primary">- (Diskon Voucher Produk)</div>
              <div className="text-amber-700">- (Koin Shopee Digunakan)</div>
              <div className="text-gray-600">+ (Biaya Layanan & Pembayaran)</div>
            </div>
          </div>

          {/* Breakdown Steps */}
          <div className="space-y-3">
            {/* Step 1 */}
            <div className="border border-gray-200 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between font-semibold text-gray-800 text-xs">
                <span>1. Subtotal Produk ({breakdown.selectedItemsTotalQty} barang)</span>
                <span className="font-bold text-gray-900">{formatRupiah(breakdown.totalProductPrice)}</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Harga diskon flash deal dari harga normal {formatRupiah(breakdown.totalOriginalProductPrice)}.
                Hemat langsung Rp{formatRupiah(breakdown.productSavings).replace('Rp', '')} dari toko.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-gray-200 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between font-semibold text-gray-800 text-xs">
                <span className="flex items-center gap-1">
                  <Plus className="w-3 h-3 text-emerald-600" /> 2. Ongkos Kirim Bersih
                </span>
                <span className="font-bold text-emerald-600">{formatRupiah(breakdown.actualShippingFee)}</span>
              </div>
              <div className="mt-1.5 pl-3 border-l-2 border-emerald-300 space-y-0.5 text-[11px] text-gray-600">
                <div className="flex justify-between">
                  <span>Ongkir Standar Kurir:</span>
                  <span>{formatRupiah(breakdown.shippingFee)}</span>
                </div>
                {breakdown.shippingDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Voucher Gratis Ongkir:</span>
                    <span>-{formatRupiah(breakdown.shippingDiscount)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-gray-200 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between font-semibold text-gray-800 text-xs">
                <span className="flex items-center gap-1">
                  <Minus className="w-3 h-3 text-shopee-primary" /> 3. Potongan Tambahan
                </span>
                <span className="font-bold text-shopee-primary">
                  -{formatRupiah(breakdown.voucherDiscount + breakdown.shopeeCoinsDeduction)}
                </span>
              </div>
              <div className="mt-1.5 pl-3 border-l-2 border-orange-300 space-y-0.5 text-[11px] text-gray-600">
                {breakdown.voucherDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>Voucher Diskon ({appliedProductVoucher?.code}):</span>
                    <span className="font-medium text-shopee-primary">-{formatRupiah(breakdown.voucherDiscount)}</span>
                  </div>
                )}
                {breakdown.shopeeCoinsDeduction > 0 && (
                  <div className="flex justify-between">
                    <span>Koin Shopee ({formatRupiah(breakdown.shopeeCoinsDeduction).replace('Rp', '')} koin):</span>
                    <span className="font-medium text-amber-600">-{formatRupiah(breakdown.shopeeCoinsDeduction)}</span>
                  </div>
                )}
                {breakdown.voucherDiscount === 0 && breakdown.shopeeCoinsDeduction === 0 && (
                  <div className="text-gray-400 italic">Tidak ada voucher tambahan atau koin yang digunakan</div>
                )}
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-gray-200 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between font-semibold text-gray-800 text-xs">
                <span className="flex items-center gap-1">
                  <Plus className="w-3 h-3 text-gray-600" /> 4. Biaya Layanan & Penanganan
                </span>
                <span className="font-bold text-gray-800">
                  {formatRupiah(breakdown.serviceFee + breakdown.paymentHandlingFee)}
                </span>
              </div>
              <div className="mt-1.5 pl-3 border-l-2 border-gray-300 space-y-0.5 text-[11px] text-gray-600">
                <div className="flex justify-between">
                  <span>Biaya Layanan Platform Shopee:</span>
                  <span>{formatRupiah(breakdown.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Penanganan ({activePaymentMethod?.name || 'Metode Pembayaran'}):</span>
                  <span>{formatRupiah(breakdown.paymentHandlingFee)}</span>
                </div>
              </div>
            </div>

            {/* Step 5 - Final */}
            <div className="bg-shopee-orangeSubtle border-2 border-shopee-primary/30 rounded-xl p-3.5">
              <div className="flex items-center justify-between font-bold text-sm text-gray-900">
                <span className="flex items-center gap-1.5 text-shopee-primary">
                  <Equal className="w-4 h-4" /> TOTAL PEMBAYARAN AKHIR
                </span>
                <span className="text-base text-shopee-primary font-black">
                  {formatRupiah(breakdown.finalTotal)}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 rounded-lg p-2 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>
                  Total penghematan kumulatif kamu pada pesanan ini adalah{' '}
                  <strong className="font-bold">{formatRupiah(breakdown.grandTotalSavings)}</strong>!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-shopee-primary text-white font-bold rounded-lg text-xs"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
