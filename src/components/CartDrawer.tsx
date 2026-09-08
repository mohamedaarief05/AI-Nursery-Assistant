'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, subtotal, deliveryFee, totalPrice } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background body scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-700 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Your Plant Cart</h2>
                <p className="text-xs text-slate-500">
                  {items.length === 0 ? '0 items' : `${items.reduce((s, i) => s + i.quantity, 0)} plants selected`}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mb-4">
                  🪴
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs">
                  Looks like you haven't added any green companions to your cart yet.
                </p>
                <Link
                  href="/plants"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
                >
                  Explore Plants
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.plant.id}
                  className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group"
                >
                  <div className="w-20 h-20 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                    {item.plant.image_url ? (
                      <img
                        src={item.plant.image_url}
                        alt={item.plant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🌿</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm truncate">{item.plant.name}</h4>
                        <p className="text-xs text-green-700 font-medium">₹{item.plant.price} each</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.plant.id)}
                        className="text-slate-400 hover:text-red-500 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-bold text-slate-800 text-sm">
                        ₹{(item.plant.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-white space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                    Add ₹{500 - subtotal} more for Free Delivery!
                  </p>
                )}
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-green-700 text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-center text-sm"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
