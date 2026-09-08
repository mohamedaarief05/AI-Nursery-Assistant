import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 text-white mb-4">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">AI Nursery</span>
          </Link>
          <p className="text-green-200 text-sm mb-4">
            Helping you find the perfect plants for your home and garden, powered by AI.
          </p>
          <div className="text-xs text-green-400 bg-green-800 inline-block px-2 py-1 rounded">
            AI Immersion Project
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/plants" className="hover:text-white transition">Plants Catalog</Link></li>
            <li><Link href="/find-my-plant" className="hover:text-white transition">Find My Plant</Link></li>
            <li><Link href="/plant-analysis" className="hover:text-white transition">Plant Doctor</Link></li>
            <li><Link href="/design-thinking" className="hover:text-white transition font-semibold text-emerald-300">Design Portfolio</Link></li>
            <li><Link href="/chat" className="hover:text-white transition">AI Assistant</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition opacity-70">Admin Login</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-green-200">
            <li>123 Green Valley Road, Plant City</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Email: hello@ainursery.example.com</li>
            <li>Hours: Mon-Sat, 9AM - 6PM</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-green-800 text-center text-sm text-green-400">
        <p>AI Nursery Assistant — An AI-powered solution for improving customer support in local nurseries.</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} AI Nursery. All rights reserved.</p>
      </div>
    </footer>
  );
}
