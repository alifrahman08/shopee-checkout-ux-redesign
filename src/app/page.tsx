'use client';

import React from 'react';
import { CheckoutProvider, useCheckout } from '../context/CheckoutContext';
import { MobileFrame } from '../components/layout/MobileFrame';
import { CartScreen } from '../components/screens/CartScreen';
import { CheckoutScreen } from '../components/screens/CheckoutScreen';
import { PaymentBreakdownScreen } from '../components/screens/PaymentBreakdownScreen';
import { ConfirmationScreen } from '../components/screens/ConfirmationScreen';
import { SuccessScreen } from '../components/screens/SuccessScreen';

function ActiveScreenRenderer() {
  const { currentScreen } = useCheckout();

  switch (currentScreen) {
    case 'cart':
      return <CartScreen />;
    case 'checkout':
      return <CheckoutScreen />;
    case 'breakdown':
      return <PaymentBreakdownScreen />;
    case 'confirmation':
      return <ConfirmationScreen />;
    case 'success':
      return <SuccessScreen />;
    default:
      return <CartScreen />;
  }
}

export default function Home() {
  return (
    <CheckoutProvider>
      <MobileFrame>
        <ActiveScreenRenderer />
      </MobileFrame>
    </CheckoutProvider>
  );
}
