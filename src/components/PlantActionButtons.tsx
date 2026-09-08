'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Bot, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Plant } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function PlantActionButtons({ plant }: { plant: Plant }) {
  const isAvailable = plant.availability === 'Available';
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(plant, quantity);
    }
  };

  const handleBuyNow = () => {
    if (isAvailable) {
      addItem(plant, quantity);
      router.push('/checkout');
    }
  };

  return (
    <div className="space-y-4">
      {isAvailable ? (
        <div className="space-y-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Quantity:</span>
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-slate-800 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-slate-500 font-medium">
              Subtotal: <strong className="text-green-700">₹{(plant.price * quantity).toLocaleString()}</strong>
            </span>
          </div>

          {/* Cart & Buy Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition flex items-center justify-center shadow-md active:scale-98 text-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-2xl transition flex items-center justify-center shadow-md active:scale-98 text-sm"
            >
              Buy Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-center">
          <p className="font-bold text-red-700 text-sm">Currently Out of Stock</p>
          <p className="text-xs text-red-600 mt-1">
            Send us an enquiry below and we will notify you when this plant is restocked!
          </p>
        </div>
      )}

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Link 
          href={`/contact?plant_id=${plant.id}`}
          className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3 px-4 rounded-xl transition flex items-center justify-center text-sm"
        >
          <Mail className="w-4 h-4 mr-2 text-slate-500" />
          Enquire About Plant
        </Link>
        <Link 
          href={`/chat?plant=${encodeURIComponent(plant.name)}`}
          className="bg-green-50 border border-green-200 text-green-800 hover:bg-green-100 font-bold py-3 px-4 rounded-xl transition flex items-center justify-center text-sm"
        >
          <Bot className="w-4 h-4 mr-2 text-green-600" />
          Ask AI Care Guide
        </Link>
      </div>
    </div>
  );
}
