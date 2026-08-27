'use client';
import { useState, useEffect } from 'react';
import { Plant } from '@/lib/types';
import { X, CheckCircle2, Loader2, Minus, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function CheckoutModal({ plant, isOpen, onClose }: { plant: Plant, isOpen: boolean, onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Pre-fill user email if logged in
  useEffect(() => {
    if (isOpen) {
      const fetchUser = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setFormData(prev => ({ ...prev, email: user.email! }));
        }
      };
      fetchUser();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPrice = plant.price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.customer_name,
          phone: formData.phone,
          email: formData.email || null,
          address: formData.address,
          plant_id: plant.id,
          quantity: quantity,
          total_price: totalPrice,
          status: 'Pending'
        });

      if (submitError) throw submitError;
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Did you run the SQL command to create the orders table?');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setQuantity(1);
    setFormData({ customer_name: '', phone: '', email: '', address: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Checkout</h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex-grow flex flex-col items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Order Placed!</h3>
            <p className="text-slate-600 mb-6">Your order for {quantity}x {plant.name} has been received.</p>
            <button 
              onClick={handleClose}
              className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-grow">
            {/* Order Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex items-center">
              <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden mr-4">
                {plant.image_url ? (
                  <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                )}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-slate-800">{plant.name}</h4>
                <p className="text-sm text-slate-500">₹{plant.price} per plant</p>
              </div>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-slate-600 hover:bg-slate-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-semibold text-slate-800">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-2 text-slate-600 hover:bg-slate-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input required type="text" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                  <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Email address" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address *</label>
                <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Full address with zip code..."></textarea>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600">Total Price:</span>
                <span className="text-2xl font-bold text-green-700">₹{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition flex justify-center items-center disabled:opacity-70"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : 'Place Order'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
