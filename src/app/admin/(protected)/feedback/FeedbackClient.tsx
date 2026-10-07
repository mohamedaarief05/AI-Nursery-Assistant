'use client';

import { useState } from 'react';
import { FeedbackItem } from '@/lib/feedback-store';
import { Star, MessageSquare, Search, Filter, ThumbsUp, Calendar, User, CheckCircle2 } from 'lucide-react';

export default function FeedbackClient({ initialFeedback }: { initialFeedback: FeedbackItem[] }) {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedback);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Metrics
  const totalCount = feedbackList.length;
  const avgRating = totalCount > 0
    ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / totalCount).toFixed(1)
    : '5.0';
  const fiveStarCount = feedbackList.filter(f => f.rating === 5).length;
  const fiveStarPercent = totalCount > 0 ? Math.round((fiveStarCount / totalCount) * 100) : 100;

  // Filtered List
  const filtered = feedbackList.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = ratingFilter === 'All' || item.rating === Number(ratingFilter);
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesRating && matchesCategory;
  });

  const categories = ['All', 'Website Speed & Ease of Use', 'Plant Doctor AI', 'Plant Catalog & Selection', 'General Experience'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
            <span>Customer Reviews & Feedback</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full border border-emerald-200">
              Live Feed
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time reviews, ratings, and experience feedback submitted by website visitors and customers.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Average Rating */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-800">{avgRating}</span>
              <span className="text-sm text-slate-400 font-bold">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
        </div>

        {/* Total Reviews */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Submissions</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-800">{totalCount}</span>
              <span className="text-xs text-slate-400 font-semibold">Reviews</span>
            </div>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Feed
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* 5-Star Satisfaction */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">5-Star Satisfaction</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-800">{fiveStarPercent}%</span>
              <span className="text-xs text-slate-400 font-semibold">({fiveStarCount} / {totalCount})</span>
            </div>
            <p className="text-xs text-purple-600 font-bold mt-1 flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" /> Customer Approved
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews by keyword, customer name, category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Star Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="Website Speed & Ease of Use">Website Speed</option>
            <option value="Plant Doctor AI">Plant Doctor AI</option>
            <option value="Plant Catalog & Selection">Catalog & Selection</option>
            <option value="General Experience">General</option>
          </select>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm shadow-2xs">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">{item.name}</h3>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> {item.role}
                  </span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Category Tag */}
            <div>
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                {item.category}
              </span>
            </div>

            {/* Feedback Message */}
            <p className="text-sm text-slate-700 italic leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              "{item.feedback}"
            </p>

            {/* Date Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                Customer Feedback
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/80 text-center text-slate-400 space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
            <h4 className="font-extrabold text-base text-slate-700">No customer feedback matching your filter</h4>
            <p className="text-xs text-slate-400">Try changing your search term or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
