'use client';

import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { HeaderNav } from './HeaderNav';
import { StepProgressBar } from './StepProgressBar';
import { CalculationExplainerModal } from '../modals/CalculationExplainerModal';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  Wifi,
  BatteryCharging,
  Layers,
  Sparkles,
  Info,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { currentScreen, setCurrentScreen, resetAll, isPhoneFrame, setIsPhoneFrame } = useCheckout();
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [showUxInfo, setShowUxInfo] = useState(false);

  const screenButtons: { key: ScreenType; label: string; num: string }[] = [
    { key: 'cart', label: '1. Keranjang', num: '1' },
    { key: 'checkout', label: '2. Checkout', num: '2' },
    { key: 'breakdown', label: '3. Rincian Biaya (Fokus UX)', num: '3' },
    { key: 'confirmation', label: '4. Konfirmasi', num: '4' },
    { key: 'success', label: '5. Berhasil', num: '5' },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-800 flex flex-col items-center justify-start py-4 sm:py-8 px-2 sm:px-4 font-sans select-none antialiased">
      {/* Top Presentation Toolbar */}
      <header className="w-full max-w-4xl mb-4 bg-neutral-800/90 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-3 sm:p-4 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-shopee-primary to-orange-400 flex items-center justify-center font-black text-white text-lg shadow-md shadow-shopee-primary/40">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                Shopee Checkout UX Redesign
              </h1>
              <span className="text-[10px] bg-shopee-primary/30 border border-shopee-primary/50 text-orange-300 font-bold px-2 py-0.5 rounded-full">
                Worksheet 12
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Prototype Interaktif Rekayasa Interaksi: Transparansi Rincian Pembayaran
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setShowUxInfo(!showUxInfo)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showUxInfo
                ? 'bg-shopee-primary text-white'
                : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Problem & Solusi UX</span>
          </button>

          <button
            onClick={() => setIsPhoneFrame((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-700 hover:bg-neutral-600 text-neutral-200 flex items-center gap-1.5 transition-colors"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mode Full Lebar</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Frame Smartphone</span>
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-700 hover:bg-neutral-600 text-neutral-200 flex items-center gap-1.5 transition-colors"
            title="Reset simulasi data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </header>

      {/* UX Rationale Callout Card */}
      {showUxInfo && (
        <div className="w-full max-w-4xl mb-4 bg-neutral-800 border border-neutral-700 rounded-2xl p-4 text-white text-xs space-y-3 animate-in fade-in duration-200 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-700/60">
              <span className="font-bold text-red-400 flex items-center gap-1.5 text-xs mb-1">
                ⚠️ Masalah UX yang Ditemukan (Pain Point):
              </span>
              <p className="text-neutral-300 leading-relaxed text-[11px]">
                Pengguna seringkali ragu dan berulang kali memeriksa layar karena rincian biaya
                produk, ongkir kurir, voucher toko vs voucher Shopee, dan koin tercampur secara rumit.
                Banyak pengguna merasa bingung dari mana angka total akhir berasal dan apakah diskon
                sudah benar-benar terpotong.
              </p>
            </div>
            <div className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-700/60">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs mb-1">
                ✨ Solusi Redesign pada Prototype Ini:
              </span>
              <p className="text-neutral-300 leading-relaxed text-[11px]">
                Mendedikasikan <strong>Layar 3 (Rincian Pembayaran)</strong> sebagai pusat kendali
                transparansi: kartu total akhir berbobot visual tinggi, breakdown per-komponen warna-warni,
                pilihan voucher real-time yang langsung menghitung ulang harga, serta tombol rumus transparan
                yang mendidik pengguna.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Screen Navigation Pills (For Lecturer / Evaluator) */}
      <div className="w-full max-w-4xl mb-4 flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-neutral-400 font-medium mr-1 hidden sm:inline">
          Lompat Cepat Layar:
        </span>
        {screenButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setCurrentScreen(btn.key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === btn.key
                ? 'bg-shopee-primary text-white shadow-md shadow-shopee-primary/30 scale-105'
                : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 border border-neutral-700/60'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Main Prototype Frame */}
      <div
        id="phone-device-frame"
        className={`w-full transition-all duration-300 [transform:translateZ(0)] ${
          isPhoneFrame
            ? 'max-w-[395px] h-[812px] rounded-[50px] p-3 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-neutral-700 ring-1 ring-neutral-600 flex flex-col relative overflow-hidden'
            : 'max-w-md rounded-2xl bg-white shadow-xl'
        }`}
      >
        <div
          className={`bg-white text-gray-900 overflow-hidden relative flex flex-col h-full ${
            isPhoneFrame
              ? 'rounded-[40px] flex-1 flex flex-col overflow-hidden'
              : 'min-h-[750px]'
          }`}
        >
          {/* Smartphone Status Bar (Only in phone frame mode) */}
          {isPhoneFrame && (
            <div className="shrink-0 bg-white/95 backdrop-blur-md px-6 pt-3 pb-1.5 flex items-center justify-between text-xs text-gray-900 border-b border-gray-50 z-30">
              <span className="font-bold text-[13px] tracking-tight">18:05</span>

              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto" />

              <div className="flex items-center gap-1.5 text-gray-800">
                <span className="text-[10px] font-bold">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <BatteryCharging className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          )}

          {/* Navigation Header */}
          <div className="shrink-0">
            <HeaderNav onOpenExplainer={() => setIsExplainerOpen(true)} />
          </div>

          {/* 5-Step Visual Progress Bar */}
          <div className="shrink-0">
            <StepProgressBar />
          </div>

          {/* Active Screen Content (Scrollable inside phone) */}
          <main className="flex-1 overflow-y-auto relative scrollbar-thin flex flex-col">
            {children}
          </main>

          {/* Home indicator bar (Phone frame mode) */}
          {isPhoneFrame && (
            <div className="shrink-0 py-1.5 bg-white border-t border-gray-100 flex justify-center z-30">
              <div className="w-32 h-1 bg-gray-400 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-6 text-center text-xs text-neutral-500">
        <p>Shopee Checkout UX Redesign • Dibuat untuk Tugas Rekayasa Interaksi (Worksheet 12)</p>
        <p className="text-[11px] text-neutral-600 mt-1">
          Next.js App Router • React • TypeScript • Tailwind CSS • Lucide Icons
        </p>
      </footer>

      {/* Modal Transparansi */}
      <CalculationExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  );
};
