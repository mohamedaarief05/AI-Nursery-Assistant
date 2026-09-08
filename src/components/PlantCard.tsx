'use client';

import Link from 'next/link';
import { Plant } from '@/lib/types';
import { Bot, Info, ShoppingBag, Sun, Droplets } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function PlantCard({ plant }: { plant: Plant }) {
  const isAvailable = plant.availability === 'Available';
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addItem(plant, 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col h-full group">
      {/* Image Banner */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
        {plant.image_url ? (
          <img 
            src={plant.image_url} 
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <span className="text-5xl">🪴</span>
          </div>
        )}

        {/* Badges on Image */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
            isAvailable 
              ? 'bg-emerald-500/90 text-white backdrop-blur-xs' 
              : 'bg-rose-500/90 text-white backdrop-blur-xs'
          }`}>
            {plant.availability}
          </span>
          {plant.categories?.name && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/95 text-slate-700 shadow-sm backdrop-blur-xs">
              {plant.categories.name}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5">
          <Link href={`/plants/${plant.id}`} className="hover:text-green-700 transition">
            <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{plant.name}</h3>
          </Link>
          <span className="text-xl font-extrabold text-green-700 ml-2">₹{plant.price}</span>
        </div>
        
        <p className="text-slate-500 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
          {plant.description}
        </p>

        {/* Environmental Indicators */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Sun className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{plant.sunlight || 'Moderate Light'}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Droplets className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{plant.watering || 'Normal Water'}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2 mt-auto pt-2">
          {isAvailable ? (
            <button 
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center text-sm shadow-sm active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          ) : (
            <button 
              disabled
              className="w-full bg-slate-100 text-slate-400 font-bold py-2.5 rounded-xl text-sm cursor-not-allowed text-center"
            >
              Out of Stock
            </button>
          )}

          <div className="flex gap-2">
            <Link 
              href={`/plants/${plant.id}`}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl text-center transition flex items-center justify-center text-xs"
            >
              <Info className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Details
            </Link>
            <Link 
              href={`/chat?plant=${encodeURIComponent(plant.name)}`}
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2 rounded-xl text-center transition flex items-center justify-center text-xs"
            >
              <Bot className="w-3.5 h-3.5 mr-1 text-green-600" />
              Ask AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
