import { createClient } from '@/lib/supabase-server';
import { Sprout, MessageSquare, AlertCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminOverview() {
  const supabase = await createClient();

  // Fetch counts
  const { count: totalPlants } = await supabase.from('plants').select('*', { count: 'exact', head: true });
  const { count: availablePlants } = await supabase.from('plants').select('*', { count: 'exact', head: true }).eq('availability', 'Available');
  const { count: outOfStock } = await supabase.from('plants').select('*', { count: 'exact', head: true }).eq('availability', 'Out of Stock');
  const { count: newEnquiries } = await supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'New');
  
  // Safe fetch for orders count (in case table doesn't exist yet)
  const { count: totalOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true }).not('status', 'eq', 'Cancelled');

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 font-medium mb-1">Total Plants</p>
              <h3 className="text-3xl font-bold text-slate-800">{totalPlants || 0}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Sprout className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 font-medium mb-1">Total Orders</p>
              <h3 className="text-3xl font-bold text-purple-600">{totalOrders || 0}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 font-medium mb-1">Out of Stock</p>
              <h3 className="text-3xl font-bold text-red-600">{outOfStock || 0}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 font-medium mb-1">New Enquiries</p>
              <h3 className="text-3xl font-bold text-amber-600">{newEnquiries || 0}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/plants" className="px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition border border-slate-200">
              Manage Plant Inventory
            </Link>
            <Link href="/admin/enquiries" className="px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition border border-slate-200">
              Respond to Enquiries ({newEnquiries || 0} new)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
