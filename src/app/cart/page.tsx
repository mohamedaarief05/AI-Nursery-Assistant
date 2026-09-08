'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Truck, ShieldCheck, Sprout } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, deliveryFee, totalPrice } = useCart();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Breadcrumb / Back button */}
      <Link 
        href="/plants" 
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-green-700 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-green-600" /> Shopping Cart
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review your plant selections and proceed to delivery details.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center flex flex-col items-center max-w-xl mx-auto">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mb-6">
            🪴
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is currently empty</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Bring life and fresh air to your home! Discover our collection of easy-care indoor plants, flowering varieties, and fruit trees.
          </p>
          <Link
            href="/plants"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md transition flex items-center gap-2 text-sm"
          >
            <Sprout className="w-4 h-4" /> Browse Plant Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.plant.id}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                  {item.plant.image_url ? (
                    <img
                      src={item.plant.image_url}
                      alt={item.plant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🌱</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/plants/${item.plant.id}`} className="hover:text-green-700 transition">
                        <h3 className="font-bold text-slate-800 text-base">{item.plant.name}</h3>
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">{item.plant.categories?.name || 'Plant'}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.plant.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                      title="Remove plant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
                      <button
                        onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center font-bold text-slate-800 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">₹{item.plant.price} each</div>
                      <div className="text-base font-extrabold text-slate-800">
                        ₹{(item.plant.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {deliveryFee > 0 ? (
                <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-xl border border-amber-100 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Add ₹{500 - subtotal} more to qualify for <strong>Free Delivery</strong>!</span>
                </div>
              ) : (
                <div className="bg-green-50 text-green-800 text-xs p-3 rounded-xl border border-green-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>You have unlocked <strong>Free Nursery Delivery</strong>!</span>
                </div>
              )}

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-base">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="font-black text-2xl text-green-700">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-sm text-center"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-center">
              <p className="text-xs text-slate-400">
                🔒 Safe checkout • Cash or UPI on delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
