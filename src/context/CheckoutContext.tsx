'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  ScreenType,
  ProductItem,
  Address,
  ShippingOption,
  Voucher,
  PaymentMethodOption,
  PriceBreakdown,
} from '../types';
import {
  INITIAL_PRODUCTS,
  MOCK_ADDRESSES,
  MOCK_SHIPPING_OPTIONS,
  MOCK_VOUCHERS,
  MOCK_PAYMENT_METHODS,
} from '../data/mockData';
import { generateOrderId, getCurrentFormattedDateTime } from '../utils/format';

export interface OrderResult {
  orderId: string;
  orderDate: string;
  items: ProductItem[];
  shipping: ShippingOption;
  address: Address;
  paymentMethod: PaymentMethodOption;
  breakdown: PriceBreakdown;
  sellerNote: string;
}

interface CheckoutContextType {
  // Navigation
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  goToNextScreen: () => void;
  goToPrevScreen: () => void;
  
  // Cart
  products: ProductItem[];
  toggleSelectProduct: (id: string) => void;
  toggleSelectAll: () => void;
  updateQuantity: (id: string, delta: number) => void;
  removeProduct: (id: string) => void;
  selectedProducts: ProductItem[];
  
  // Address
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  activeAddress: Address;
  
  // Shipping
  shippingOptions: ShippingOption[];
  selectedShippingId: string;
  setSelectedShippingId: (id: string) => void;
  activeShipping: ShippingOption;
  
  // Vouchers
  availableVouchers: Voucher[];
  appliedShippingVoucher: Voucher | null;
  appliedProductVoucher: Voucher | null;
  applyVoucher: (voucher: Voucher) => void;
  removeVoucher: (voucherId: string) => void;
  
  // Coins
  coinsBalance: number;
  useCoins: boolean;
  setUseCoins: (val: boolean) => void;
  
  // Notes
  sellerNote: string;
  setSellerNote: (note: string) => void;
  
  // Payment
  paymentMethods: PaymentMethodOption[];
  selectedPaymentId: string | null;
  setSelectedPaymentId: (id: string | null) => void;
  activePaymentMethod: PaymentMethodOption | null;
  paymentValidationError: string | null;
  setPaymentValidationError: (err: string | null) => void;
  
  // Calculations
  breakdown: PriceBreakdown;
  
  // Order Result
  orderResult: OrderResult | null;
  completePayment: () => boolean;
  resetAll: () => void;

