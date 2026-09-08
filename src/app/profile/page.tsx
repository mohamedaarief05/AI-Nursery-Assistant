import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { User, Mail, Calendar, MessageSquare, Leaf, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { signout } from '@/app/auth/actions';
import { getCurrentUser } from '@/lib/auth-helper';

export default async function ProfilePage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', user.email)
    .single();
    
  const isAdmin = !!adminUser;

  // Fetch the user's submitted enquiries if they match the email, filtering out 'Completed' ones
  const { data: userEnquiries } = await supabase
    .from('enquiries')
    .select('*, plants(name)')
    .eq('email', user.email)
    .neq('status', 'Completed')
    .order('created_at', { ascending: false });

  // Fetch the user's orders
  const { data: userOrders } = await supabase
    .from('orders')
    .select('*, plants(name, image_url)')
    .eq('email', user.email)
    .order('created_at', { ascending: false });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              {isAdmin ? 'Administrator' : 'Customer'}
            </h2>
            <div className="flex items-center justify-center text-slate-500 mb-4">
              <Mail className="w-4 h-4 mr-1" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center justify-center text-slate-500 mb-6">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">Joined {user.created_at ? formatDate(user.created_at) : 'recently'}</span>
            </div>
            
            <form action={signout}>
              <button 
                type="submit"
                className="w-full bg-slate-100 hover:bg-red-50 text-red-600 font-medium py-3 rounded-xl transition flex items-center justify-center space-x-2"
              >  Sign Out
              </button>
            </form>
          </div>

          {isAdmin && (
            <div className="bg-slate-900 p-6 rounded-3xl shadow-sm text-center text-white">
              <h3 className="font-bold mb-2">Admin Controls</h3>
              <p className="text-sm text-slate-400 mb-4">Manage plants and respond to customer enquiries.</p>
              <Link href="/admin" className="block w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold py-3 rounded-xl transition">
                Go to Admin Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Account Details & History */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-purple-600" /> Order History
            </h2>
            
            {!userOrders || userOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                <Link href="/plants" className="text-purple-600 font-medium hover:underline">
                  Browse Plants
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div key={order.id} className="border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
                      {order.plants?.image_url ? (
                        <img src={order.plants.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">🪴</div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-800">{order.plants?.name || 'Unknown Plant'} (x{order.quantity})</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">Order #{order.id.split('-')[0]} • {formatDate(order.created_at)}</p>
                      <div className="flex justify-between items-end mt-auto">
                        <span className="text-xs text-slate-400 truncate max-w-[200px]">To: {order.address}</span>
                        <span className="font-bold text-green-700">₹{order.total_price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-600" /> My Enquiries
            </h2>
            
            {!userEnquiries || userEnquiries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">You haven't sent any enquiries yet.</p>
                <Link href="/contact" className="text-green-600 font-medium hover:underline">
                  Contact us
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userEnquiries.map((enq) => (
                  <div key={enq.id} className="border border-slate-100 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        enq.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        enq.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {enq.status}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(enq.created_at)}</span>
                    </div>
                    {enq.plants?.name && (
                      <p className="text-sm font-semibold text-slate-700 mb-1">
                        Regarding: {enq.plants.name}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm mb-3">{enq.message}</p>
                    
                    {enq.admin_reply && (
                      <div className="mt-3 bg-green-50 border border-green-100 rounded-lg p-3">
                        <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1 flex items-center">
                          <Leaf className="w-3 h-3 mr-1" /> Nursery Support Reply
                        </p>
                        <p className="text-sm text-green-900">{enq.admin_reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
