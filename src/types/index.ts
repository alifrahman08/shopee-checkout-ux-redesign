export type ScreenType = 'cart' | 'checkout' | 'breakdown' | 'confirmation' | 'success';

export interface ProductItem {
  id: string;
  name: string;
  variant: string;
  originalPrice: number;
  price: number;
  discountPercent: number;
  image: string;
  shopName: string;
  isOfficial?: boolean;
  selected: boolean;
  quantity: number;
  stock: number;
  weightGrams: number;
}

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  tag: 'Rumah' | 'Kantor' | 'Kost';
  addressLine: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  courier: string;
  price: number;
  originalPrice: number;
  estimatedDelivery: string;
  badge?: string;
  description: string;
}

export type VoucherType = 'FREE_SHIPPING' | 'DISCOUNT_PERCENT' | 'DISCOUNT_FIXED' | 'CASHBACK';

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  minSpend: number;
  type: VoucherType;
  discountValue: number; // percentage (e.g. 15 for 15%) or fixed rupiah amount
  maxDiscount?: number;
  appliedCategory: 'shipping' | 'product';
  expiryDate: string;
  badgeText: string;
}

export type PaymentCategory = 'BANK_TRANSFER' | 'E_WALLET' | 'COD' | 'CREDIT_CARD';

export interface PaymentMethodOption {
  id: string;
  name: string;
  category: PaymentCategory;
  categoryLabel: string;
  accountNumber?: string;
  iconName: string;
  adminFee: number;
  balance?: number;
  description: string;
  badge?: string;
  isAvailable: boolean;
}

export interface PriceBreakdown {
  selectedItemsCount: number;
  selectedItemsTotalQty: number;
  totalOriginalProductPrice: number;
  totalProductPrice: number;
  productSavings: number;
  
  shippingFee: number;
  shippingDiscount: number;
  actualShippingFee: number;
  
  voucherDiscount: number;
  shopeeCoinsDeduction: number;
  serviceFee: number;
  paymentHandlingFee: number;
  
  finalTotal: number;
  grandTotalSavings: number;
}
