import Link from 'next/link';
import { Leaf, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { signout } from '@/app/auth/actions';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-green-700">
          <Leaf className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">AI Nursery</span>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-slate-600 hover:text-green-700 transition">Home</Link>
          <Link href="/plants" className="text-slate-600 hover:text-green-700 transition">Plants</Link>
          <Link href="/find-my-plant" className="text-slate-600 hover:text-green-700 transition">Find My Plant</Link>
          <Link href="/about" className="text-slate-600 hover:text-green-700 transition">About</Link>
          <Link href="/contact" className="text-slate-600 hover:text-green-700 transition">Contact</Link>
          
          {user ? (
            <div className="flex items-center ml-4 border-l border-slate-200 pl-4 space-x-4">
              <Link href="/profile" className="text-slate-600 hover:text-green-700 transition font-medium">
                My Profile
              </Link>
              <form action={signout}>
                <button type="submit" className="text-slate-400 hover:text-red-600 transition flex items-center">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4 border-l border-slate-200 pl-4">
              <Link href="/login" className="text-slate-600 hover:text-green-700 transition font-medium">Sign In</Link>
              <Link href="/admin/login" className="text-xs border border-slate-300 text-slate-500 hover:bg-slate-50 px-2 py-1 rounded transition ml-2">Admin</Link>
            </div>
          )}
          
          <Link 
            href="/chat" 
            className="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition flex items-center space-x-2 ml-4"
          >
            <span>Ask AI</span>
            <span className="text-lg">🌱</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
