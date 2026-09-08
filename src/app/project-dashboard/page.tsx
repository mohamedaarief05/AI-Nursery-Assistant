import Link from 'next/link';
import { 
  Award, 
  Lightbulb, 
  TestTube, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Bot, 
  Camera, 
  ShoppingBag, 
  Sparkles, 
  FileCheck, 
  BookOpen, 
  Users, 
  Clock, 
  Target 
} from 'lucide-react';

export const metadata = {
  title: 'Project Review Dashboard | AI Nursery Assistant',
  description: 'Central academic review dashboard showcasing the Design Thinking Portfolio and the Prototype & Validation Report for AI Nursery Assistant.',
};

export default function ProjectDashboardPage() {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        
        {/* Header Hero Banner */}
        <header className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 opacity-70" />

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full border border-emerald-200 mb-4">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Academic Project Review Hub • Phase 2 Milestone</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Academic Project Dashboard <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              AI Nursery Assistant
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Welcome to the central project evaluation hub. Access detailed documentation of our human-centered design process and prototype validation report below.
          </p>

          {/* Quick Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-100 text-left">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Milestone Status</span>
              <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Phase 2 Complete
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Methodology</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-600" /> Design Thinking
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Testing Status</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Validation Pending
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Integrity Standard</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero Fabrication
              </span>
            </div>
          </div>
        </header>

        {/* Core Dashboard Modules (The 2 Main Cards) */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Review Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Select a Documentation Section
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MODULE 1: DESIGN THINKING PORTFOLIO */}
            <div className="bg-white p-8 rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Module 01
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                    Design Thinking Portfolio
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    A comprehensive 5-stage documentation of how the AI Nursery Assistant was researched, defined, and conceptualized to solve nursery challenges.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>1. Empathy Research:</strong> Preliminary findings & user pain points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>2. User Personas:</strong> 3 Representative buyer & owner archetypes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>3. Problem Statement:</strong> Core challenge & AI solution opportunity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>4. Ideation:</strong> Evaluated concepts & concept selection rationale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>5. Selected Solution:</strong> Problem-Solution Impact Matrix</span>
                  </div>
                </div>
              </div>

              <Link
                href="/design-thinking"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-md active:scale-98"
              >
                <span>Open Design Thinking Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* MODULE 2: PROTOTYPE & VALIDATION REPORT */}
            <div className="bg-white p-8 rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                    <TestTube className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Module 02
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                    Prototype & Validation Report
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Technical documentation of the 6 working prototype features, 3+ participant testing workflow, feedback table, and before & after improvement slots.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>1. Prototype Overview:</strong> Phase 2 milestone status & architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>2. Testing Method:</strong> 6-step testing workflow & participant tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>3. Features Tested:</strong> 6 fully functional core modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>4. Feedback Table:</strong> Structured input placeholders for trial data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>5. Improvements:</strong> Before & after visual improvement slots</span>
                  </div>
                </div>
              </div>

              <Link
                href="/prototype-validation"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-md active:scale-98"
              >
                <span>Open Validation Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

        {/* Live Functional Prototype Quick Launch Banner */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Live Prototype Features
              </span>
              <h3 className="text-2xl font-black text-white">Test Working Platform Features</h3>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Experience the live Next.js application built during Phase 2 based on the Design Thinking methodology.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/plants"
                className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" /> Catalog
              </Link>
              <Link
                href="/plant-analysis"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700 transition flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" /> Plant Doctor
              </Link>
              <Link
                href="/chat"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700 transition flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" /> AI Chat
              </Link>
              <Link
                href="/find-my-plant"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Quiz
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
