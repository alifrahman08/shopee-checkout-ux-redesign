'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import { X, Check, Truck, Clock, Sparkles } from 'lucide-react';

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShippingModal: React.FC<ShippingModalProps> = ({ isOpen, onClose }) => {
  const { shippingOptions, selectedShippingId, setSelectedShippingId } = useCheckout();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-shopee-primary">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Pilih Opsi Pengiriman</h3>
              <p className="text-xs text-gray-500">Sesuaikan dengan kebutuhan dan estimasi waktu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {shippingOptions.map((option) => {
            const isSelected = selectedShippingId === option.id;

            return (
              <div
                key={option.id}
                onClick={() => {
                  setSelectedShippingId(option.id);
                  onClose();
                }}
                className={`border rounded-xl p-3.5 cursor-pointer transition-all flex items-start gap-3 relative ${
                  isSelected
                    ? 'border-shopee-primary bg-shopee-orangeSubtle/50 ring-1 ring-shopee-primary'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? 'bg-shopee-primary border-shopee-primary text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0 pr-16">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{option.name}</span>
                    {option.badge && (
                      <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> {option.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{option.estimatedDelivery}</span>
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1">{option.description}</p>
                </div>

                <div className="absolute right-3.5 top-3.5 text-right">
                  <p className="font-bold text-shopee-primary text-sm">
                    {formatRupiah(option.price)}
                  </p>
                  {option.originalPrice > option.price && (
                    <p className="text-[11px] text-gray-400 line-through">
                      {formatRupiah(option.originalPrice)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
