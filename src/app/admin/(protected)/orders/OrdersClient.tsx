'use client';

import { useState } from 'react';
import { Order } from '@/lib/types';
import { Mail, Phone, Calendar, MapPin, Search, Eye, X, QrCode, Banknote, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { success, error: toastError } = useToast();

  const handleStatusChange = async (id: string, newStatus: string) => {
    const previousOrders = [...orders];
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus as any });
    }

    const supabase = createClient();
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      toastError('Failed to update status: ' + error.message);
      setOrders(previousOrders);
    } else {
      success(`Order #${id.substring(0, 8)} status set to ${newStatus}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Helper to extract Payment Method and Transaction UTR from address field
  const parsePaymentInfo = (addressStr: string) => {
    const isUpi = addressStr?.includes('Online UPI') || addressStr?.includes('UTR:');
    const utrMatch = addressStr?.match(/Transaction UTR:\s*([^\s\]]+)/i) || addressStr?.match(/UTR:\s*([^\s\]]+)/i);
    const utrId = utrMatch ? utrMatch[1] : null;

    return {
      isUpi,
      utrId,
      label: isUpi ? 'Online UPI (GPay)' : 'Cash on Delivery'
    };
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(query) ||
      order.phone?.toLowerCase().includes(query) ||
      order.email?.toLowerCase().includes(query) ||
      order.address?.toLowerCase().includes(query) ||
      order.plants?.name?.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const totalCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const activeCount = orders.filter(o => ['Processing', 'Out for Delivery'].includes(o.status)).length;
  const completedCount = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

  // Valid DB check constraint status options
  const validStatusOptions = ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      {/* Metrics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Orders</p>
          <p className="text-2xl font-black text-slate-800">{totalCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Pending Orders</p>
          <p className="text-2xl font-black text-amber-700">{pendingCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">In Processing</p>
          <p className="text-2xl font-black text-blue-700">{activeCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Nursery Revenue</p>
          <p className="text-2xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search orders (name, phone, UTR ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Statuses ({orders.length})</option>
            {validStatusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Payment Method & UTR</th>
                <th className="px-6 py-4">Ordered Plant</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.map((order) => {
                const payInfo = parsePaymentInfo(order.address);

                return (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-slate-700 font-bold mb-1">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        #{order.id.substring(0, 8)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{order.customer_name}</div>
                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        <a href={`tel:${order.phone}`} className="flex items-center text-emerald-700 hover:underline font-semibold">
                          <Phone className="w-3 h-3 mr-1" /> {order.phone}
                        </a>
                        {order.email && (
                          <span className="flex items-center text-slate-400">
                            <Mail className="w-3 h-3 mr-1" /> {order.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Payment Method Badge & Transaction ID */}
                    <td className="px-6 py-4">
                      {payInfo.isUpi ? (
                        <div className="bg-purple-50 border border-purple-200 p-2 rounded-xl inline-block">
                          <div className="flex items-center gap-1 text-xs font-bold text-purple-900">
                            <QrCode className="w-3.5 h-3.5 text-purple-700" /> Online UPI (GPay)
                          </div>
                          {payInfo.utrId ? (
                            <div className="text-[11px] font-mono text-purple-800 mt-0.5 font-bold">
                              UTR: {payInfo.utrId}
                            </div>
                          ) : (
                            <div className="text-[11px] text-purple-600">Awaiting UTR</div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-slate-100 border border-slate-200 p-2 rounded-xl inline-block">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            <Banknote className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          {order.plants?.image_url ? (
                            <img src={order.plants.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">🪴</div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{order.plants?.name || 'Plant'}</p>
                          <p className="text-xs text-slate-400 font-medium">Qty: {order.quantity}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-emerald-700 text-base">
                      ₹{order.total_price?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <select 
                          value={validStatusOptions.includes(order.status) ? order.status : 'Pending'}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          {validStatusOptions.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (() => {
        const payInfo = parsePaymentInfo(selectedOrder.address);

        return (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="font-black text-slate-800 text-lg">Order #{selectedOrder.id.substring(0, 8)}</h3>
                  <p className="text-xs text-slate-500">
                    Placed on {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 text-sm">
                {/* Payment Verification Card */}
                <div className={`p-4 rounded-2xl border ${payInfo.isUpi ? 'bg-purple-50 border-purple-200' : 'bg-emerald-50 border-emerald-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Payment Verification</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${payInfo.isUpi ? 'bg-purple-700 text-white' : 'bg-emerald-700 text-white'}`}>
                      {payInfo.label}
                    </span>
                  </div>

                  {payInfo.isUpi && payInfo.utrId && (
                    <div className="mt-3 bg-white p-3 rounded-xl border border-purple-200 space-y-1">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">GPay / PhonePe Transaction UTR Ref:</p>
                      <p className="font-mono font-black text-purple-900 text-base flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        {payInfo.utrId}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Check your Nursery GPay / Bank statement for this exact 12-digit UTR before dispatching plants.
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Customer & Delivery Info</h4>
                  <p className="font-bold text-slate-800 text-base">{selectedOrder.customer_name}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a 
                      href={`tel:${selectedOrder.phone}`} 
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
                    >
                      <Phone className="w-3 h-3" /> Call: {selectedOrder.phone}
                    </a>
                    {selectedOrder.email && (
                      <a 
                        href={`mailto:${selectedOrder.email}`} 
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                      >
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    )}
                  </div>
                  <div className="pt-2 text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{selectedOrder.address}</span>
                  </div>
                </div>

                {/* Plant Details */}
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                    {selectedOrder.plants?.image_url ? (
                      <img src={selectedOrder.plants.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🪴</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800">{selectedOrder.plants?.name || 'Plant'}</h4>
                    <p className="text-xs text-slate-500">Quantity: {selectedOrder.quantity}</p>
                  </div>
                  <div className="text-right font-black text-emerald-700 text-lg">
                    ₹{selectedOrder.total_price?.toLocaleString()}
                  </div>
                </div>

                {/* Status Selector - Only Valid DB Check Constraint Statuses */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Update Order Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {validStatusOptions.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selectedOrder.id, st)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center ${
                          selectedOrder.status === st
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
