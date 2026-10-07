import Link from 'next/link';
import { LayoutDashboard, Sprout, MessageSquare, ShoppingBag, LogOut, Shield, ExternalLink, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signout } from '@/app/auth/actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let adminEmail = user?.email;
  if (!adminEmail) {
    const cookieStore = await cookies();
    const fallbackEmail = cookieStore.get('nursery_user_email')?.value;
    const isAdminCookie = cookieStore.get('nursery_is_admin')?.value === 'true';
    if (fallbackEmail === 'admin@ainursery.com' || isAdminCookie) {
      adminEmail = fallbackEmail || 'admin@ainursery.com';
    }
  }

  if (!adminEmail) {
    redirect('/admin/login');
  }

  // Check if they are in admin_users table or matches the designated admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', adminEmail)
    .single();

  if (!adminUser && adminEmail !== 'admin@ainursery.com') {
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
            <p className="text-xs font-medium text-emerald-400 truncate mt-0.5">{adminEmail}</p>
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
            <Link 
              href="/admin/feedback" 
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-emerald-400 text-slate-300 transition"
            >
              <Star className="w-4 h-4 mr-3 text-amber-400" /> Customer Feedback
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
              className="w-full flex items-center px-4 py-2.5 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition text-xs font-semibold"
            >
              <LogOut className="w-4 h-4 mr-3" /> Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
