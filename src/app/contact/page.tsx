import { MapPin, Phone, Clock, Mail, Bot } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';

export default function ContactPage({
  searchParams,
}: {
  searchParams: { plant_id?: string }
}) {
  const plantId = searchParams?.plant_id;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Have a question about our plants or want to make a bulk order? Send us an enquiry or visit our nursery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Nursery Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-800">Address</h3>
                  <p className="text-slate-600">123 Green Valley Road<br />Plant City, PC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-800">Phone & WhatsApp</h3>
                  <p className="text-slate-600">+1 (234) 567-8900</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-800">Email</h3>
                  <p className="text-slate-600">hello@ainursery.example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-800">Opening Hours</h3>
                  <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-2">Unable to reach us by phone?</h2>
            <p className="text-green-700 mb-6">
              Our owner is often busy tending to the plants. Use our AI Assistant to check plant information instantly without waiting!
            </p>
            <Link 
              href="/chat" 
              className="inline-flex items-center bg-green-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-green-700 transition"
            >
              <Bot className="w-5 h-5 mr-2" /> Ask AI Assistant
            </Link>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send an Enquiry</h2>
          <EnquiryForm prefilledPlantId={plantId} />
        </div>
      </div>
    </div>
  );
}
