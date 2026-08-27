import Link from 'next/link';
import { ArrowRight, PhoneOff, Sprout, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <span className="bg-green-200 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            Can't reach us by phone? Get instant answers online.
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6 max-w-4xl tracking-tight">
            Find the Perfect Plant Without Waiting for a Call 🌱
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-10 max-w-2xl opacity-90">
            Check plant availability, prices, and care information instantly with our AI Nursery Assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/plants" 
              className="px-8 py-4 bg-white text-green-800 font-bold rounded-full shadow hover:shadow-md transition text-lg border border-green-200"
            >
              Explore Plants
            </Link>
            <Link 
              href="/chat" 
              className="px-8 py-4 bg-green-700 text-white font-bold rounded-full shadow hover:bg-green-800 hover:shadow-md transition text-lg flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5" />
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* About The Nursery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Welcome to Your Local Green Haven
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We are a passionate local nursery dedicated to helping our community bring the beauty of nature into their homes and gardens. Whether you are looking for vibrant flowers, sturdy indoor plants, or fresh fruit trees, we nurture every plant with care.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              To make your experience even better, we have built this platform. Here, you can browse our entire catalog, check live prices and availability, and even use our 24/7 AI Nursery Assistant to answer any plant-care questions you might have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FDFCF8] p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-700 mx-auto mb-6">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Live Catalog</h3>
              <p className="text-slate-600">
                Browse our real-time inventory to see exactly what plants are in stock before you visit.
              </p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-700 mx-auto mb-6">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">AI Assistant</h3>
              <p className="text-slate-600">
                Ask our smart AI any questions about plant care, sunlight requirements, or watering schedules.
              </p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-700 mx-auto mb-6">
                <PhoneOff className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Easy Enquiries</h3>
              <p className="text-slate-600">
                Send us a direct message for bulk orders or specific plant requests right from the website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-[#FDFCF8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-12">Ready to find your plant?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
             <Link href="/find-my-plant" className="group p-8 bg-white border border-green-100 rounded-2xl hover:border-green-300 hover:shadow-md transition max-w-md w-full">
               <h3 className="text-2xl font-bold text-green-800 mb-2 flex items-center justify-center">
                 Find My Plant <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </h3>
               <p className="text-slate-600">Take a quick quiz to get personalized plant recommendations based on your space and lifestyle.</p>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
