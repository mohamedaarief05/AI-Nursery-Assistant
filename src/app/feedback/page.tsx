'use client';

import { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle2, Heart, Sparkles, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Customer');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('Website Speed & Ease of Use');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('customer_feedback_list') || '[]');
      const newEntry = {
        id: Date.now(),
        name: name.trim() || 'Anonymous User',
        role,
        rating,
        category,
        feedback: feedback.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      localStorage.setItem('customer_feedback_list', JSON.stringify([newEntry, ...existing]));
    } catch {
      // Local fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-emerald-800 text-xs font-extrabold uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" /> Customer & Tester Reviews
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mb-3">
            Website & Product Feedback Form
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Your feedback helps us continuously make our AI Nursery Assistant smoother, faster, and more helpful for all plant lovers!
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">Thank You for Your Feedback!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                We deeply appreciate your review. Your input directly drives our continuous website speed, plant doctor accuracy, and AI care improvements.
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFeedback('');
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Submit Another Review
              </button>
              <Link
                href="/plants"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <Leaf className="w-4 h-4" /> Explore Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dinesh, Selva Kumar, Prasanth"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    User Category / Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="Customer">Customer / Plant Lover</option>
                    <option value="Nursery Owner">Nursery Owner</option>
                    <option value="Gardening Enthusiast">Gardening Enthusiast</option>
                    <option value="Tester / Reviewer">Tester / Reviewer</option>
                  </select>
                </div>
              </div>

              {/* Review Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Feedback Topic
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Website Speed & Ease of Use">Website Speed & Filter Performance</option>
                  <option value="Plant Catalog & Products">Plant Catalog & Selection</option>
                  <option value="Plant Doctor Diagnosis">Plant Doctor Leaf Photo Analysis</option>
                  <option value="Ask AI Assistant & Care Tips">Ask AI Assistant & Care Instructions</option>
                  <option value="General Suggestion">General Suggestion</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Overall Website Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              {/* Feedback Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Detailed Feedback & Suggestions
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience using the catalog filters, Plant Doctor, Ask AI assistant, or any improvements you'd like to see..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl transition shadow-sm text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Customer Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
