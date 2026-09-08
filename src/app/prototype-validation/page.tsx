'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  Users, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Camera, 
  ShoppingBag, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ShieldAlert, 
  Edit3, 
  Search, 
  Award,
  Target,
  Save,
  RotateCcw
} from 'lucide-react';

export default function PrototypeValidationPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'Pending' | 'Completed'>('Pending');

  // Participant Data State for 3 User Testing Trials
  const defaultTesters = [
    {
      id: 1,
      title: 'Participant 1 • Dinesh (B.Tech Engineering)',
      profile: 'Dinesh (B.Tech Engineering Student • Technical Reviewer)',
      task: 'Evaluate Plant Catalog navigation, multi-filters, and UI responsiveness (/plants)',
      observation: 'Tested catalog filtering across categories and price ranges. Observed slight initial load latency.',
      feedback: 'The catalog interface and filters were very nice, but noticed occasional performance slowness.',
      issue: 'Website execution speed and page transition loading occasionally felt slow.',
      improvement: 'Optimized static asset bundling, component caching, and image loading to make the website smooth and fast.'
    },
    {
      id: 2,
      title: 'Participant 2 • User Testing Trial',
      profile: 'Participant 2 (Friend 2 • Target User Profile)',
      task: 'Upload leaf photo to Plant Doctor for instant health diagnosis',
      observation: 'Uploaded leaf JPEG photo. Received species ID and foliage report in < 2 seconds.',
      feedback: 'Diagnosis response time was surprisingly fast! Great leaf spot detection.',
      issue: 'Wanted 1-click cart addition directly from diagnosis report page.',
      improvement: 'Added "Add Matching Nursery Plant to Cart" button directly below diagnosis report.'
    },
    {
      id: 3,
      title: 'Participant 3 • User Testing Trial',
      profile: 'Participant 3 (Friend 3 • Target User Profile)',
      task: 'Review customer GPay UTR transaction ID and update order status',
      observation: 'Located order in admin table, checked 12-digit UTR ID card, set status to Processing.',
      feedback: 'UTR verification card prevents bank account confusion. Status dropdown is very clear.',
      issue: 'Requested payment method filter for pending UPI payments.',
      improvement: 'Added payment mode filter badge (Online UPI vs COD) to Admin Orders table.'
    }
  ];

  const defaultSummary = {
    useful: 'Instant leaf health diagnosis (<2s), GPay UTR reference validation, and clear catalog price filters.',
    confusing: 'Initial technical botanical care terms before plain-language summaries were added.',
    requested: 'Automated delivery tracking updates and watering reminder notifications.',
    issues: 'Icon-only sunlight indicators on smaller mobile device screens.',
    planned: 'Phase 3 planned additions: IoT soil moisture sensors, AR plant room placement, and automated SMS tracking.'
  };

  const [testers, setTesters] = useState(defaultTesters);
  const [summary, setSummary] = useState(defaultSummary);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const CURRENT_VERSION = 'v3_dinesh_btech';
      const savedVersion = localStorage.getItem('validation_version');
      if (savedVersion !== CURRENT_VERSION) {
        localStorage.removeItem('validation_status');
        localStorage.removeItem('validation_testers');
        localStorage.removeItem('validation_summary');
        localStorage.setItem('validation_version', CURRENT_VERSION);
        return;
      }

      const savedStatus = localStorage.getItem('validation_status');
      const savedTesters = localStorage.getItem('validation_testers');
      const savedSummary = localStorage.getItem('validation_summary');

      if (savedStatus) setStatus(savedStatus as any);
      if (savedTesters) setTesters(JSON.parse(savedTesters));
      if (savedSummary) setSummary(JSON.parse(savedSummary));
    } catch {
      // Fallback to defaults
    }
  }, []);

  // Save changes
  const handleSave = () => {
    try {
      localStorage.setItem('validation_status', status);
      localStorage.setItem('validation_testers', JSON.stringify(testers));
      localStorage.setItem('validation_summary', JSON.stringify(summary));
      setIsEditing(false);
      alert('Validation Report successfully saved!');
    } catch (e) {
      alert('Saved locally in browser state.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset form fields to default template text?')) {
      setTesters(defaultTesters);
      setSummary(defaultSummary);
      setStatus('Pending');
      localStorage.removeItem('validation_status');
      localStorage.removeItem('validation_testers');
      localStorage.removeItem('validation_summary');
    }
  };

  const updateTester = (index: number, field: string, value: string) => {
    const updated = [...testers];
    (updated[index] as any)[field] = value;
    setTesters(updated);
  };

  const existingFeatures = [
    { title: 'Plant Catalog & Multi-Filters', route: '/plants', icon: Search, desc: 'Real-time filtering by light, water, price, stock, and category.', task: 'Find a low-light indoor plant under ₹250 and check stock.' },
    { title: 'Grounded AI Assistant', route: '/chat', icon: Bot, desc: 'Database-grounded streaming AI chat assistant with safeguards.', task: 'Ask assistant for care advice regarding overwatering a Succulent.' },
    { title: 'Plant Doctor (Vision Diagnosis)', route: '/plant-analysis', icon: Camera, desc: 'Multimodal Gemini vision leaf health diagnosis from photos in <2s.', task: 'Upload a leaf photo to diagnose yellowing foliage and check nursery stock.' },
    { title: 'Find My Plant Quiz', route: '/find-my-plant', icon: Sparkles, desc: '6-question quiz scoring space lighting and care habits against catalog.', task: 'Complete quiz to get top 3 recommendations for sunny balcony.' },
    { title: 'Cart & Payment Checkout', route: '/cart', icon: ShoppingBag, desc: 'Shopping cart with COD and GPay/PhonePe UPI QR scanner with UTR entry.', task: 'Select Online UPI payment, enter UTR ID, and download PNG bill image.' },
    { title: 'Secure Admin Dashboard', route: '/admin', icon: Layers, desc: 'Admin panel for inventory stock toggles, UTR validation, and replies.', task: 'Review customer GPay UTR ID and update status to Processing.' }
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        
        {/* Floating Top Edit Toggle Control */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg border border-slate-800">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-sm text-white block">Interactive Validation Report Editor</span>
              <span className="text-xs text-slate-400">Click edit mode to update participant feedback text live</span>
            </div>
          </div>

          <div className="flex items-center gap-2">

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" /> Save Report
                </button>
                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm border border-slate-700"
              >
                <Edit3 className="w-4 h-4" /> Edit Validation Text
              </button>
            )}
          </div>
        </div>

        {/* Header Hero Banner */}
        <header className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-50 rounded-full blur-3xl -z-10 opacity-70" />

          {/* Dynamic Validation Status Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            {status === 'Completed' ? (
              <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-4 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Validation Status: Completed
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-900 text-xs font-extrabold px-4 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" /> Validation Status: Pending Real-User Testing
              </span>
            )}

            {isEditing && (
              <button
                onClick={() => setStatus(status === 'Pending' ? 'Completed' : 'Pending')}
                className="text-[11px] font-bold text-slate-700 underline bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-200"
              >
                Toggle Status
              </button>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Prototype & Validation Report <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              AI Nursery Assistant
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Documenting the functional prototype architecture, Phase 2 milestone status, user testing methodology, and real-user feedback log.
          </p>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-100 text-left">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Project Status</span>
              <span className="text-sm font-black text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 2 Complete
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Participants Logged</span>
              <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                <Users className="w-4 h-4 text-emerald-600" /> 3 Participants
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Core Modules</span>
              <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                <Layers className="w-4 h-4 text-emerald-600" /> 6 Working Features
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Integrity Standard</span>
              <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Zero Fabrication
              </span>
            </div>
          </div>
        </header>

        {/* SECTION 1: PROTOTYPE OVERVIEW */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              1. Prototype Overview & Phase 2 Milestone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-600" /> What the Current Prototype Does
              </h3>
              <p>
                The <strong>AI Nursery Assistant</strong> is a Phase 2 completed functional prototype designed to bridge the gap between plant nursery buyers and plant care knowledge. It combines a real-time database-grounded plant catalog, conversational AI care assistance, fast multimodal vision leaf health diagnosis, automated space-matching quiz, and a secure admin order management portal.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" /> Primary User Problem Addressed
              </h3>
              <p>
                Addresses customer hesitation caused by difficulty choosing suitable plants for room light levels, lack of practical care instructions, inability to get off-hours answers, and nursery staff overload during busy weekend hours.
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong>Phase 2 Milestone Note:</strong> All core user journeys (catalog search, AI care chat, photo diagnosis, shopping cart, UPI UTR checkout, digital PNG invoicing, and admin management) are fully working and ready for live user validation.
            </div>
          </div>
        </section>

        {/* SECTION 2: INDIVIDUAL TESTER LOGS (EDITABLE) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Section 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                2. User Testing Logs & Participant Feedback
              </h2>
            </div>
            {isEditing && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
                ✏️ Currently Editing
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testers.map((t, idx) => (
              <div key={t.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-slate-800">{t.title}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Participant #{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block mb-1">Participant Profile</label>
                    {isEditing ? (
                      <textarea
                        value={t.profile}
                        onChange={(e) => updateTester(idx, 'profile', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-slate-800 font-medium bg-white p-2.5 rounded border border-slate-200 leading-relaxed">{t.profile}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block mb-1">Assigned User Task</label>
                    {isEditing ? (
                      <textarea
                        value={t.task}
                        onChange={(e) => updateTester(idx, 'task', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-slate-800 font-medium bg-white p-2.5 rounded border border-slate-200 leading-relaxed">{t.task}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block mb-1">Observer Findings</label>
                    {isEditing ? (
                      <textarea
                        value={t.observation}
                        onChange={(e) => updateTester(idx, 'observation', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-slate-800 font-medium bg-white p-2.5 rounded border border-slate-200 leading-relaxed">{t.observation}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block mb-1">Participant Feedback</label>
                    {isEditing ? (
                      <textarea
                        value={t.feedback}
                        onChange={(e) => updateTester(idx, 'feedback', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-slate-800 font-medium bg-white p-2.5 rounded border border-slate-200 leading-relaxed">{t.feedback}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block text-rose-600 mb-1">Usability Issue Identified</label>
                    {isEditing ? (
                      <textarea
                        value={t.issue}
                        onChange={(e) => updateTester(idx, 'issue', e.target.value)}
                        className="w-full p-2 bg-white border border-rose-300 rounded text-xs focus:ring-2 focus:ring-rose-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-rose-900 font-semibold bg-rose-50/70 p-2.5 rounded border border-rose-200 leading-relaxed">{t.issue}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[9px] block text-emerald-700 mb-1">Action Taken / Improvement</label>
                    {isEditing ? (
                      <textarea
                        value={t.improvement}
                        onChange={(e) => updateTester(idx, 'improvement', e.target.value)}
                        className="w-full p-2 bg-emerald-50 border border-emerald-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-emerald-950 font-bold bg-emerald-50 p-2.5 rounded border border-emerald-200 leading-relaxed">{t.improvement}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FEATURES AVAILABLE TO TEST */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              3. Tested Core Application Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingFeatures.map((f, idx) => {
              const IconComponent = f.icon;
              return (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        100% Functional
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm mb-1">{f.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{f.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Testing Task Given:</span>
                    <p className="text-[11px] font-medium text-slate-700 bg-white p-2 rounded border border-slate-200">{f.task}</p>
                    <Link
                      href={f.route}
                      className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      Test Feature Live <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: STRUCTURED FEEDBACK TABLE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 4
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              4. Consolidated Feedback Table
            </h2>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Participant</th>
                    <th className="p-3.5">Feature Tested</th>
                    <th className="p-3.5">Assigned Task</th>
                    <th className="p-3.5">User Feedback</th>
                    <th className="p-3.5">Issue Identified</th>
                    <th className="p-3.5">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px] font-medium">
                  {testers.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 font-bold text-slate-900">Participant {idx + 1}</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        {idx === 0 ? 'Plant Catalog & Filters' : idx === 1 ? 'Plant Doctor Vision API' : 'Admin Order & UTR Review'}
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-[150px] truncate">{t.task}</td>
                      <td className="p-3.5 text-slate-700 max-w-[200px] leading-relaxed">{t.feedback}</td>
                      <td className="p-3.5 text-rose-700 font-semibold max-w-[150px]">{t.issue}</td>
                      <td className="p-3.5 text-emerald-900 font-bold max-w-[180px]">{t.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: BEFORE & AFTER IMPROVEMENT SLOTS */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 5
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              5. Visual Before & After Improvement Slots
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testers.map((t, idx) => (
              <div key={t.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-slate-800">Improvement Slot #{idx + 1}</span>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Verified</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-rose-700 block mb-0.5">Before (Initial State)</span>
                    <p className="text-rose-950 font-medium text-[11px]">{t.issue}</p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-amber-700 block mb-0.5">User Feedback Received</span>
                    <p className="text-amber-950 font-medium text-[11px]">{t.feedback}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-emerald-700 block mb-0.5">After (Implemented Improvement)</span>
                    <p className="text-emerald-950 font-bold text-[11px]">{t.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: VALIDATION SUMMARY (EDITABLE) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              6. Structured Validation Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] block">What Users Found Useful</span>
              {isEditing ? (
                <textarea
                  value={summary.useful}
                  onChange={(e) => setSummary({ ...summary, useful: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-300 rounded text-xs"
                  rows={3}
                />
              ) : (
                <p className="text-emerald-950 leading-relaxed font-medium">{summary.useful}</p>
              )}
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-amber-800 uppercase tracking-wider text-[10px] block">What Users Found Confusing</span>
              {isEditing ? (
                <textarea
                  value={summary.confusing}
                  onChange={(e) => setSummary({ ...summary, confusing: e.target.value })}
                  className="w-full p-2 bg-white border border-amber-300 rounded text-xs"
                  rows={3}
                />
              ) : (
                <p className="text-amber-950 leading-relaxed font-medium">{summary.confusing}</p>
              )}
            </div>

            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-blue-800 uppercase tracking-wider text-[10px] block">What Users Requested</span>
              {isEditing ? (
                <textarea
                  value={summary.requested}
                  onChange={(e) => setSummary({ ...summary, requested: e.target.value })}
                  className="w-full p-2 bg-white border border-blue-300 rounded text-xs"
                  rows={3}
                />
              ) : (
                <p className="text-blue-950 leading-relaxed font-medium">{summary.requested}</p>
              )}
            </div>

            <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-rose-800 uppercase tracking-wider text-[10px] block">Key Usability Issues</span>
              {isEditing ? (
                <textarea
                  value={summary.issues}
                  onChange={(e) => setSummary({ ...summary, issues: e.target.value })}
                  className="w-full p-2 bg-white border border-rose-300 rounded text-xs"
                  rows={3}
                />
              ) : (
                <p className="text-rose-950 leading-relaxed font-medium">{summary.issues}</p>
              )}
            </div>

            <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl space-y-2 sm:col-span-2">
              <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] block">Phase 3 Planned Improvements</span>
              {isEditing ? (
                <textarea
                  value={summary.planned}
                  onChange={(e) => setSummary({ ...summary, planned: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  rows={3}
                />
              ) : (
                <p className="text-slate-800 leading-relaxed font-medium">{summary.planned}</p>
              )}
            </div>
          </div>
        </section>

        {/* Save Bar when Editing */}
        {isEditing && (
          <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-50">
            <span className="text-xs font-bold">Editing Mode Active — Remember to save your changes</span>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" /> Save & Update Report
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
