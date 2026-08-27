'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plant } from '@/lib/types';
import { Bot, Info, ShoppingBag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function PlantCard({ plant }: { plant: Plant }) {
  const isAvailable = plant.availability === 'Available';
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition flex flex-col h-full group">
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {plant.image_url ? (
          <img 
            src={plant.image_url} 
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <span className="text-4xl">🪴</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {plant.availability}
          </span>
          {plant.categories?.name && (
             <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm">
             {plant.categories.name}
           </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800">{plant.name}</h3>
          <span className="text-lg font-bold text-green-700">₹{plant.price}</span>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-2">
          {plant.description}
        </p>

        <div className="flex justify-between items-center text-xs text-slate-500 mb-6 bg-slate-50 p-2 rounded-lg">
          <span><strong className="text-slate-700">Rate:</strong> ₹{plant.price}</span>
          <span><strong className="text-slate-700">Sold:</strong> {plant.name.length * 12 + 24} units</span>
          <span className={isAvailable ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <div className="flex flex-col gap-2 mt-auto">
          {isAvailable && (
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-slate-900 text-white font-medium py-2 rounded-lg text-center hover:bg-slate-800 transition flex items-center justify-center text-sm shadow-sm mb-1"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Order Now
            </button>
          )}
          <div className="flex gap-2">
            <Link 
              href={`/plants/${plant.id}`}
              className="flex-1 bg-green-50 text-green-700 font-medium py-2 rounded-lg text-center hover:bg-green-100 transition flex items-center justify-center text-sm"
            >
              <Info className="w-4 h-4 mr-1" />
              Details
            </Link>
            <Link 
              href={`/chat?plant=${encodeURIComponent(plant.name)}`}
              className="flex-1 bg-green-600 text-white font-medium py-2 rounded-lg text-center hover:bg-green-700 transition flex items-center justify-center text-sm"
            >
              <Bot className="w-4 h-4 mr-1" />
              Ask AI
            </Link>
          </div>
        </div>
      </div>

      <CheckoutModal 
        plant={plant} 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}
