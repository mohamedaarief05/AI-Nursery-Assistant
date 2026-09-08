'use client';

import { useState } from 'react';
import { Camera, Upload, Loader2, Sparkles, Sun, Droplets, HeartPulse, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';

export default function PlantAnalysisPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const { error: toastError, success } = useToast();
  const { addItem } = useCart();

  const sampleImages = [
    {
      name: 'Peace Lily',
      url: '/plants/peace-lily.jpg',
    },
    {
      name: 'Snake Plant',
      url: '/plants/snake-plant.jpg',
    },
    {
      name: 'Rose Flower',
      url: '/plants/rose.jpg',
    }
  ];

  // Canvas image compressor to turn high-res camera photos (5MB+) into lightweight 80KB JPEG payloads for instant Gemini analysis
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback to raw file reader if canvas fails
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toastError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file);
      setImagePreview(compressedDataUrl);
      setMimeType('image/jpeg');
      setAnalysisResult(null);
    } catch {
      toastError('Could not process selected image.');
    }
  };

  const handleSelectSample = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      setMimeType('image/jpeg');
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
        success('Sample plant loaded. Click "Analyze Plant" to run diagnosis.');
      };
      reader.readAsDataURL(blob);
    } catch {
      toastError('Could not load sample image.');
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch('/api/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: mimeType
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Analysis failed.');
      }

      setAnalysisResult(data);
      success(`Identified: ${data.commonName}`);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        toastError('Analysis timed out. Please try again with a clearer photo.');
      } else {
        toastError(err.message || 'Error diagnosing plant photo.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          AI Vision & Diagnostics
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mt-2 mb-2 flex items-center justify-center gap-2">
          <Camera className="w-8 h-8 text-emerald-600" /> Plant Doctor & Identifier
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Snap or upload a photo of your plant. Our Gemini Vision model will identify the species, check for health concerns, and cross-reference our nursery inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload & Controls */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-emerald-600" /> Upload Plant Photo
          </h2>

          <label className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/30 min-h-[220px]">
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Selected plant" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold opacity-0 hover:opacity-100 transition">
                  Click to replace photo
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-3">
                  <Camera className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-700">Click to choose or drag a plant photo</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 5MB</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {/* Sample photos from local nursery collection */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Or test sample plants:</p>
            <div className="grid grid-cols-3 gap-2">
              {sampleImages.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => handleSelectSample(s.url)}
                  className="p-2 border border-slate-200 hover:border-emerald-500 rounded-xl text-left transition bg-slate-50 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                    <img src={s.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 truncate">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!imagePreview || isAnalyzing}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Leaves & Health...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Plant
              </>
            )}
          </button>
        </div>

        {/* Diagnosis & Care Advice Output */}
        <div className="space-y-6">
          {!analysisResult && !isAnalyzing && (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-4 text-slate-400">
                🌱
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-1">Awaiting Plant Photo</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Upload or select a photo on the left to receive botanical identification, health assessment, and nursery availability.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px] space-y-3">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
              <h3 className="text-base font-bold text-slate-800">Examining Botanical Features...</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Analyzing foliage structure, leaf pigments, and matching with our nursery catalog database.
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 animate-in fade-in">
              {/* Species Identification */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Confidence: {analysisResult.confidence || 'High'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-800 mt-1">
                    {analysisResult.commonName}
                  </h3>
                  <p className="text-xs italic text-slate-400 font-serif">
                    {analysisResult.scientificName}
                  </p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                  analysisResult.healthStatus === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>{analysisResult.healthStatus || 'Healthy'}</span>
                </div>
              </div>

              {/* Health Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Health Assessment</h4>
                <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {analysisResult.healthSummary}
                </p>
              </div>

              {/* Care Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100/80">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Sun className="w-3.5 h-3.5 text-amber-600" /> Sunlight
                  </div>
                  <p className="text-slate-600 text-[11px]">{analysisResult.lightAdvice}</p>
                </div>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100/80">
                  <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" /> Watering
                  </div>
                  <p className="text-slate-600 text-[11px]">{analysisResult.waterAdvice}</p>
                </div>
              </div>

              {/* Actionable Tips */}
              {analysisResult.treatmentTips && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Gardening Recommendations</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {analysisResult.treatmentTips}
                  </p>
                </div>
              )}

              {/* In-Stock Nursery Match */}
              {analysisResult.matchedPlant && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Available in Our Nursery Catalog!
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      ₹{analysisResult.matchedPlant.price}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 mb-3">
                    We currently have <strong>{analysisResult.matchedPlant.name}</strong> ready for home delivery.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addItem(analysisResult.matchedPlant, 1)}
                      className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                    <Link
                      href={`/plants/${analysisResult.matchedPlant.id}`}
                      className="px-3 py-2 bg-white text-slate-700 hover:bg-slate-50 border border-emerald-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      View Plant <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Advisory Disclaimer */}
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                ⚠️ {analysisResult.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
