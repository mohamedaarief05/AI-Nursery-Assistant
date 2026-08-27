'use client';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, User, Loader2, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Plant } from '@/lib/types';
import PlantCard from '@/components/PlantCard';
import { useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const prefilledPlant = searchParams.get('plant');

  const { messages, sendMessage, status, setMessages } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hi! I’m your AI Nursery Assistant 🤖🌱\nAsk me about plants, prices, availability, or plant care.',
        parts: [{ type: 'text', text: 'Hi! I’m your AI Nursery Assistant 🤖🌱\nAsk me about plants, prices, availability, or plant care.' }]
      } as any
    ]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [plantsDb, setPlantsDb] = useState<Plant[]>([]);
  const [localInput, setLocalInput] = useState('');

  useEffect(() => {
    // Fetch plants to render cards when AI uses [PLANT_CARD: Name]
    const fetchPlants = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('plants').select('*, categories(name)');
      if (data) setPlantsDb(data as Plant[]);
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    if (prefilledPlant && messages.length === 1) {
      // Auto-trigger a message if coming from a "Ask AI" button on a plant
      sendMessage({ text: `Can you tell me more about the ${prefilledPlant} plant?` });
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
        content: 'Hi! I’m your AI Nursery Assistant 🤖🌱\nAsk me about plants, prices, availability, or plant care.',
        parts: [{ type: 'text', text: 'Hi! I’m your AI Nursery Assistant 🤖🌱\nAsk me about plants, prices, availability, or plant care.' }]
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
            <div key={index} className="my-4 max-w-sm">
              <PlantCard plant={plant} />
            </div>
          );
        }
        return null;
      }
      
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  const suggestedQuestions = [
    "What plants are available?",
    "Do you have Jasmine?",
    "Which plant is suitable for a balcony?",
    "What plants do you have under ₹150?"
  ];

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] max-h-[800px] max-w-4xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <Bot className="w-8 h-8 mr-2 text-green-600" /> AI Assistant
          </h1>
          <p className="text-sm text-slate-500">Ask about our plants, availability, and care.</p>
        </div>
        <button 
          onClick={clearChat}
          className="text-slate-500 hover:text-red-500 transition flex items-center text-sm font-medium"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Clear Chat
        </button>
      </div>

      <div className="flex-grow bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  m.role === 'user' ? 'bg-slate-800 text-white ml-3' : 'bg-green-100 text-green-700 mr-3'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {parseMessageContent((m as any).parts?.map((p: any) => p.text).join('') || (m as any).content || '')}
                </div>
              </div>
            </div>
          ))}
          {status !== 'ready' && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-none flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                  <span className="ml-2 text-slate-500 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sendMessage({ text: q });
                  }}
                  className="bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-50 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow px-4 py-3 text-slate-900 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={status !== 'ready'}
            />
            <button 
              type="submit" 
              disabled={status !== 'ready' || !localInput.trim()}
              className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
