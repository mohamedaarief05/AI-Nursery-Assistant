import Link from 'next/link';
import { LayoutDashboard, Sprout, MessageSquare, ShoppingBag, LogOut, Shield, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { signout } from '@/app/auth/actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
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
      <aside className="w-full md:w-64 bg-slate-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-900">
        <div>
          <div className="p-6 border-b border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-white text-base tracking-tight">Admin Portal</h2>
                <p className="text-[11px] text-slate-400 font-mono">v2.0 • Secured</p>
              </div>
            </div>
          </div>

          {/* Admin User Info */}
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-900">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Logged In As</p>
            <p className="text-xs font-medium text-emerald-400 truncate mt-0.5">{user.email}</p>
          </div>

          <nav className="p-4 space-y-1.5 text-sm font-semibold">
            <Link 
              href="/admin" 
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-emerald-400 text-slate-300 transition"
            >
              <LayoutDashboard className="w-4 h-4 mr-3 text-slate-400" /> Overview
            </Link>
            <Link 
              href="/admin/orders" 
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-emerald-400 text-slate-300 transition"
            >
              <ShoppingBag className="w-4 h-4 mr-3 text-slate-400" /> Orders
            </Link>
            <Link 
              href="/admin/plants" 
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-emerald-400 text-slate-300 transition"
            >
              <Sprout className="w-4 h-4 mr-3 text-slate-400" /> Manage Plants
            </Link>
            <Link 
              href="/admin/enquiries" 
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-emerald-400 text-slate-300 transition"
            >
              <MessageSquare className="w-4 h-4 mr-3 text-slate-400" /> Enquiries
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-900 space-y-2">
          <Link 
            href="/" 
            className="flex items-center px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition text-xs font-semibold"
          >
            <ExternalLink className="w-4 h-4 mr-3" /> View Live Website
          </Link>
          <form action={signout}>
            <button
              type="submit"
              className="w-full flex items-center px-4 py-2.5 rounded-xl hover:bg-red-950/40 text-red-400 hover:text-red-300 transition text-xs font-semibold"
            >
              <LogOut className="w-4 h-4 mr-3" /> Sign Out Admin
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
