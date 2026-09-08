'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Bot, Send, User, Loader2, Trash2, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Plant } from '@/lib/types';
import PlantCard from '@/components/PlantCard';
import { useSearchParams } from 'next/navigation';

function ChatContent() {
  const searchParams = useSearchParams();
  const prefilledPlant = searchParams.get('plant');

  const { messages, sendMessage, status, setMessages } = useChat({
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I am your AI Nursery Assistant 🌱\nI can recommend plants from our catalog, check prices & live stock, and give personalized care instructions.\n\nHow can I help you green your space today?',
        parts: [{ 
          type: 'text', 
          text: 'Hello! I am your AI Nursery Assistant 🌱\nI can recommend plants from our catalog, check prices & live stock, and give personalized care instructions.\n\nHow can I help you green your space today?' 
        }]
      } as any
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [plantsDb, setPlantsDb] = useState<Plant[]>([]);
  const [localInput, setLocalInput] = useState('');

  useEffect(() => {
    // Fetch live plants to render interactive cards when AI outputs [PLANT_CARD: Name]
    const fetchPlants = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('plants').select('*, categories(name)');
      if (data) setPlantsDb(data as Plant[]);
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    if (prefilledPlant && messages.length === 1) {
      sendMessage({ text: `Can you tell me about the ${prefilledPlant} and how to care for it?` });
    }
  }, [prefilledPlant]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I am your AI Nursery Assistant 🌱\nI can recommend plants from our catalog, check prices & live stock, and give personalized care instructions.\n\nHow can I help you green your space today?',
        parts: [{ 
          type: 'text', 
          text: 'Hello! I am your AI Nursery Assistant 🌱\nI can recommend plants from our catalog, check prices & live stock, and give personalized care instructions.\n\nHow can I help you green your space today?' 
        }]
      } as any
    ]);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    sendMessage({ text: localInput });
    setLocalInput('');
  };

  const parseMessageContent = (content: string) => {
    const parts = content.split(/(\[PLANT_CARD:.*?\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('[PLANT_CARD:') && part.endsWith(']')) {
        const plantName = part.replace('[PLANT_CARD:', '').replace(']', '').trim();
        const plant = plantsDb.find(p => p.name.toLowerCase() === plantName.toLowerCase());
        
        if (plant) {
          return (
            <div key={index} className="my-4 max-w-xs sm:max-w-sm">
              <PlantCard plant={plant} />
            </div>
          );
        }
        return null;
      }
      
      return (
        <span key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </span>
      );
    });
  };

  const suggestedQuestions = [
    "Which plant is good for low sunlight?",
    "Show me indoor plants under ₹200",
    "I am a beginner. Which plant should I choose?",
    "Which plants need less watering?",
    "Do you have flowering plants available?"
  ];

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-85px)] max-h-[850px] max-w-4xl flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Bot className="w-5 h-5" />
            </span>
            <span>AI Nursery Assistant</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Grounded directly in our live Supabase plant catalog.
          </p>
        </div>
        <button 
          onClick={clearChat}
          className="text-slate-400 hover:text-rose-600 transition flex items-center text-xs font-semibold bg-white border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear Chat
        </button>
      </div>

      <div className="flex-grow bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        {/* Messages List */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[88%] sm:max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  m.role === 'user' ? 'bg-slate-900 text-white ml-2.5' : 'bg-emerald-100 text-emerald-800 mr-2.5'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {parseMessageContent((m as any).parts?.map((p: any) => p.text).join('') || (m as any).content || '')}
                </div>
              </div>
            </div>
          ))}

          {status !== 'ready' && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span className="text-slate-500 text-xs font-medium">Consulting plant database...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Suggestion Chips */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage({ text: q })}
                  className="bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" /> {q}
                </button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Ask about plants, low sunlight, pricing, or care instructions..."
              className="flex-grow px-4 py-3 text-slate-900 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              disabled={status !== 'ready'}
            />
            <button 
              type="submit" 
              disabled={status !== 'ready' || !localInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-2xl transition disabled:opacity-50 flex items-center justify-center shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
