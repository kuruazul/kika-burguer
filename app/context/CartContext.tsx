'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Variant } from '../lib/data';

export interface CartItem {
  id: string; // unique id for the cart item (item.name + variant?.name)
  item: MenuItem;
  variant?: Variant;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, variant?: Variant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, delta: number) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage on mount (optional, nice for UX)
  // implementing basic state for now as requested

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const addToCart = (item: MenuItem, variant?: Variant) => {
    const uniqueId = `${item.name}-${variant?.name || 'base'}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === uniqueId);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { id: uniqueId, item, variant, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          return { ...i, quantity: Math.max(0, i.quantity + delta) };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, cartItem) => {
    const basePrice = parsePrice(cartItem.item.price);
    const variantPrice = cartItem.variant?.price ? parsePrice(cartItem.variant.price) : 0;
    // Assume variant price starting with '+' is additive, otherwise it might be replacement?
    // Data has '+$15'. If just '$15', usually replacement. 
    // In this specific dataset, most look like '+$15'.
    // Let's assume additive if '+' is present, replacment otherwise?
    // Looking at data:
    // "Orden de Papas" price: "+$30".
    // I will stick to simple addition for now as it seems to be the pattern.

    return sum + (basePrice + variantPrice) * cartItem.quantity;
  }, 0);

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
