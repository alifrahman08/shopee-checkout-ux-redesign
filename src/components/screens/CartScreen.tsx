'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { formatRupiah } from '../../utils/format';
import { Check, Plus, Minus, Trash2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const CartScreen: React.FC = () => {
  const {
    products,
    toggleSelectProduct,
    toggleSelectAll,
    updateQuantity,
    removeProduct,
    selectedProducts,
    breakdown,
    goToNextScreen,
  } = useCheckout();

  const allSelected = products.length > 0 && products.every((p) => p.selected);
  const someSelected = selectedProducts.length > 0;

  return (
    <div className="flex flex-col min-h-full bg-shopee-bgLight flex-1">
      {/* Promo banner header */}
      <div className="bg-amber-50 border-b border-amber-200/60 px-3.5 py-2 flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-shopee-primary animate-pulse" />
          <span>Voucher Gratis Ongkir otomatis siap dipakai!</span>
        </div>
        <span className="font-bold text-shopee-primary text-[11px]">S&K Berlaku</span>
      </div>

      {/* Select All Bar */}
      <div className="bg-white border-b border-gray-100 px-3.5 py-2.5 flex items-center justify-between shadow-xs mt-2">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-800 select-none">
          <div
            onClick={toggleSelectAll}
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              allSelected
                ? 'bg-shopee-primary border-shopee-primary text-white'
                : 'border-gray-300 bg-white hover:border-shopee-primary'
            }`}
          >
            {allSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <span onClick={toggleSelectAll}>
            Pilih Semua ({products.length} Produk)
          </span>
        </label>

        {someSelected && (
          <span className="text-xs text-shopee-primary font-medium">
            {selectedProducts.length} Terpilih
          </span>
        )}
      </div>

      {/* Products list */}
      <div className="p-3 space-y-3">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl border p-3.5 transition-all shadow-xs ${
                product.selected
                  ? 'border-shopee-primary/40 ring-1 ring-shopee-primary/20'
                  : 'border-gray-200'
              }`}
            >
              {/* Shop info */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100 text-xs">
                <div className="flex items-center gap-1.5">
                  {product.isOfficial && (
                    <span className="bg-shopee-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" /> Mall
                    </span>
                  )}
                  <span className="font-bold text-gray-800">{product.shopName}</span>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Hapus dari keranjang"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product item content */}
              <div className="flex gap-3">
                {/* Checkbox */}
                <div className="pt-6">
                  <div
                    onClick={() => toggleSelectProduct(product.id)}
                    className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                      product.selected
                        ? 'bg-shopee-primary border-shopee-primary text-white'
                        : 'border-gray-300 bg-white hover:border-shopee-primary'
                    }`}
                  >
                    {product.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-[9px] font-extrabold px-1 rounded-bl">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 bg-gray-100 inline-block px-1.5 py-0.5 rounded">
                      Variasi: {product.variant}
                    </p>
                  </div>

                  {/* Price and Stepper */}
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-shopee-primary">
                          {formatRupiah(product.price)}
                        </span>
                      </div>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity stepper */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        disabled={product.quantity <= 1}
                        className={`p-1.5 text-gray-600 hover:bg-white active:bg-gray-200 transition-colors ${
                          product.quantity <= 1 ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-800 min-w-[24px] text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        disabled={product.quantity >= product.stock}
                        className="p-1.5 text-gray-600 hover:bg-white active:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h4 className="font-bold text-gray-800 text-sm">Keranjang Belanja Kosong</h4>
            <p className="text-xs text-gray-500 mt-1">Belum ada barang yang dipilih untuk dicheckout</p>
          </div>
        )}
      </div>

      {/* Floating Bottom Checkout Bar */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-float-bottom px-3.5 py-2.5 z-20 flex items-center justify-between mt-auto">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={toggleSelectAll}
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              allSelected
                ? 'bg-shopee-primary border-shopee-primary text-white'
                : 'border-gray-300 bg-white hover:border-shopee-primary'
            }`}
          >
            {allSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <span onClick={toggleSelectAll} className="text-xs font-semibold text-gray-700">
            Semua
          </span>
        </label>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-gray-500">
              Total ({breakdown.selectedItemsTotalQty} barang):
            </div>
            <div className="text-base font-extrabold text-shopee-primary leading-tight">
              {formatRupiah(breakdown.totalProductPrice)}
            </div>
            {breakdown.productSavings > 0 && (
              <div className="text-[10px] text-emerald-600 font-medium">
                Hemat {formatRupiah(breakdown.productSavings)}
              </div>
            )}
          </div>

          <button
            onClick={goToNextScreen}
            disabled={!someSelected}
            className={`px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              someSelected
                ? 'bg-shopee-primary hover:bg-shopee-primaryHover text-white shadow-shopee-primary/25 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
