'use client';

import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { Voucher } from '../../types';
import { formatRupiah } from '../../utils/format';
import { X, Check, Ticket, Truck, Sparkles, AlertCircle } from 'lucide-react';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ isOpen, onClose }) => {
  const {
    availableVouchers,
    appliedShippingVoucher,
    appliedProductVoucher,
    applyVoucher,
    removeVoucher,
    breakdown,
  } = useCheckout();

  const [tempShippingId, setTempShippingId] = useState<string | null>(
    appliedShippingVoucher?.id || null
  );
  const [tempProductId, setTempProductId] = useState<string | null>(
    appliedProductVoucher?.id || null
  );

  if (!isOpen) return null;

  const shippingVouchers = availableVouchers.filter((v) => v.appliedCategory === 'shipping');
  const productVouchers = availableVouchers.filter((v) => v.appliedCategory === 'product');

  const handleSave = () => {
    // Apply shipping voucher
    if (tempShippingId) {
      const v = shippingVouchers.find((item) => item.id === tempShippingId);
      if (v) applyVoucher(v);
    } else if (appliedShippingVoucher) {
      removeVoucher(appliedShippingVoucher.id);
    }

    // Apply product voucher
    if (tempProductId) {
      const v = productVouchers.find((item) => item.id === tempProductId);
      if (v) applyVoucher(v);
    } else if (appliedProductVoucher) {
      removeVoucher(appliedProductVoucher.id);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-shopee-orangeSubtle flex items-center justify-center text-shopee-primary">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Pilih Voucher Shopee</h3>
              <p className="text-xs text-gray-500">Hemat lebih banyak dengan voucher aktif</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-5 text-sm">
          {/* Section: Voucher Gratis Ongkir */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Truck className="w-4 h-4 text-shopee-greenSuccess" />
              <h4 className="font-semibold text-gray-800 text-sm">Voucher Gratis Ongkir</h4>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium ml-auto">
                Maks. 1 voucher
              </span>
            </div>

            <div className="space-y-2.5">
              {shippingVouchers.map((v) => {
                const isSelected = tempShippingId === v.id;
                const isEligible = breakdown.totalProductPrice >= v.minSpend;

                return (
                  <div
                    key={v.id}
                    onClick={() => {
                      if (!isEligible) return;
                      setTempShippingId(isSelected ? null : v.id);
                    }}
                    className={`relative border rounded-xl p-3 cursor-pointer transition-all flex gap-3 ${
                      !isEligible
                        ? 'opacity-60 bg-gray-50 border-gray-200 cursor-not-allowed'
                        : isSelected
                        ? 'border-shopee-primary bg-shopee-orangeSubtle/40 shadow-sm'
                        : 'border-gray-200 hover:border-shopee-primary/50 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-emerald-100/70 border border-emerald-200 flex flex-col items-center justify-center text-emerald-700 flex-shrink-0">
                      <Truck className="w-5 h-5" />
                      <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">GRATIS</span>
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                          {v.badgeText}
                        </span>
                        <span className="text-xs text-gray-500">{v.expiryDate}</span>
                      </div>
                      <p className="font-bold text-gray-800 text-xs mt-1 leading-snug">{v.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{v.description}</p>
                      {!isEligible && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Min. belanja {formatRupiah(v.minSpend)}
                        </p>
                      )}
                    </div>

                    <div className="absolute right-3 top-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-shopee-primary border-shopee-primary text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Voucher Diskon & Cashback */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4 text-shopee-primary" />
              <h4 className="font-semibold text-gray-800 text-sm">Voucher Diskon & Cashback</h4>
              <span className="text-xs bg-orange-50 text-shopee-primary px-2 py-0.5 rounded font-medium ml-auto">
                Maks. 1 voucher
              </span>
            </div>

            <div className="space-y-2.5">
              {productVouchers.map((v) => {
                const isSelected = tempProductId === v.id;
                const isEligible = breakdown.totalProductPrice >= v.minSpend;

                return (
                  <div
                    key={v.id}
                    onClick={() => {
                      if (!isEligible) return;
                      setTempProductId(isSelected ? null : v.id);
                    }}
                    className={`relative border rounded-xl p-3 cursor-pointer transition-all flex gap-3 ${
                      !isEligible
                        ? 'opacity-60 bg-gray-50 border-gray-200 cursor-not-allowed'
                        : isSelected
                        ? 'border-shopee-primary bg-shopee-orangeSubtle/40 shadow-sm'
                        : 'border-gray-200 hover:border-shopee-primary/50 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-100/70 border border-orange-200 flex flex-col items-center justify-center text-shopee-primary flex-shrink-0">
                      <Ticket className="w-5 h-5" />
                      <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">DISKON</span>
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-shopee-primary text-white px-1.5 py-0.5 rounded">
                          {v.badgeText}
                        </span>
                        <span className="text-xs text-gray-500">{v.expiryDate}</span>
                      </div>
                      <p className="font-bold text-gray-800 text-xs mt-1 leading-snug">{v.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{v.description}</p>
                      {!isEligible && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Belanja belum capai {formatRupiah(v.minSpend)}
                        </p>
                      )}
                    </div>

                    <div className="absolute right-3 top-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-shopee-primary border-shopee-primary text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setTempShippingId(null);
              setTempProductId(null);
            }}
            className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg bg-white"
          >
            Hapus Semua
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 bg-shopee-primary hover:bg-shopee-primaryHover text-white font-bold rounded-lg text-sm shadow-md shadow-shopee-primary/20 transition-all active:scale-[0.98]"
          >
            Gunakan Voucher
          </button>
        </div>
      </div>
    </div>
  );
};
