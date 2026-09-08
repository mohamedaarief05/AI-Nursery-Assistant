'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant } from '@/lib/types';
import { useToast } from './ToastContext';

export interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (plant: Plant, quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ai_nursery_cart';
const FREE_DELIVERY_THRESHOLD = 500;
const STANDARD_DELIVERY_FEE = 49;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { success, error } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, isLoaded]);

  const addItem = (plant: Plant, quantity = 1) => {
    if (plant.availability === 'Out of Stock') {
      error(`Sorry, ${plant.name} is currently out of stock.`);
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        // Prevent excessive quantities
        const newQty = existing.quantity + quantity;
        if (newQty > 10) {
          error(`Maximum 10 units of ${plant.name} per order.`);
          return prev;
        }
        success(`Updated ${plant.name} quantity to ${newQty}`);
        return prev.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: newQty } : item
        );
      }
      success(`Added ${plant.name} to cart`);
      return [...prev, { plant, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (plantId: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.plant.id === plantId);
      if (removed) {
        success(`Removed ${removed.plant.name} from cart`);
      }
      return prev.filter((item) => item.plant.id !== plantId);
    });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(plantId);
      return;
    }
    if (quantity > 10) {
      error('Maximum 10 units per plant permitted.');
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const totalPrice = subtotal + deliveryFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
