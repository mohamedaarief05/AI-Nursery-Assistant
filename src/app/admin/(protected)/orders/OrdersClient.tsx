'use client';
import { useState } from 'react';
import { Order } from '@/lib/types';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
    
    // DB update
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update status: ' + error.message);
      setOrders(orders); // Revert on error
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Date & ID</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Order Details</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition items-start">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center mb-1 font-medium text-slate-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-slate-400 truncate w-24" title={order.id}>
                    #{order.id.split('-')[0]}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{order.customer_name}</div>
                  <div className="text-sm text-slate-500 mt-1 flex flex-col gap-1">
                    <span className="flex items-center"><Phone className="w-3 h-3 mr-1 text-slate-400"/> {order.phone}</span>
                    {order.email && <span className="flex items-center"><Mail className="w-3 h-3 mr-1 text-slate-400"/> {order.email}</span>}
                    <div className="flex items-start mt-1 bg-slate-50 p-2 rounded text-xs border border-slate-100">
                      <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0 text-slate-400"/>
                      <span className="break-words">{order.address}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded bg-slate-200 overflow-hidden mr-3 flex-shrink-0">
                      {order.plants?.image_url ? (
                        <img src={order.plants.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="flex w-full h-full items-center justify-center text-xs">🪴</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{order.plants?.name || 'Unknown Plant'}</div>
                      <div className="text-xs font-medium text-slate-500">Qty: {order.quantity}</div>
                    </div>
                  </div>
                  <div className="text-green-700 font-bold bg-green-50 inline-block px-2 py-1 rounded text-sm border border-green-100">
                    Total: ₹{order.total_price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-sm rounded-lg px-3 py-1.5 border border-slate-200 font-medium focus:ring-2 focus:ring-slate-200 outline-none ${getStatusColor(order.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  <div className="text-4xl mb-3">🛍️</div>
                  <p className="font-medium text-slate-700">No orders yet.</p>
                  <p className="text-sm">When customers place orders, they will appear here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
