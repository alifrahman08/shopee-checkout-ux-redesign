'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { ChevronLeft, MessageCircleQuestion, RotateCcw } from 'lucide-react';
import { ScreenType } from '../../types';

interface HeaderNavProps {
  onOpenExplainer?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenExplainer }) => {
  const { currentScreen, goToPrevScreen, resetAll } = useCheckout();

  const getTitle = (screen: ScreenType): string => {
    switch (screen) {
      case 'cart':
        return 'Keranjang Saya';
      case 'checkout':
        return 'Informasi Checkout';
      case 'breakdown':
        return 'Rincian Pembayaran';
      case 'confirmation':
        return 'Konfirmasi Pembayaran';
      case 'success':
        return 'Pesanan Berhasil';
      default:
        return 'Shopee Checkout';
    }
  };

  const isCart = currentScreen === 'cart';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-3.5 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <button
          onClick={goToPrevScreen}
          disabled={isCart}
          aria-label="Kembali"
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
            isCart
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }`}
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="font-bold text-gray-900 text-base tracking-tight">
          {getTitle(currentScreen)}
        </h1>
      </div>

      <div className="flex items-center gap-1.5">
        {currentScreen === 'breakdown' && onOpenExplainer && (
          <button
            onClick={onOpenExplainer}
            className="flex items-center gap-1 text-[11px] font-semibold text-shopee-primary bg-shopee-orangeSubtle px-2 py-1 rounded-full hover:bg-orange-100 transition-colors"
            title="Penjelasan Rincian"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Info Biaya</span>
          </button>
        )}

        <button
          onClick={resetAll}
          title="Reset simulasi ke awal"
          className="p-1.5 text-gray-400 hover:text-shopee-primary hover:bg-gray-100 rounded-full transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
