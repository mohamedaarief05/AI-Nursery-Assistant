import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { Plant } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bot, Mail, Sun, Droplets, Mountain } from 'lucide-react';
import PlantActionButtons from '@/components/PlantActionButtons';

export const revalidate = 0;

export default async function PlantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const p = await params;
  const supabase = await createClient();

  const { data: plantData, error } = await supabase
    .from('plants')
    .select('*, categories(name)')
    .eq('id', p.id)
    .single();

  if (error || !plantData) {
    notFound();
  }

  const plant = plantData as Plant;
  const isAvailable = plant.availability === 'Available';

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/plants" className="inline-flex items-center text-slate-500 hover:text-green-700 mb-8 transition font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plants
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-1/2 h-80 md:h-auto relative bg-slate-50">
            {plant.image_url ? (
              <img 
                src={plant.image_url} 
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <span className="text-6xl">🪴</span>
              </div>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {plant.availability}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-2 text-green-600 font-semibold tracking-wide uppercase text-sm">
              {plant.categories?.name}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{plant.name}</h1>
            <div className="text-2xl font-bold text-green-700 mb-6">₹{plant.price}</div>
            
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              {plant.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Sun className="w-6 h-6 text-amber-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Sunlight</span>
                <span className="text-slate-800 font-semibold text-sm">{plant.sunlight}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Watering</span>
                <span className="text-slate-800 font-semibold text-sm">{plant.watering}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Mountain className="w-6 h-6 text-stone-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Soil</span>
                <span className="text-slate-800 font-semibold text-sm">{plant.soil}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Basic Care Instructions</h3>
              <p className="text-slate-600 bg-green-50 p-4 rounded-xl border border-green-100">
                {plant.care_instructions}
              </p>
            </div>

            <PlantActionButtons plant={plant} />
          </div>
        </div>
      </div>
    </div>
  );
}
