import Link from 'next/link';
import { LayoutDashboard, Sprout, MessageSquare, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { signout } from '@/app/auth/actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Check if they are in admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (!adminUser) {
    redirect('/admin/login?message=Unauthorized: You are not an admin');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Overview
          </Link>
          <Link href="/admin/orders" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition">
            <ShoppingBag className="w-5 h-5 mr-3" /> Orders
          </Link>
          <Link href="/admin/plants" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition">
            <Sprout className="w-5 h-5 mr-3" /> Manage Plants
          </Link>
          <Link href="/admin/enquiries" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition">
            <MessageSquare className="w-5 h-5 mr-3" /> Enquiries
          </Link>
          <div className="pt-8 mt-4 border-t border-slate-800">
            <Link href="/" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 transition">
              <LogOut className="w-5 h-5 mr-3" /> Back to Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
