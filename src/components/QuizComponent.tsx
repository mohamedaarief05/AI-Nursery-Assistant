'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plant } from '@/lib/types';
import PlantCard from '@/components/PlantCard';
import { Loader2, RefreshCw } from 'lucide-react';

type Question = {
  id: string;
  question: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    id: 'location',
    question: 'Where will you keep the plant?',
    options: [
      { label: 'Bedroom', value: 'Indoor' },
      { label: 'Living Room', value: 'Indoor' },
      { label: 'Balcony', value: 'Outdoor' },
      { label: 'Garden', value: 'Outdoor' },
      { label: 'Office', value: 'Indoor' },
    ]
  },
  {
    id: 'sunlight',
    question: 'How much sunlight does the location receive?',
    options: [
      { label: 'Low (Indirect/Artificial light)', value: 'Low' },
      { label: 'Medium (Bright indirect light)', value: 'Medium' },
      { label: 'High (Direct sunlight)', value: 'High' },
    ]
  },
  {
    id: 'watering',
    question: 'How often can you water the plant?',
    options: [
      { label: 'Daily', value: 'Daily' },
      { label: 'A few times a week', value: 'A few times' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Rarely (I often forget)', value: 'Rarely' },
    ]
  },
  {
    id: 'type',
    question: 'What type of plant do you prefer?',
    options: [
      { label: 'Flowering', value: 'Flower' },
      { label: 'Indoor', value: 'Indoor' },
      { label: 'Outdoor', value: 'Outdoor' },
      { label: 'Fruit', value: 'Fruit' },
      { label: 'Decorative / Foliage', value: 'Decorative' },
      { label: 'No Preference', value: 'Any' },
    ]
  }
];

export default function QuizComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Plant[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300); // slight delay for better UX
    } else {
      submitQuiz({ ...answers, [questionId]: value });
    }
  };

  const submitQuiz = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    setShowResults(true);

    try {
      const supabase = createClient();
      
      // We will fetch all plants and do filtering in JS for this prototype 
      // since the filtering logic is fuzzy based on the quiz answers.
      const { data } = await supabase.from('plants').select('*, categories(name)');
      
      if (data) {
        let plants = data as Plant[];
        
        // Very basic recommendation algorithm
        // 1. Filter by location/type broadly
        if (finalAnswers.location === 'Indoor' || finalAnswers.type === 'Indoor') {
           // boost indoor plants
        }
        
        // In a real advanced app, we might use embeddings or more complex scoring.
        // Here we just score each plant against the answers.
        const scoredPlants = plants.map(plant => {
          let score = 0;
          const catName = plant.categories?.name?.toLowerCase() || '';
          
          if (finalAnswers.location === 'Indoor' && catName.includes('indoor')) score += 2;
          if (finalAnswers.location === 'Outdoor' && catName.includes('outdoor')) score += 2;
          
          if (plant.sunlight.toLowerCase().includes(finalAnswers.sunlight.toLowerCase())) score += 3;
          if (plant.watering.toLowerCase().includes(finalAnswers.watering.toLowerCase())) score += 3;
          
          if (finalAnswers.type !== 'Any' && catName.includes(finalAnswers.type.toLowerCase())) score += 2;

          return { ...plant, score };
        });

        // Sort by score and take top 3
        const sorted = scoredPlants.sort((a, b) => b.score - a.score).slice(0, 3);
        // Remove the temporary score property
        const topPlants = sorted.map(({ score, ...p }) => p as Plant);
        
        setRecommendations(topPlants);
      }
    } catch (error) {
      console.error(error);
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
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-slate-700">Finding the perfect plants for you...</h2>
          </div>
        ) : (
          <div>
            <div className="text-center mb-12">
              <span className="text-4xl block mb-4">✨</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Recommended for You 🌱</h2>
              <p className="text-slate-600">Based on your answers, we think these plants would thrive in your care.</p>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {recommendations.map(plant => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-8 rounded-2xl border border-slate-100 mb-12">
                <p className="text-slate-600 mb-4">We couldn't find an exact match, but we have many other plants!</p>
              </div>
            )}
            
            <div className="text-center">
              <button 
                onClick={resetQuiz}
                className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-8 flex justify-between items-center text-sm font-medium text-slate-500">
        <span>Question {currentStep + 1} of {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 w-8 rounded-full ${idx <= currentStep ? 'bg-green-500' : 'bg-slate-100'}`}
            />
          ))}
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">{currentQ.question}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(currentQ.id, option.value)}
            className={`p-4 rounded-xl border-2 text-left transition-all hover:border-green-500 hover:bg-green-50 ${
              answers[currentQ.id] === option.value ? 'border-green-500 bg-green-50' : 'border-slate-100'
            }`}
          >
            <span className="font-medium text-slate-700">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
