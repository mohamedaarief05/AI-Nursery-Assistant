import QuizComponent from '@/components/QuizComponent';

export default function FindMyPlantPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Find My Plant</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Not sure which plant is right for you? Answer a few quick questions about your space and lifestyle, and we'll recommend the perfect green companions.
        </p>
      </div>

      <QuizComponent />
    </div>
  );
}
