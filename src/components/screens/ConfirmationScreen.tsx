'use client';

import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import {
  Wallet,
  Building2,
  HandCoins,
  CreditCard,
  Smartphone,
  Check,
  AlertCircle,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Lock,
  ChevronRight,
  X,
} from 'lucide-react';
import { PaymentCategory } from '../../types';

export const ConfirmationScreen: React.FC = () => {
  const {
    selectedProducts,
    activeAddress,
    breakdown,
    paymentMethods,
    selectedPaymentId,
    setSelectedPaymentId,
    activePaymentMethod,
    paymentValidationError,
    completePayment,
  } = useCheckout();

  const [activeCategory, setActiveCategory] = useState<PaymentCategory | 'ALL'>('ALL');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Filter methods if tab selected
  const filteredMethods = paymentMethods.filter((method) => {
    if (activeCategory === 'ALL') return true;
    return method.category === activeCategory;
  });

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-shopee-primary" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'HandCoins':
        return <HandCoins className="w-5 h-5 text-amber-600" />;
      case 'CreditCard':
      default:
        return <CreditCard className="w-5 h-5 text-purple-600" />;
    }
  };

  const handlePayClick = () => {
    if (!selectedPaymentId) {
      // Trigger validation error
      completePayment();
      return;
    }
    // Show confirmation modal first
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmModal(false);
    completePayment();
  };

  return (
    <div className="flex flex-col min-h-full bg-shopee-bgLight pb-32">
      {/* 1. Validation Alert Banner if error exists */}
      {paymentValidationError && (
        <div className="mx-3 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="font-semibold">{paymentValidationError}</span>
        </div>
      )}

      {/* 2. Ringkasan Pesanan Singkat (Order Recap) */}
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-200 p-3.5 shadow-xs">
        <h3 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-shopee-primary" /> Ringkasan Pesanan & Alamat
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            {breakdown.selectedItemsTotalQty} Barang
          </span>
        </h3>

        <div className="pt-2.5 space-y-2 text-xs">
          {/* Destination */}
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-800">
                {activeAddress.recipientName} ({activeAddress.tag})
              </span>
              <p className="text-[11px] text-gray-500 truncate">
                {activeAddress.addressLine}, {activeAddress.city}
              </p>
            </div>
          </div>

          {/* Product Items preview */}
          <div className="bg-gray-50 rounded-lg p-2 space-y-1">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-[11px] text-gray-700">
                <span className="truncate max-w-[200px]">{p.name}</span>
                <span className="font-medium text-gray-900 whitespace-nowrap ml-2">
                  x{p.quantity} ({formatRupiah(p.price * p.quantity)})
                </span>
              </div>
            ))}
          </div>

          {/* Total Payment Recap Highlight */}
          <div className="pt-2 flex justify-between items-baseline border-t border-gray-100">
            <span className="text-xs text-gray-600 font-medium">Total yang harus dibayar:</span>
            <span className="text-base font-extrabold text-shopee-primary">
              {formatRupiah(breakdown.finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Pilihan Metode Pembayaran */}
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <div>
            <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Pilih Metode Pembayaran
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Pilih salah satu saluran pembayaran resmi yang tersedia
            </p>
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex gap-1.5 overflow-x-auto py-2.5 no-scrollbar text-[11px]">
          {[
            { key: 'ALL', label: 'Semua' },
            { key: 'E_WALLET', label: 'E-Wallet' },
            { key: 'BANK_TRANSFER', label: 'Transfer Bank (VA)' },
            { key: 'COD', label: 'COD (Bayar di Tempat)' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key as any)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeCategory === tab.key
                  ? 'bg-shopee-primary text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Payment Methods List */}
        <div className="space-y-2 mt-1">
          {filteredMethods.map((method) => {
            const isSelected = selectedPaymentId === method.id;

            return (
              <div
                key={method.id}
                onClick={() => setSelectedPaymentId(method.id)}
                className={`border rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3 relative ${
                  isSelected
                    ? 'border-shopee-primary bg-shopee-orangeSubtle/50 ring-2 ring-shopee-primary shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Custom radio button */}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-shopee-primary border-shopee-primary text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Method Icon */}
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  {getMethodIcon(method.iconName)}
                </div>

                {/* Method info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-gray-900 text-xs">{method.name}</span>
                    {method.badge && (
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{method.description}</p>
                  {method.balance !== undefined && (
                    <p className="text-[11px] text-shopee-primary font-semibold mt-0.5">
                      Saldo aktif: {formatRupiah(method.balance)}
                    </p>
                  )}
                </div>

                {/* Admin Fee indicator */}
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-[11px] font-semibold ${
                      method.adminFee === 0 ? 'text-emerald-600' : 'text-gray-500'
                    }`}
                  >
                    {method.adminFee === 0 ? 'Biaya Rp0' : `+${formatRupiah(method.adminFee)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security guarantee info */}
      <div className="mx-3 mt-3 p-3 bg-gray-100/70 border border-gray-200 rounded-xl flex items-center gap-2.5 text-xs text-gray-600">
        <Lock className="w-4 h-4 text-shopee-greenSuccess flex-shrink-0" />
        <span className="text-[11px] leading-snug">
          Transaksi dijamin aman 100% oleh <strong>Garansi Shopee</strong>. Dana hanya dilepaskan
          ke penjual setelah kamu menerima barang dengan baik.
        </span>
      </div>

      {/* Floating Bottom Bar: Bayar Sekarang */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-float-bottom px-4 py-2.5 z-20 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-gray-500 font-medium">Total Pembayaran:</div>
          <div className="text-lg font-black text-shopee-primary leading-tight">
            {formatRupiah(breakdown.finalTotal)}
          </div>
          <div className="text-[10px] text-gray-500 truncate max-w-[170px]">
            {activePaymentMethod ? activePaymentMethod.name : 'Belum pilih metode'}
          </div>
        </div>

        <button
          onClick={handlePayClick}
          className="px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-shopee-primary hover:bg-shopee-primaryHover text-white shadow-md shadow-shopee-primary/30 active:scale-95 transition-all"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Bayar Sekarang</span>
        </button>
      </div>

      {/* Final Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-shopee-primary flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-center font-bold text-gray-900 text-base">
              Konfirmasi Pembayaran
            </h3>
            <p className="text-center text-xs text-gray-500 mt-1">
              Pastikan rincian pesanan dan metode pembayaran sudah sesuai sebelum melanjutkan.
            </p>

            <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Metode:</span>
                <span className="font-bold text-gray-900">{activePaymentMethod?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Tagihan:</span>
                <span className="font-black text-shopee-primary text-sm">
                  {formatRupiah(breakdown.finalTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tujuan:</span>
                <span className="font-medium text-gray-800 truncate max-w-[170px]">
                  {activeAddress.recipientName} ({activeAddress.city})
                </span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
              >
                Periksa Lagi
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 py-2.5 bg-shopee-primary hover:bg-shopee-primaryHover text-white rounded-xl text-xs font-bold shadow-md shadow-shopee-primary/25 transition-all active:scale-95"
              >
                Ya, Selesaikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
