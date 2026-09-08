'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, ShoppingBag, Menu, X, Bot, Camera, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { signout } from '@/app/auth/actions';

interface HeaderClientProps {
  userEmail?: string | null;
}

export default function HeaderClient({ userEmail }: HeaderClientProps) {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-green-700 font-bold group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-700 group-hover:bg-green-600 group-hover:text-white transition">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-green-700 transition">
            AI Nursery
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-slate-600 hover:text-green-700 transition">
            Home
          </Link>
          <Link href="/plants" className="text-slate-600 hover:text-green-700 transition">
            Plants
          </Link>
          <Link href="/find-my-plant" className="text-slate-600 hover:text-green-700 transition">
            Find My Plant
          </Link>
          <Link href="/plant-analysis" className="text-slate-600 hover:text-green-700 transition flex items-center gap-1">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>Plant Doctor</span>
          </Link>
          <Link href="/project-dashboard" className="text-emerald-700 hover:text-emerald-800 font-extrabold transition flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span>Project Dashboard</span>
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-green-700 transition">
            About
          </Link>
          <Link href="/feedback" className="text-slate-600 hover:text-green-700 transition">
            Feedback
          </Link>
          <Link href="/contact" className="text-slate-600 hover:text-green-700 transition">
            Contact
          </Link>
        </nav>

        {/* Action Controls: Cart, Auth, Ask AI */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Button */}
          <button
            onClick={openCart}
            aria-label="View Cart"
            className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-200 text-slate-700 hover:text-green-700 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm animate-scale">
                {totalItems}
              </span>
            )}
          </button>

          {/* User / Admin Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            {userEmail ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{userEmail.split('@')[0]}</span>
                </Link>
                <form action={signout}>
                  <button
                    type="submit"
                    title="Sign Out"
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/login"
                  className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:text-green-700 hover:bg-slate-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/admin/login"
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>

          {/* Ask AI CTA */}
          <Link
            href="/chat"
            className="hidden sm:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI</span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              Home
            </Link>
            <Link
              href="/plants"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              Plants Catalog
            </Link>
            <Link
              href="/find-my-plant"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              Find My Plant Quiz
            </Link>
            <Link
              href="/plant-analysis"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Plant Doctor (Photo Analysis)</span>
            </Link>
            <Link
              href="/project-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 transition"
            >
              📊 Project Review Dashboard
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition flex items-center justify-between"
            >
              <span>Shopping Cart</span>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              About Nursery
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white font-bold transition shadow-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Assistant</span>
            </Link>

            {userEmail ? (
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-sm text-slate-700 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>My Account</span>
                </Link>
                <form action={signout}>
                  <button
                    type="submit"
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-sm font-semibold rounded-xl bg-slate-100 text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-sm font-semibold rounded-xl border border-slate-200 text-slate-700"
                >
                  Admin Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
