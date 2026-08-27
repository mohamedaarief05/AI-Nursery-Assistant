'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Bot, ShoppingBag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { Plant } from '@/lib/types';

export default function PlantActionButtons({ plant }: { plant: Plant }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const isAvailable = plant.availability === 'Available';

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {isAvailable && (
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Order Now
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href={`/contact?plant_id=${plant.id}`}
          className="flex-1 bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center"
        >
          <Mail className="w-5 h-5 mr-2" />
          Send Enquiry
        </Link>
        <Link 
          href={`/chat?plant=${encodeURIComponent(plant.name)}`}
          className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center shadow-md"
        >
          <Bot className="w-5 h-5 mr-2" />
          Ask AI About This
        </Link>
      </div>

      <CheckoutModal 
        plant={plant} 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
}
