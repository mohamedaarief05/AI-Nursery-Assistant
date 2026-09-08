'use client';

import Link from 'next/link';
import { MessageCircle, Camera } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingChatButton() {
  const pathname = usePathname();
  
  // Don't show floating buttons on their respective pages
  const isChat = pathname === '/chat';
  const isAnalysis = pathname === '/plant-analysis';

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 z-50">
      {/* Plant Doctor Floating Button */}
      {!isAnalysis && (
        <Link 
          href="/plant-analysis"
          className="bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-500 rounded-full py-3 px-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold text-xs sm:text-sm group"
          aria-label="Plant Doctor Photo Diagnosis"
        >
          <Camera className="w-4 h-4 mr-1.5 text-emerald-600 group-hover:scale-110 transition-transform" />
          <span>Plant Doctor 📸</span>
        </Link>
      )}

      {/* Ask AI Chat Floating Button */}
      {!isChat && (
        <Link 
          href="/chat"
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 px-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold text-xs sm:text-sm group"
          aria-label="Ask AI Assistant"
        >
          <MessageCircle className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
          <span>Ask AI 🌱</span>
        </Link>
      )}
    </div>
  );
}
