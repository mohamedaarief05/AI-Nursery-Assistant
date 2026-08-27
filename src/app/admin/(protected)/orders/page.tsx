import { createClient } from '@/lib/supabase-server';
import { Order } from '@/lib/types';
import OrdersClient from './OrdersClient';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  
  // Try to fetch orders. If it fails, the table might not exist yet.
  const { data, error } = await supabase
    .from('orders')
    .select('*, plants(name, image_url)')
    .order('created_at', { ascending: false });

  const orders = (data as Order[]) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Manage Orders</h1>
      </div>

      {error ? (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-700">
          <h3 className="text-xl font-bold mb-2">Error Loading Orders</h3>
          <p className="mb-4">It looks like the `orders` table has not been created in the database yet.</p>
          <p className="font-mono bg-red-100 p-3 rounded text-sm text-red-800 overflow-x-auto">
            {error.message}
          </p>
        </div>
      ) : (
        <OrdersClient initialOrders={orders} />
      )}
    </div>
  );
}
