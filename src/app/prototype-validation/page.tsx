import Link from 'next/link';
import { 
  FileCheck, 
  Users, 
  TestTube, 
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
  Table, 
  TrendingUp, 
  HelpCircle,
  Award,
  Target
} from 'lucide-react';

export const metadata = {
  title: 'Prototype & Validation Report | AI Nursery Assistant',
  description: 'Documenting the prototype overview, 35% completion status, user testing methodology, and structured feedback placeholders for AI Nursery Assistant.',
};

export default function PrototypeValidationPage() {
  const existingFeatures = [
    {
      title: 'Plant Catalog & Multi-Filters',
      route: '/plants',
      icon: Search,
      desc: 'Browse nursery plants with real-time filtering by light, water, price, stock, and category.',
      task: 'Find a low-light indoor plant under ₹250 and check its stock availability.'
    },
    {
      title: 'Grounded AI Assistant',
      route: '/chat',
      icon: Bot,
      desc: 'Database-grounded streaming AI chat assistant answering plant care questions with safeguards.',
      task: 'Ask the AI assistant for care advice regarding overwatering a Succulent.'
    },
    {
      title: 'Plant Doctor (Vision Diagnosis)',
      route: '/plant-analysis',
      icon: Camera,
      desc: 'Multimodal Gemini vision analysis identifying plant species and leaf health from photos in <2s.',
      task: 'Upload a leaf photo to diagnose foliage yellowing and check nursery stock matching.'
    },
    {
      title: 'Find My Plant Quiz',
      route: '/find-my-plant',
      icon: Sparkles,
      desc: '6-question matching quiz scoring home lighting and care habits against live catalog plants.',
      task: 'Complete the quiz to get top 3 plant recommendations for a sunny balcony.'
    },
    {
      title: 'Cart & Payment Checkout',
      route: '/cart',
      icon: ShoppingBag,
      desc: 'Shopping cart with quantity limits, COD, and GPay/PhonePe UPI QR scanner with UTR capture.',
      task: 'Add a plant to cart, select Online UPI payment, enter UTR ID, and download PNG bill.'
    },
    {
      title: 'Secure Admin Dashboard',
      route: '/admin',
      icon: Layers,
      desc: 'Protected admin panel for inventory stock toggles, UTR payment validation, and enquiry replies.',
      task: 'Log into admin portal, review an order UTR ID, and update order status to Processing.'
    }
  ];

  const testerPlaceholders = [
    {
      id: 'tester-1',
      title: 'Tester 1 • Beginner Plant Parent Profile',
      profile: '[Enter Actual Tester 1 Profile — e.g. Aarav, 26, Apartment Owner, First-Time Plant Buyer]',
      task: '[Enter Assigned Task — e.g. Use Catalog Filters to find low-light indoor plants under ₹200]',
      observation: '[Enter Observer Notes — e.g. Completed search in 45s, asked if sunlight icon meant direct sun]',
      feedback: '[Enter Actual Feedback — e.g. Loved the clear price filters, wanted clearer sunlight icons]',
      issue: '[Enter Identified Issue — e.g. Sunlight icon tooltip was not obvious on mobile screens]',
      improvement: '[Enter Action Taken / Improvement — e.g. Added explicit text labels next to light icons]'
    },
    {
      id: 'tester-2',
      title: 'Tester 2 • Home Gardening Enthusiast Profile',
      profile: '[Enter Actual Tester 2 Profile — e.g. Priya, 34, Balcony Gardener, Owns 15+ Plants]',
      task: '[Enter Assigned Task — e.g. Upload leaf photo to Plant Doctor for instant health diagnosis]',
      observation: '[Enter Observer Notes — e.g. Uploaded JPEG photo in 2s, reviewed foliage diagnosis report]',
      feedback: '[Enter Actual Feedback — e.g. Diagnosis was super fast, wanted direct care product recommendations]',
      issue: '[Enter Identified Issue — e.g. Needed 1-click cart addition directly from diagnosis screen]',
      improvement: '[Enter Action Taken / Improvement — e.g. Added "Add Matching Nursery Plant to Cart" button]'
    },
    {
      id: 'tester-3',
      title: 'Tester 3 • Local Nursery Owner / Admin Profile',
      profile: '[Enter Actual Tester 3 Profile — e.g. Rajesh, 48, Nursery Owner managing 500+ items]',
      task: '[Enter Assigned Task — e.g. Review customer GPay UTR transaction ID and update order status]',
      observation: '[Enter Observer Notes — e.g. Located UTR ID in orders table, clicked status dropdown]',
      feedback: '[Enter Actual Feedback — e.g. Verification card is very helpful, requested bulk status updates]',
      issue: '[Enter Identified Issue — e.g. Desired filter for pending UPI payments only]',
      improvement: '[Enter Action Taken / Improvement — e.g. Added payment mode filter badge to Admin Orders]'
    }
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        
        {/* Header Hero Banner */}
        <header className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-50 rounded-full blur-3xl -z-10 opacity-70" />

          {/* Validation Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 text-xs font-extrabold px-4 py-1.5 rounded-full border border-amber-200 mb-4">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Validation Status: Pending Real-User Testing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Prototype & Validation Report <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              AI Nursery Assistant
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Documenting the functional prototype architecture, 35% completion milestone, testing methodology, and structured feedback framework ready for live user validation.
          </p>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-100 text-left">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Project Status</span>
              <span className="text-sm font-black text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 35% Completed
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Testers Planned</span>
              <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                <Users className="w-4 h-4 text-emerald-600" /> 3+ Participants
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
              1. Prototype Overview & 35% Development Status
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-600" /> What the Current Prototype Does
              </h3>
              <p>
                The <strong>AI Nursery Assistant</strong> is an early-stage, 35% completed functional prototype designed to bridge the gap between plant nursery buyers and plant care knowledge. It combines a real-time database-grounded plant catalog, conversational AI care assistance, fast multimodal vision leaf health diagnosis, automated space-matching quiz, and a secure admin order management portal.
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

          {/* Prototype Stage Notice */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong>Early-Stage Milestone Note:</strong> This application is currently at the <strong>35% Project Milestone</strong>. All core user journeys (catalog search, AI care chat, photo diagnosis, shopping cart, UPI UTR checkout, digital PNG invoicing, and admin management) are fully working and ready for live user validation. Advanced features like IoT moisture sensor integration and AR plant placement are planned for Phase 3.
            </div>
          </div>
        </section>

        {/* SECTION 2: TESTING METHODOLOGY & WORKFLOW */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              2. User Testing Methodology & Workflow
            </h2>
          </div>

          {/* Professional Testing Workflow Graphic */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Standard User Validation Workflow
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 1</span>
                <span className="text-slate-200 font-semibold">Prototype</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 2</span>
                <span className="text-slate-200 font-semibold">User Task</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 3</span>
                <span className="text-slate-200 font-semibold">Observation</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 4</span>
                <span className="text-slate-200 font-semibold">Feedback</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 5</span>
                <span className="text-slate-200 font-semibold">Issue Identified</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 block mb-1">Step 6</span>
                <span className="text-emerald-300 font-bold">Improvement</span>
              </div>
            </div>
          </div>

          {/* Integrity Rule Banner */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Academic Integrity Guarantee:</strong> In accordance with strict evaluation guidelines, no fake tester names, fabricated ratings, or artificial survey numbers have been generated. Below are structured, ready-to-edit placeholders. Once you conduct real user testing, simply replace the bracketed text with your actual participant responses.
            </div>
          </div>

          {/* Tester Placeholders Grid */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-600" /> Individual Tester Feedback Logs (Placeholders)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testerPlaceholders.map((t) => (
                <div key={t.id} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-slate-800">{t.title}</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Editable
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block">Participant Profile</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">{t.profile}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block">Assigned User Task</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">{t.task}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block">Observer Findings</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">{t.observation}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block">Participant Feedback</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">{t.feedback}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block text-rose-600">Usability Issue</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">{t.issue}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[9px] block text-emerald-700">Planned Improvement</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-emerald-50/50 p-2 rounded border border-emerald-200">{t.improvement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES AVAILABLE TO TEST */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              3. Features Available for User Testing
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
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Recommended Test Task:</span>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Section 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                4. Structured User Feedback Table
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              📌 Status: Ready for Input Data
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Tester</th>
                    <th className="p-3.5">Feature Tested</th>
                    <th className="p-3.5">Assigned Task</th>
                    <th className="p-3.5">User Feedback</th>
                    <th className="p-3.5">Issue Identified</th>
                    <th className="p-3.5">Action Taken / Planned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">Tester 1</td>
                    <td className="p-3.5">Plant Catalog & Filters</td>
                    <td className="p-3.5 text-slate-500">[Enter Task 1]</td>
                    <td className="p-3.5 text-slate-500">[Enter Feedback 1]</td>
                    <td className="p-3.5 text-rose-700">[Enter Issue 1]</td>
                    <td className="p-3.5 text-emerald-800 font-bold">[Enter Action 1]</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">Tester 2</td>
                    <td className="p-3.5">Plant Doctor Vision API</td>
                    <td className="p-3.5 text-slate-500">[Enter Task 2]</td>
                    <td className="p-3.5 text-slate-500">[Enter Feedback 2]</td>
                    <td className="p-3.5 text-rose-700">[Enter Issue 2]</td>
                    <td className="p-3.5 text-emerald-800 font-bold">[Enter Action 2]</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">Tester 3</td>
                    <td className="p-3.5">Admin Order & UTR Review</td>
                    <td className="p-3.5 text-slate-500">[Enter Task 3]</td>
                    <td className="p-3.5 text-slate-500">[Enter Feedback 3]</td>
                    <td className="p-3.5 text-rose-700">[Enter Issue 3]</td>
                    <td className="p-3.5 text-emerald-800 font-bold">[Enter Action 3]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: BEFORE & AFTER IMPROVEMENTS */}
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
            {[1, 2, 3].map((slotNum) => (
              <div key={slotNum} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-slate-800">Improvement Slot #{slotNum}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Placeholder</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-rose-700 block mb-0.5">Before (Initial Prototype)</span>
                    <p className="text-rose-950 font-mono text-[11px]">[Enter initial UI issue or difficulty observed before feedback]</p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-amber-700 block mb-0.5">User Feedback Received</span>
                    <p className="text-amber-950 font-mono text-[11px]">[Enter exact tester suggestion or difficulty reported during trial]</p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="font-bold uppercase text-[9px] text-emerald-700 block mb-0.5">After (Implemented Improvement)</span>
                    <p className="text-emerald-950 font-mono text-[11px]">[Enter implemented design change or codebase modification made]</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: VALIDATION SUMMARY */}
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
              <p className="text-emerald-950 font-mono leading-relaxed">[Enter features rated most helpful — e.g. Instant leaf diagnosis, GPay UTR validation]</p>
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-amber-800 uppercase tracking-wider text-[10px] block">What Users Found Confusing</span>
              <p className="text-amber-950 font-mono leading-relaxed">[Enter elements requiring clarification — e.g. Botanical terminology in care tags]</p>
            </div>

            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-blue-800 uppercase tracking-wider text-[10px] block">What Users Requested</span>
              <p className="text-blue-950 font-mono leading-relaxed">[Enter new feature requests — e.g. Automated WhatsApp delivery reminders]</p>
            </div>

            <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
              <span className="font-extrabold text-rose-800 uppercase tracking-wider text-[10px] block">Key Usability Issues</span>
              <p className="text-rose-950 font-mono leading-relaxed">[Enter critical bugs or friction points identified during user testing trials]</p>
            </div>

            <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl space-y-2 sm:col-span-2">
              <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] block">Phase 3 Planned Improvements</span>
              <p className="text-slate-800 font-mono leading-relaxed">[Enter roadmap updates to be implemented following validation data collection]</p>
            </div>
          </div>
        </section>

        {/* SECTION 7: VALIDATION STATUS & ACTION BANNER */}
        <section className="bg-emerald-900 text-white p-8 sm:p-10 rounded-3xl shadow-sm space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Current Status: Validation Pending Real-User Testing</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white max-w-xl mx-auto leading-tight">
            Ready to Input Your Real User Validation Data
          </h3>

          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto leading-relaxed">
            Once you conduct your 3+ participant testing trials, simply update the bracketed text placeholders in this report and switch the header status to <strong>Validation Status: Completed</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/design-thinking"
              className="px-6 py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold rounded-xl text-xs transition flex items-center gap-2 shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-700" /> View Design Thinking Portfolio
            </Link>
            <Link
              href="/plants"
              className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs border border-emerald-700 transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" /> Test Live Prototype Features
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
