'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plant } from '@/lib/types';
import PlantCard from '@/components/PlantCard';
import { Loader2, RefreshCw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; description: string; value: string }[];
}

const questions: Question[] = [
  {
    id: 'location',
    question: 'Where will your new plant live?',
    subtitle: 'This helps us filter indoor vs outdoor hardy varieties.',
    options: [
      { label: 'Living Room / Bedroom', description: 'Cozy indoor space with ambient room light', value: 'Indoor' },
      { label: 'Home Office / Desk', description: 'Compact indoor space needing low-mess foliage', value: 'Indoor' },
      { label: 'Balcony', description: 'Semi-outdoor with fresh air & natural light', value: 'Outdoor' },
      { label: 'Garden / Terrace', description: 'Direct open sky with plenty of sun and weather', value: 'Outdoor' },
    ]
  },
  {
    id: 'sunlight',
    question: 'How much sunlight does that exact spot receive?',
    subtitle: 'Sunlight is the primary food for your plant.',
    options: [
      { label: 'Low / Indirect Light', description: 'Artificial room lighting, north window, or shade', value: 'Low' },
      { label: 'Medium / Filtered Light', description: 'Bright room with pleasant morning sunlight', value: 'Medium' },
      { label: 'High / Direct Sun', description: 'Unfiltered, hot sun for 4+ hours per day', value: 'High' },
    ]
  },
  {
    id: 'watering',
    question: 'What is your watering routine?',
    subtitle: 'Be honest! We have plants for every watering schedule.',
    options: [
      { label: 'I can water daily', description: 'I love tending to plants every morning', value: 'Daily' },
      { label: 'A few times a week', description: 'I can check on them 2-3 times per week', value: 'few times' },
      { label: 'Once a week', description: 'I prefer weekend-only plant care', value: 'Weekly' },
      { label: 'I often forget (Rarely)', description: 'I need a drought-hardy, indestructible survivor', value: 'Rarely' },
    ]
  },
  {
    id: 'experience',
    question: 'What is your gardening experience?',
    subtitle: 'Beginners get extra forgiving plants with simple care routines.',
    options: [
      { label: 'First-time Plant Parent', description: 'Looking for a forgiving, low-maintenance plant', value: 'Beginner' },
      { label: 'Some Experience', description: 'Comfortable with basic potting and pruning', value: 'Intermediate' },
      { label: 'Green Thumb Expert', description: 'Ready for flowering shrubs or specialty fruit trees', value: 'Expert' },
    ]
  },
  {
    id: 'type',
    question: 'What kind of plant vibe are you looking for?',
    subtitle: 'Pick the style that excites your aesthetic.',
    options: [
      { label: 'Lush Foliage / Air Purifying', description: 'Decorative green leaves that clean the air', value: 'Indoor' },
      { label: 'Vibrant Flowers', description: 'Colorful, fragrant blooms', value: 'Flower' },
      { label: 'Fresh Fruits or Herbs', description: 'Edibles, cooking herbs, or citrus', value: 'Fruit' },
      { label: 'Surprise Me', description: 'Open to any thriving species', value: 'Any' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your target budget?',
    subtitle: 'All plants come directly from our nursery inventory.',
    options: [
      { label: 'Under ₹100', description: 'Affordable starters & hardy staples', value: 'under-100' },
      { label: '₹100 - ₹250', description: 'Mid-range decorative favourites', value: '100-250' },
      { label: 'Above ₹250', description: 'Established plants & premium trees', value: 'above-250' },
      { label: 'Any Budget', description: 'Whatever suits the space best', value: 'any' },
    ]
  }
];

export default function QuizComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{ plant: Plant; matchReasons: string[] }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    } else {
      submitQuiz(updated);
    }
  };

  const submitQuiz = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    setShowResults(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('plants').select('*, categories(name)');
      
      if (error) throw error;
      if (data) {
        const plants = data as Plant[];
        
        // Multi-attribute scoring grounded in live Supabase database
        const scored = plants.map((plant) => {
          let score = 0;
          const matchReasons: string[] = [];
          const cat = plant.categories?.name?.toLowerCase() || '';
          const light = plant.sunlight.toLowerCase();
          const water = plant.watering.toLowerCase();

          // Location match
          if (finalAnswers.location === 'Indoor' && (cat.includes('indoor') || cat.includes('decorative'))) {
            score += 25;
            matchReasons.push('Naturally thrives in indoor environments');
          } else if (finalAnswers.location === 'Outdoor' && (cat.includes('outdoor') || cat.includes('fruit') || cat.includes('vegetable'))) {
            score += 25;
            matchReasons.push('Hardy outdoor growth profile');
          }

          // Sunlight match
          if (finalAnswers.sunlight === 'Low' && (light.includes('low') || light.includes('indirect'))) {
            score += 30;
            matchReasons.push('Ideal for rooms with low or indirect light');
          } else if (finalAnswers.sunlight === 'High' && (light.includes('high') || light.includes('direct'))) {
            score += 30;
            matchReasons.push('Loves direct sunny spots');
          } else if (finalAnswers.sunlight === 'Medium' && (light.includes('medium') || light.includes('moderate'))) {
            score += 25;
            matchReasons.push('Flourishes in medium bright light');
          }

          // Watering match
          if (finalAnswers.watering === 'Rarely' && (water.includes('rarely') || water.includes('weekly'))) {
            score += 25;
            matchReasons.push('Tolerates infrequent watering gracefully');
          } else if (finalAnswers.watering === 'Daily' && water.includes('daily')) {
            score += 25;
            matchReasons.push('Enjoys daily hydration routine');
          } else if (finalAnswers.watering === 'Weekly' && (water.includes('weekly') || water.includes('few times'))) {
            score += 25;
            matchReasons.push('Simple weekly watering schedule');
          }

          // Type match
          if (finalAnswers.type !== 'Any' && cat.includes(finalAnswers.type.toLowerCase())) {
            score += 20;
            matchReasons.push(`Matches your ${finalAnswers.type} plant preference`);
          }

          // Budget match
          if (finalAnswers.budget === 'under-100' && plant.price <= 100) {
            score += 15;
            matchReasons.push(`Pocket-friendly at ₹${plant.price}`);
          } else if (finalAnswers.budget === '100-250' && plant.price >= 100 && plant.price <= 250) {
            score += 15;
            matchReasons.push(`Fits your ₹100-₹250 budget`);
          } else if (finalAnswers.budget === 'above-250' && plant.price >= 250) {
            score += 15;
            matchReasons.push(`Premium mature variety`);
          }

          // Availability boost: in-stock plants prioritized
          if (plant.availability === 'Available') {
            score += 10;
          }

          return { plant, score, matchReasons };
        });

        // Sort descending by score and pick top 3
        const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 3);
        setRecommendations(sorted.map(s => ({ plant: s.plant, matchReasons: s.matchReasons.slice(0, 2) })));
      }
    } catch (err) {
      console.error('Quiz submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  if (showResults) {
    return (
      <div className="w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-800">Scoring Our Nursery Catalog...</h2>
            <p className="text-sm text-slate-500 mt-1">Matching light, watering, and care needs to available plants</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Personalized Matches
              </span>
              <h2 className="text-3xl font-black text-slate-800 mt-2 mb-2">Your Perfect Plant Matches 🌱</h2>
              <p className="text-slate-600 text-sm max-w-lg mx-auto">
                Based on your light conditions, watering schedule, and space, these plants from our nursery will thrive with you.
              </p>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {recommendations.map(({ plant, matchReasons }) => (
                  <div key={plant.id} className="flex flex-col">
                    {matchReasons.length > 0 && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-2xl mb-2 text-xs font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{matchReasons[0]}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <PlantCard plant={plant} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-10 rounded-3xl border border-slate-100 mb-10 shadow-sm">
                <p className="text-slate-600 text-sm mb-4">
                  We could not find an exact match, but our nursery has 15+ other green friends!
                </p>
              </div>
            )}
            
            <div className="text-center">
              <button 
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 hover:border-emerald-300 px-6 py-3 rounded-2xl shadow-2xs transition"
              >
                <RefreshCw className="w-4 h-4" /> Retake Plant Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
      {/* Step Indicator */}
      <div className="mb-6 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span>Question {currentStep + 1} of {questions.length}</span>
        <div className="flex gap-1.5">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 w-7 rounded-full transition-all ${
                idx <= currentStep ? 'bg-emerald-500' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1 tracking-tight">
        {currentQ.question}
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        {currentQ.subtitle}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(currentQ.id, option.value)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              answers[currentQ.id] === option.value 
                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm' 
                : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-800 text-sm">{option.label}</span>
              {answers[currentQ.id] === option.value && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
