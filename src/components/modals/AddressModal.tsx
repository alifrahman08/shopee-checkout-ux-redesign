'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { X, Check, MapPin, Plus } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose }) => {
  const { addresses, selectedAddressId, setSelectedAddressId } = useCheckout();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-shopee-primary">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Alamat Pengiriman</h3>
              <p className="text-xs text-gray-500">Pilih alamat tujuan pesanan kamu</p>
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
          {addresses.map((addr) => {
            const isSelected = selectedAddressId === addr.id;

            return (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddressId(addr.id);
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

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{addr.recipientName}</span>
                    <span className="text-xs text-gray-500 font-medium">({addr.phone})</span>
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {addr.tag}
                    </span>
                    {addr.isPrimary && (
                      <span className="text-[10px] font-semibold bg-red-100 text-shopee-primary px-2 py-0.5 rounded">
                        Utama
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">
                    {addr.addressLine}, {addr.district}, {addr.city}, {addr.province} {addr.postalCode}
                  </p>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-shopee-primary hover:border-shopee-primary transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Tambah Alamat Baru
          </button>
        </div>
      </div>
    </div>
  );
};
