import Image from 'next/image';
import { Leaf, Sun, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">About AI Nursery</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Growing a greener world, one plant at a time. Discover the story behind our local nursery and our passion for plants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="rounded-3xl overflow-hidden bg-slate-100 h-96 relative">
           {/* Placeholder for nursery image */}
           <img 
            src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80" 
            alt="Inside our nursery"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h2>
          <p className="text-slate-600 mb-4 text-lg">
            What started as a small backyard hobby has grown into a beloved local part-time nursery. We are passionate about helping our community bring nature into their homes and gardens.
          </p>
          <p className="text-slate-600 text-lg">
            Because we operate as a part-time business, our team is small and hands-on. While we might not always be able to answer the phone immediately when our hands are covered in dirt, we have built this platform and our AI Assistant to ensure you can always find the plant information you need.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Quality Plants</h3>
          <p className="text-slate-600">
            We carefully nurture each plant to ensure they are healthy, strong, and ready to thrive in your space.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Care</h3>
          <p className="text-slate-600">
            We provide detailed care instructions and ongoing support so even beginners can have a green thumb.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Modern Support</h3>
          <p className="text-slate-600">
            With our 24/7 AI Nursery Assistant, you can check availability and get care tips anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
