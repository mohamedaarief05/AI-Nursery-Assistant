import Link from 'next/link';
import { ArrowRight, Sprout, Bot, Camera, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 via-emerald-50/40 to-white py-20 lg:py-28">
        <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI-Powered Nursery Platform • Live Inventory & Instant Care</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Find the Perfect Plant <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              Without Waiting for a Call 🌱
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Browse our real-time nursery catalog, ask our database-grounded AI assistant, diagnose plant health via photos, and order healthy plants to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center max-w-md">
            <Link 
              href="/plants" 
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-lg transition text-base flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Explore Plants
            </Link>
            <Link 
              href="/chat" 
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-2xl shadow-md transition text-base border border-slate-200 flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5 text-emerald-600" />
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Modern Nursery Tech
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mt-3 mb-3">
              Everything You Need for Happy Plants
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Bringing nursery expertise and artificial intelligence together for plant parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Live Catalog */}
            <Link href="/plants" className="group bg-[#FDFCF8] p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition">Live Plant Catalog</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                Filter by sunlight, watering schedule, and category with live pricing and stock status.
              </p>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-auto">
                Browse Collection <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* AI Assistant */}
            <Link href="/chat" className="group bg-[#FDFCF8] p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition">Grounded AI Chat</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                Answers your questions using our real plant database with zero hallucinations.
              </p>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-auto">
                Chat with Assistant <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Plant Doctor */}
            <Link href="/plant-analysis" className="group bg-[#FDFCF8] p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition">Plant Doctor (Vision)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                Upload a photo of any leaf or plant for instant AI identification and health assessment.
              </p>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-auto">
                Diagnose Photo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Find My Plant */}
            <Link href="/find-my-plant" className="group bg-[#FDFCF8] p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition">Find My Plant Quiz</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                Take our 6-question quiz to receive personalized recommendations matched to your space.
              </p>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-auto">
                Start Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Local Care Banner */}
      <section className="py-16 bg-[#FDFCF8]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="p-8 sm:p-12 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-5">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">
              Locally Nurtured, Carefully Delivered
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
              Every plant in our catalog is hand-watered and checked for root health before dispatch. Pay upon delivery via cash or UPI.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/plants"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition"
              >
                Shop Available Plants
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
              >
                Contact Nursery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
