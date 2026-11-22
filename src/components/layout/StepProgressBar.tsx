'use client';

import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { ScreenType } from '../../types';
import { Check } from 'lucide-react';

const STEPS: { key: ScreenType; label: string; number: number }[] = [
  { key: 'cart', label: 'Keranjang', number: 1 },
  { key: 'checkout', label: 'Checkout', number: 2 },
  { key: 'breakdown', label: 'Rincian', number: 3 },
  { key: 'confirmation', label: 'Konfirmasi', number: 4 },
  { key: 'success', label: 'Selesai', number: 5 },
];

export const StepProgressBar: React.FC = () => {
  const { currentScreen, setCurrentScreen, selectedProducts } = useCheckout();

  const getStepIndex = (screen: ScreenType): number => {
    return STEPS.findIndex((s) => s.key === screen);
  };

  const currentIndex = getStepIndex(currentScreen);

  const canNavigateTo = (targetScreen: ScreenType): boolean => {
    const targetIdx = getStepIndex(targetScreen);
    // Can always navigate backwards
    if (targetIdx <= currentIndex) return true;
    // Cannot jump forward if no products selected
    if (selectedProducts.length === 0) return false;
    // Can jump up to current + 1
    return targetIdx <= currentIndex + 1;
  };

  return (
    <div className="bg-white border-b border-gray-100 px-3 py-2.5">
      <div className="flex items-center justify-between relative max-w-sm mx-auto">
        {/* Background connector line */}
        <div className="absolute top-3 left-4 right-4 h-[2px] bg-gray-200 -z-0" />
        
        {/* Active connector fill */}
        <div
          className="absolute top-3 left-4 h-[2px] bg-shopee-primary transition-all duration-300 -z-0"
          style={{
            width: `${(currentIndex / (STEPS.length - 1)) * 92}%`,
          }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          const isAllowed = canNavigateTo(step.key);

          return (
            <button
              key={step.key}
              onClick={() => {
                if (isAllowed) {
                  setCurrentScreen(step.key);
                }
              }}
              disabled={!isAllowed}
              className={`relative z-10 flex flex-col items-center group transition-transform ${
                isAllowed ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-shopee-primary text-white ring-2 ring-white shadow-xs'
                    : isActive
                    ? 'bg-shopee-primary text-white ring-4 ring-shopee-orangeSubtle ring-offset-1 font-extrabold shadow-sm scale-110'
                    : 'bg-white border border-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
              </div>

              <span
                className={`text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-shopee-primary font-bold'
                    : isCompleted
                    ? 'text-gray-700'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