  // View frame toggle
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('cart');
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [addresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');
  const [shippingOptions] = useState<ShippingOption[]>(MOCK_SHIPPING_OPTIONS);
  const [selectedShippingId, setSelectedShippingId] = useState<string>('ship-reguler');
  
  // Vouchers
  const [availableVouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  const [appliedShippingVoucher, setAppliedShippingVoucher] = useState<Voucher | null>(
    MOCK_VOUCHERS.find((v) => v.id === 'vouch-ongkir-1') || null
  );
  const [appliedProductVoucher, setAppliedProductVoucher] = useState<Voucher | null>(
    MOCK_VOUCHERS.find((v) => v.id === 'vouch-disc-1') || null
  );

  // Coins
  const [coinsBalance] = useState<number>(15000);
  const [useCoins, setUseCoins] = useState<boolean>(true);

  // Notes
  const [sellerNote, setSellerNote] = useState<string>('Tolong bubble wrap tebal ya min, terima kasih!');

  // Payment
  const [paymentMethods] = useState<PaymentMethodOption[]>(MOCK_PAYMENT_METHODS);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>('pay-shopeepay');
  const [paymentValidationError, setPaymentValidationError] = useState<string | null>(null);

  // Completed Order
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  // View Mode
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Cart operations
  const toggleSelectProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAll = () => {
    const allSelected = products.every((item) => item.selected);
    setProducts((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const updateQuantity = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, Math.min(item.stock, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedProducts = useMemo(
    () => products.filter((item) => item.selected),
    [products]
  );

  // Active records
  const activeAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || addresses[0],
    [addresses, selectedAddressId]
  );

  const activeShipping = useMemo(
    () => shippingOptions.find((s) => s.id === selectedShippingId) || shippingOptions[0],
    [shippingOptions, selectedShippingId]
  );

  const activePaymentMethod = useMemo(
    () => paymentMethods.find((p) => p.id === selectedPaymentId) || null,
    [paymentMethods, selectedPaymentId]
  );

  // Apply or replace vouchers
  const applyVoucher = (voucher: Voucher) => {
    if (voucher.appliedCategory === 'shipping') {
      setAppliedShippingVoucher(voucher);
    } else {
      setAppliedProductVoucher(voucher);
    }
  };

  const removeVoucher = (voucherId: string) => {
    if (appliedShippingVoucher?.id === voucherId) {
      setAppliedShippingVoucher(null);
    }
    if (appliedProductVoucher?.id === voucherId) {
      setAppliedProductVoucher(null);
    }
  };

  // Comprehensive Price Calculation
  const breakdown: PriceBreakdown = useMemo(() => {
    const selectedItemsCount = selectedProducts.length;
    const selectedItemsTotalQty = selectedProducts.reduce((acc, p) => acc + p.quantity, 0);

    const totalOriginalProductPrice = selectedProducts.reduce(
      (acc, p) => acc + p.originalPrice * p.quantity,
      0
    );

    const totalProductPrice = selectedProducts.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    const productSavings = Math.max(0, totalOriginalProductPrice - totalProductPrice);

    // Shipping calculations
    const shippingFee = selectedItemsCount > 0 ? activeShipping.price : 0;
    let shippingDiscount = 0;
    if (appliedShippingVoucher && selectedItemsCount > 0) {
      if (totalProductPrice >= appliedShippingVoucher.minSpend) {
        shippingDiscount = Math.min(shippingFee, appliedShippingVoucher.discountValue);
      }
    }
    const actualShippingFee = Math.max(0, shippingFee - shippingDiscount);

    // Voucher discount calculations
    let voucherDiscount = 0;
    if (appliedProductVoucher && selectedItemsCount > 0) {
      if (totalProductPrice >= appliedProductVoucher.minSpend) {
        if (appliedProductVoucher.type === 'DISCOUNT_PERCENT') {
          const calculated = Math.round((totalProductPrice * appliedProductVoucher.discountValue) / 100);
          voucherDiscount = appliedProductVoucher.maxDiscount
            ? Math.min(calculated, appliedProductVoucher.maxDiscount)
            : calculated;
        } else if (appliedProductVoucher.type === 'DISCOUNT_FIXED') {
          voucherDiscount = Math.min(totalProductPrice, appliedProductVoucher.discountValue);
        } else if (appliedProductVoucher.type === 'CASHBACK') {
          // For cashback vouchers, it gives coins back instead of immediate price cut,
          // but for transparent UI we note it or apply as special discount
          voucherDiscount = 0; // cashback credited to coins later
        }
      }
    }

    // Shopee Coins deduction
    let shopeeCoinsDeduction = 0;
    if (useCoins && selectedItemsCount > 0) {
      // Shopee limits coins to 25% of subtotal or maximum coin balance
      const maxCoinsAllowed = Math.round(totalProductPrice * 0.25);
      shopeeCoinsDeduction = Math.min(coinsBalance, maxCoinsAllowed, totalProductPrice - voucherDiscount);
      if (shopeeCoinsDeduction < 0) shopeeCoinsDeduction = 0;
    }

    // Fees
    const serviceFee = selectedItemsCount > 0 ? 1000 : 0; // standard platform fee
    const paymentHandlingFee = activePaymentMethod ? activePaymentMethod.adminFee : 0;

    // Final total calculation
    const finalTotal = Math.max(
      0,
      totalProductPrice +
        actualShippingFee -
        voucherDiscount -
        shopeeCoinsDeduction +
        serviceFee +
        paymentHandlingFee
    );

    const grandTotalSavings =
      productSavings + shippingDiscount + voucherDiscount + shopeeCoinsDeduction;

    return {
      selectedItemsCount,
      selectedItemsTotalQty,
      totalOriginalProductPrice,
      totalProductPrice,
      productSavings,
      shippingFee,
      shippingDiscount,
      actualShippingFee,
      voucherDiscount,
      shopeeCoinsDeduction,
      serviceFee,
      paymentHandlingFee,
      finalTotal,
      grandTotalSavings,
    };
  }, [
    selectedProducts,
    activeShipping,
    appliedShippingVoucher,
    appliedProductVoucher,
    useCoins,
    coinsBalance,
    activePaymentMethod,
  ]);

  // Screen Flow Management
  const goToNextScreen = () => {
    if (currentScreen === 'cart') {
      if (selectedProducts.length === 0) return;
      setCurrentScreen('checkout');
    } else if (currentScreen === 'checkout') {
      setCurrentScreen('breakdown');
    } else if (currentScreen === 'breakdown') {
      setCurrentScreen('confirmation');
    } else if (currentScreen === 'confirmation') {
      completePayment();
    }
  };

  const goToPrevScreen = () => {
    if (currentScreen === 'checkout') {
      setCurrentScreen('cart');
    } else if (currentScreen === 'breakdown') {
      setCurrentScreen('checkout');
    } else if (currentScreen === 'confirmation') {
      setCurrentScreen('breakdown');
    } else if (currentScreen === 'success') {
      setCurrentScreen('cart');
    }
  };

  // Complete Payment Action
  const completePayment = (): boolean => {
    if (!selectedPaymentId || !activePaymentMethod) {
      setPaymentValidationError('Harap pilih salah satu metode pembayaran terlebih dahulu.');
      return false;
    }

    setPaymentValidationError(null);

    const newOrder: OrderResult = {
      orderId: generateOrderId(),
      orderDate: getCurrentFormattedDateTime(),
      items: [...selectedProducts],
      shipping: activeShipping,
      address: activeAddress,
      paymentMethod: activePaymentMethod,
      breakdown: { ...breakdown },
      sellerNote: sellerNote,
    };

    setOrderResult(newOrder);
    setCurrentScreen('success');
    return true;
  };

  const resetAll = () => {
    setProducts(INITIAL_PRODUCTS);
    setSelectedAddressId('addr-1');
    setSelectedShippingId('ship-reguler');
    setAppliedShippingVoucher(MOCK_VOUCHERS[0]);
    setAppliedProductVoucher(MOCK_VOUCHERS[2]);
    setUseCoins(true);
    setSelectedPaymentId('pay-shopeepay');
    setPaymentValidationError(null);
    setOrderResult(null);
    setCurrentScreen('cart');
  };

  // Clear payment validation error whenever a payment method is selected
  useEffect(() => {
    if (selectedPaymentId) {
      setPaymentValidationError(null);
    }
  }, [selectedPaymentId]);

  return (
    <CheckoutContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        goToNextScreen,
        goToPrevScreen,
        products,
        toggleSelectProduct,
        toggleSelectAll,
        updateQuantity,
        removeProduct,
        selectedProducts,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        activeAddress,
        shippingOptions,
        selectedShippingId,
        setSelectedShippingId,
        activeShipping,
        availableVouchers,
        appliedShippingVoucher,
        appliedProductVoucher,
        applyVoucher,
        removeVoucher,
        coinsBalance,
        useCoins,
        setUseCoins,
        sellerNote,
        setSellerNote,
        paymentMethods,
        selectedPaymentId,
        setSelectedPaymentId,
        activePaymentMethod,
        paymentValidationError,
        setPaymentValidationError,
        breakdown,
        orderResult,
        completePayment,
        resetAll,
        isPhoneFrame,
        setIsPhoneFrame,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
