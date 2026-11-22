'use client';

import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import {
  MapPin,
  Truck,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import { AddressModal } from '../modals/AddressModal';
import { ShippingModal } from '../modals/ShippingModal';

export const CheckoutScreen: React.FC = () => {
  const {
    selectedProducts,
    activeAddress,
    activeShipping,
    breakdown,
    goToNextScreen,
    sellerNote,
    setSellerNote,
  } = useCheckout();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-shopee-bgLight pb-28">
      {/* 1. Alamat Pengiriman Section */}
      <div className="bg-white border-b border-gray-100 p-3.5 mb-2.5 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <MapPin className="w-4 h-4 text-shopee-primary" />
            <span>Alamat Pengiriman</span>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="text-xs font-semibold text-shopee-primary hover:text-shopee-primaryHover flex items-center gap-0.5"
          >
            <span>Ubah</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={() => setIsAddressModalOpen(true)}
          className="pt-2.5 cursor-pointer hover:bg-gray-50/50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-xs">{activeAddress.recipientName}</span>
            <span className="text-xs text-gray-500">{activeAddress.phone}</span>
            <span className="text-[10px] bg-red-50 text-shopee-primary font-bold px-1.5 py-0.5 rounded border border-red-100">
              {activeAddress.tag}
            </span>
            {activeAddress.isPrimary && (
              <span className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-1.5 py-0.5 rounded">
                Utama
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
            {activeAddress.addressLine}, {activeAddress.district}, {activeAddress.city},{' '}
            {activeAddress.province} {activeAddress.postalCode}
          </p>
        </div>
      </div>

      {/* 2. Informasi Produk yang dicheckout */}
      <div className="bg-white border-b border-gray-100 p-3.5 mb-2.5 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-gray-100 text-xs font-bold text-gray-900">
          <ShieldCheck className="w-4 h-4 text-shopee-primary" />
          <span>Pesanan Produk ({selectedProducts.length} Toko Terpilih)</span>
        </div>

        <div className="divide-y divide-gray-100">
          {selectedProducts.map((product) => (
            <div key={product.id} className="py-3 flex gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-gray-500 font-medium">{product.shopName}</div>
                <h4 className="text-xs font-semibold text-gray-900 line-clamp-1 mt-0.5">
                  {product.name}
                </h4>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Variasi: {product.variant}
                </div>

                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-gray-900">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    x{product.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pesan untuk penjual */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={sellerNote}
            onChange={(e) => setSellerNote(e.target.value)}
            placeholder="Pesan untuk penjual (opsional)..."
            className="flex-1 text-xs text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-shopee-primary focus:border-shopee-primary"
          />
        </div>
      </div>

      {/* 3. Pilihan Jasa Pengiriman */}
      <div className="bg-white border-b border-gray-100 p-3.5 mb-2.5 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <Truck className="w-4 h-4 text-shopee-primary" />
            <span>Pilihan Jasa Pengiriman</span>
          </div>
          <button
            onClick={() => setIsShippingModalOpen(true)}
            className="text-xs font-semibold text-shopee-primary hover:text-shopee-primaryHover flex items-center gap-0.5"
          >
            <span>Ubah Jasa Kirim</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={() => setIsShippingModalOpen(true)}
          className="pt-2.5 cursor-pointer hover:bg-gray-50/50 rounded-lg transition-colors flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900">{activeShipping.name}</span>
              {activeShipping.badge && (
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  {activeShipping.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>{activeShipping.estimatedDelivery}</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{activeShipping.courier}</div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-shopee-primary">
              {formatRupiah(activeShipping.price)}
            </div>
            {breakdown.shippingDiscount > 0 && (
              <div className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded mt-0.5">
                Hemat {formatRupiah(breakdown.shippingDiscount)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini info notice */}
      <div className="mx-3 p-3 bg-blue-50 border border-blue-200/60 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 leading-snug">
          Langkah berikutnya: <strong>Rincian Pembayaran</strong>. Kamu dapat meninjau kalkulasi
          lengkap ongkir, voucher, dan potongan diskon sebelum konfirmasi.
        </p>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-float-bottom px-3.5 py-2.5 z-20 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-gray-500">Estimasi Sementara:</div>
          <div className="text-base font-extrabold text-shopee-primary leading-tight">
            {formatRupiah(breakdown.totalProductPrice + breakdown.actualShippingFee)}
          </div>
          <div className="text-[10px] text-gray-400">Belum termasuk voucher tambahan</div>
        </div>

        <button
          onClick={goToNextScreen}
          className="px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-1.5 bg-shopee-primary hover:bg-shopee-primaryHover text-white shadow-md shadow-shopee-primary/25 active:scale-95 transition-all"
        >
          <span>Lanjutkan ke Rincian</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modals */}
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
      <ShippingModal isOpen={isShippingModalOpen} onClose={() => setIsShippingModalOpen(false)} />
    </div>
  );
};
