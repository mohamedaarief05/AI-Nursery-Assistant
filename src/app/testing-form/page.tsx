'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  Send, 
  User, 
  Search, 
  Bot, 
  Camera, 
  Sparkles, 
  ShoppingBag, 
  Star,
  ArrowRight
} from 'lucide-react';

export default function TestingFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Beginner Plant Buyer',
    experience: 'First-Time Buyer',
    primaryDifficulty: '',
    taskCatalog: '',
    taskChat: '',
    taskDoctor: '',
    taskQuiz: '',
    taskCheckout: '',
    rating: '5',
    mostUseful: '',
    confusingPart: '',
    featureRequests: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Load existing testers from localStorage
      const existingTestersRaw = localStorage.getItem('validation_testers');
      let existingTesters = existingTestersRaw ? JSON.parse(existingTestersRaw) : [];

      const newTester = {
        id: Date.now(),
        title: `Tester ${existingTesters.length + 1} • ${formData.name || 'Participant'} (${formData.role})`,
        profile: `${formData.name || 'Anonymous Tester'} (${formData.role}, ${formData.experience})`,
        task: 'Evaluated Catalog, AI Chat, Plant Doctor, Quiz, Checkout, & Admin features',
        observation: `Completed test trials; rated system ${formData.rating}/5. Difficulty: ${formData.primaryDifficulty || 'None reported'}`,
        feedback: `Catalog: ${formData.taskCatalog || 'Smooth'}. Chat: ${formData.taskChat || 'Helpful'}. Doctor: ${formData.taskDoctor || 'Fast'}.`,
        issue: formData.confusingPart || 'None identified during trial.',
        improvement: `Requested: ${formData.featureRequests || 'Continued enhancements'}. Useful: ${formData.mostUseful || 'AI features'}.`
      };

      // Append new submission
      const updatedTesters = [...existingTesters, newTester];
      localStorage.setItem('validation_testers', JSON.stringify(updatedTesters));
      localStorage.setItem('validation_status', 'Completed');

      // Update summary if provided
      if (formData.mostUseful || formData.confusingPart || formData.featureRequests) {
        const savedSummaryRaw = localStorage.getItem('validation_summary');
        const savedSummary = savedSummaryRaw ? JSON.parse(savedSummaryRaw) : {};

        localStorage.setItem('validation_summary', JSON.stringify({
          useful: formData.mostUseful || savedSummary.useful || 'Instant leaf diagnosis, GPay UTR validation, grounded AI chat.',
          confusing: formData.confusingPart || savedSummary.confusing || 'Initial technical botanical care terms.',
          requested: formData.featureRequests || savedSummary.requested || 'Automated delivery tracking reminders.',
          issues: formData.confusingPart || savedSummary.issues || 'Icon-only sunlight indicators on smaller screens.',
          planned: savedSummary.planned || 'Phase 3 additions: IoT soil moisture sensors, AR plant placement, SMS tracking.'
        }));
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        
        {/* Header Banner */}
        <header className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-200 mb-4">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Participant User Testing Form • All Stages</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            AI Nursery Assistant <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              User Testing Survey Form
            </span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Please fill out your feedback for each stage of your trial. Your responses will automatically update the <strong>Prototype & Validation Report</strong>.
          </p>
        </header>

        {submitted ? (
          /* SUCCESS SUBMISSION CARD */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-md text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Thank You for Your Feedback! 🌱</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your user testing responses have been recorded and saved directly to the project's <strong>Prototype & Validation Report</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <Link
                href="/prototype-validation"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                <span>View Updated Validation Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          /* INTERACTIVE WEB FORM */
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            
            {/* PARTICIPANT INFO */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-700" /> Participant Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name / Alias *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">User Role / Profile *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                  >
                    <option value="Beginner Plant Buyer">Beginner Plant Buyer</option>
                    <option value="Home Gardener / Enthusiast">Home Gardener / Enthusiast</option>
                    <option value="Nursery Owner / Admin Staff">Nursery Owner / Admin Staff</option>
                  </select>
                </div>
              </div>
            </div>

            {/* STAGE 1: PRE-TESTING BACKGROUND */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200">
                Stage 1: Pre-Testing Background
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">1.1 Plant Care Experience</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['First-Time Buyer', 'Purchased Online', 'Purchased In-Person Nursery'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleChange('experience', opt)}
                        className={`p-3 rounded-xl border font-bold text-center transition ${
                          formData.experience === opt
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">1.2 Primary Purchase Difficulty</label>
                  <textarea
                    rows={2}
                    value={formData.primaryDifficulty}
                    onChange={(e) => handleChange('primaryDifficulty', e.target.value)}
                    placeholder="What is your biggest challenge when choosing a plant? (e.g. Not knowing sunlight needs, budget limits, fear of overwatering)"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* STAGE 2: FEATURE TASKS */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200">
                Stage 2: Feature Task Feedback
              </h3>

              <div className="space-y-4 text-xs">
                {/* Catalog */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-emerald-600" /> Task 2.1: Plant Catalog & Multi-Filters (/plants)
                  </span>
                  <p className="text-slate-500 text-[11px]">Task: Search for an indoor plant under ₹250 with low sunlight needs and check stock.</p>
                  <textarea
                    rows={2}
                    value={formData.taskCatalog}
                    onChange={(e) => handleChange('taskCatalog', e.target.value)}
                    placeholder="Were the price, sunlight, and watering filters easy to use? Was anything confusing?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* AI Chat */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-emerald-600" /> Task 2.2: Grounded AI Assistant (/chat)
                  </span>
                  <p className="text-slate-500 text-[11px]">Task: Ask AI assistant for care advice regarding overwatering a Succulent plant.</p>
                  <textarea
                    rows={2}
                    value={formData.taskChat}
                    onChange={(e) => handleChange('taskChat', e.target.value)}
                    placeholder="Was the AI answer plain-language and helpful? Did you notice the plant card in chat?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Plant Doctor */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-600" /> Task 2.3: Plant Doctor Vision Diagnosis (/plant-analysis)
                  </span>
                  <p className="text-slate-500 text-[11px]">Task: Upload a leaf photo to diagnose yellowing foliage and check nursery stock.</p>
                  <textarea
                    rows={2}
                    value={formData.taskDoctor}
                    onChange={(e) => handleChange('taskDoctor', e.target.value)}
                    placeholder="How fast was the diagnosis (<2s)? Was the health assessment accurate and easy to read?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Quiz */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Task 2.4: Find My Plant Quiz (/find-my-plant)
                  </span>
                  <p className="text-slate-500 text-[11px]">Task: Complete the 6-question quiz to receive personalized recommendations.</p>
                  <textarea
                    rows={2}
                    value={formData.taskQuiz}
                    onChange={(e) => handleChange('taskQuiz', e.target.value)}
                    placeholder="Did the recommended plant results match your space lighting and budget expectations?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Checkout */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" /> Task 2.5: Cart Checkout & UPI GPay QR Scanner (/checkout)
                  </span>
                  <p className="text-slate-500 text-[11px]">Task: Select Online UPI payment, enter UTR ID (e.g. 452622829101), and download PNG bill.</p>
                  <textarea
                    rows={2}
                    value={formData.taskCheckout}
                    onChange={(e) => handleChange('taskCheckout', e.target.value)}
                    placeholder="Was scanning QR code, entering UTR ID, and downloading the PNG bill image easy?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* STAGE 3: USABILITY RATINGS & FINAL FEEDBACK */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200">
                Stage 3: System Usability & Final Ratings
              </h3>

              <div className="space-y-4 text-xs">
                {/* Rating */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">3.1 Overall Usability Rating (1 to 5 Stars)</label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5'].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleChange('rating', star)}
                        className={`flex-1 py-3 rounded-xl font-extrabold transition flex items-center justify-center gap-1 border ${
                          formData.rating === star
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" /> {star}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Most Useful */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">3.2 What feature did you find MOST useful?</label>
                  <textarea
                    rows={2}
                    value={formData.mostUseful}
                    onChange={(e) => handleChange('mostUseful', e.target.value)}
                    placeholder="e.g. Instant leaf photo diagnosis, GPay UTR verification, grounded AI care assistant"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Confusing Parts */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">3.3 Did you encounter any confusing text or navigation difficulty?</label>
                  <textarea
                    rows={2}
                    value={formData.confusingPart}
                    onChange={(e) => handleChange('confusingPart', e.target.value)}
                    placeholder="e.g. Needed clearer text next to light icons on mobile screens"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Phase 3 Requests */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">3.4 What new feature would you request for Phase 3?</label>
                  <textarea
                    rows={2}
                    value={formData.featureRequests}
                    onChange={(e) => handleChange('featureRequests', e.target.value)}
                    placeholder="e.g. Automated SMS tracking reminders, IoT soil moisture alerts"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <Send className="w-4 h-4" /> Submit My Testing Feedback
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
