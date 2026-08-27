'use client';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingChatButton() {
  const pathname = usePathname();
  
  // Don't show the floating button on the chat page itself
  if (pathname === '/chat') return null;

  return (
    <Link 
      href="/chat"
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50"
      aria-label="Ask AI Assistant"
    >
      <MessageCircle className="w-6 h-6 mr-2" />
      <span className="font-semibold pr-1">Ask AI 🌱</span>
    </Link>
  );
}
