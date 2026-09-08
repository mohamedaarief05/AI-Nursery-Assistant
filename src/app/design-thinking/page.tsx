import Link from 'next/link';
import { 
  Lightbulb, 
  Target, 
  Users, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  ShieldAlert, 
  BookOpen, 
  Bot, 
  Camera, 
  ShoppingBag, 
  Search, 
  TrendingUp,
  FileCheck,
  Layers,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Design Thinking Portfolio | AI Nursery Assistant',
  description: 'Documenting the human-centered research, problem definition, ideation, and AI solution architecture for AI Nursery Assistant.',
};

export default function DesignThinkingPage() {
  const personas = [
    {
      id: 'persona-1',
      tag: 'Persona 1 • Technical & Buyer Reviewer',
      name: 'Dinesh',
      role: 'B.Tech Engineering Student & Plant Buyer',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      avatarIcon: '💻',
      goals: [
        'Filter plant catalog easily by room lighting and price budget',
        'Ensure smooth, fast website execution speed and page transitions'
      ],
      needs: [
        'Multi-criteria catalog filters (low light, under ₹250)',
        'Optimized static asset bundling and fast UI responsiveness'
      ],
      painPoints: [
        'Experienced website execution speed latency during initial page loads',
        'Confusing icon-only care tags on mobile screens without clear text'
      ],
      solutionFit: 'Tested Plant Catalog & Multi-Filters. Website speed bundling was optimized to ensure smooth and fast user interaction.'
    },
    {
      id: 'persona-2',
      tag: 'Persona 2 • Nursery Customer',
      name: 'Selva Kumar',
      role: 'Plant Nursery Customer & Regular Buyer',
      avatarBg: 'bg-blue-100 text-blue-800',
      avatarIcon: '🪴',
      goals: [
        'Diagnose leaf foliage issues quickly using smartphone camera photos',
        'Check nursery stock and purchase matching healthy plants'
      ],
      needs: [
        'Simple, fast photo upload for instant leaf disease diagnosis',
        'Reliable API execution with zero photo processing errors'
      ],
      painPoints: [
        'Website loading speed felt slow during initial navigation',
        'Plant Doctor photo diagnosis tool was not working properly initially'
      ],
      solutionFit: 'Evaluated Plant Doctor Vision API. System overhaul fixed photo upload stability and optimized diagnosis execution speed.'
    },
    {
      id: 'persona-3',
      tag: 'Persona 3 • Business Stakeholder',
      name: 'Prasanth',
      role: 'Local Plant Nursery Owner & Evaluator',
      avatarBg: 'bg-amber-100 text-amber-800',
      avatarIcon: '🏪',
      goals: [
        'Provide 24/7 automated care guidance to nursery customers',
        'Collect online customer reviews and feedback on products & website'
      ],
      needs: [
        'Rich, comprehensive AI plant care advice (sunlight, watering, soil mix)',
        'Dedicated customer review & feedback form on the website'
      ],
      painPoints: [
        'Basic AI answers lacking deep botanical care guidance',
        'No built-in digital customer review channel for nursery visitors'
      ],
      solutionFit: 'Assessed commercial & AI features. Enriched Ask AI care tips knowledge base and planned customer review feedback form channels.'
    }
  ];

  const problemSolutionMatrix = [
    {
      problem: 'Difficulty Identifying Suitable Plants',
      cause: 'Confusion over lighting requirements, balcony vs indoor placement, and budget constraints.',
      solution: 'Multi-Filter Catalog & 6-Question Find My Plant Quiz',
      benefit: 'Confient, accurate plant selection matched to specific home environments.'
    },
    {
      problem: 'Lack of Plant Care Knowledge',
      cause: 'Uncertainty regarding watering schedules, soil types, and sunlight exposure.',
      solution: 'Database-Grounded AI Care Assistant (Gemini 3.6 Flash)',
      benefit: 'Instant 24/7 plain-language care guidance grounded in nursery inventory.'
    },
    {
      problem: 'Uncertainty About Leaf Diseases & Plant Health',
      cause: 'Foliage yellowing, brown spots, or pest concerns without expert botanist access.',
      solution: 'Plant Doctor Multimodal Vision Model (Gemini 3.5 Flash)',
      benefit: 'Instant < 2s photo identification, health diagnosis, and treatment tips.'
    },
    {
      problem: 'Nursery Staff Overload & Delayed Support',
      cause: 'Limited staff availability to answer repetitive questions for multiple visitors simultaneously.',
      solution: 'Automated AI Customer Service & Secure Admin Dashboard',
      benefit: 'Reduced staff workload, faster order processing, and 24/7 customer assistance.'
    }
  ];

  const ideationConcepts = [
    { name: 'Multi-Criteria Catalog Filtering', icon: Search, selected: true, desc: 'Filter plants by light, water, price, and category.' },
    { name: 'Grounded AI Assistant', icon: Bot, selected: true, desc: 'Conversational care guide grounded in nursery stock.' },
    { name: 'Plant Doctor AI Vision', icon: Camera, selected: true, desc: 'Instant photo analysis for species & health diagnosis.' },
    { name: 'Find My Plant Quiz', icon: Sparkles, selected: true, desc: '6-question matching quiz for home spaces.' },
    { name: 'Nursery Admin Portal', icon: Layers, selected: true, desc: 'Stock management, order tracking, and enquiry replies.' },
    { name: 'Static Care Manual (Discarded)', icon: BookOpen, selected: false, desc: 'Static PDF guides lacked interactivity and real-time inventory grounding.' },
    { name: 'Generic Chatbot (Discarded)', icon: HelpCircle, selected: false, desc: 'Un-grounded chatbots produced hallucinations and non-existent plant names.' },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        
        {/* Hero Banner Header */}
        <header className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-50 rounded-full blur-3xl -z-10 opacity-70" />

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-200 mb-4">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Academic Review Portfolio • Phase 2 Milestone Verified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Design Thinking Portfolio <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              AI Nursery Assistant
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Documenting the human-centered research, user persona mapping, problem definition, ideation, and AI solution architecture developed to solve real-world plant retail challenges.
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-100 text-left">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Methodology</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-emerald-600" /> Design Thinking
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Core AI</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-emerald-600" /> Gemini 3.6 & Vision
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Review Progress</span>
              <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Phase 2 Complete
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Status</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Prototype
              </span>
            </div>
          </div>
        </header>

        {/* Visual Design Thinking Journey Timeline */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              5-Stage Design Thinking Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              From User Need to AI Solution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#empathy" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:shadow-md transition flex flex-col group">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3">1</div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">1. Empathize</h3>
              <p className="text-xs text-slate-500 mt-1">Preliminary user findings & pain points.</p>
            </a>

            <a href="#personas" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:shadow-md transition flex flex-col group">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3">2</div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">2. Define Personas</h3>
              <p className="text-xs text-slate-500 mt-1">3 Representative user archetypes.</p>
            </a>

            <a href="#problem" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:shadow-md transition flex flex-col group">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3">3</div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">3. Problem Statement</h3>
              <p className="text-xs text-slate-500 mt-1">Core challenge & solution opportunity.</p>
            </a>

            <a href="#solution" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:shadow-md transition flex flex-col group">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3">4</div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">4. Selected Solution</h3>
              <p className="text-xs text-slate-500 mt-1">AI Nursery Assistant & impact matrix.</p>
            </a>
          </div>
        </section>

        {/* STAGE 1: EMPATHY RESEARCH */}
        <section id="empathy" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Stage 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                Empathy Research & Preliminary Findings
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              📌 Label: Preliminary Domain Findings
            </span>
          </div>

          {/* Research Transparency Notice */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Documentation Standard:</strong> Findings documented below represent <em>Initial Domain Research & Scenario Mapping</em> derived from nursery customer journey analysis. Formal individual interviews and field survey validation are scheduled for Phase 3.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Difficulty Identifying Suitable Plants</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Beginner plant buyers struggle to determine which plants match their specific apartment light levels (low light vs direct sun) and space dimensions, leading to hesitant purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Lack of Practical Plant Care Knowledge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customers experience high plant mortality caused by overwatering or incorrect soil choices. Standard plant tags offer minimal guidance without specific troubleshooting advice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">No Instant Answers Off-Hours</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When customers notice leaf yellowing or brown spots at home, traditional nurseries offer no real-time guidance outside physical store opening hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Nursery Staff Assistance Bottlenecks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nursery owners and staff are frequently occupied with physical inventory care and store operations during weekend hours, leaving little time for 1-on-1 customer guidance.
              </p>
            </div>
          </div>
        </section>

        {/* STAGE 2: USER PERSONAS */}
        <section id="personas" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Stage 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                Representative User Personas
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              📌 Label: Representative Personas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {p.tag}
                  </span>
                  <div className="flex items-center gap-3 mt-3 mb-2">
                    <div className={`w-12 h-12 rounded-2xl ${p.avatarBg} text-xl flex items-center justify-center font-bold`}>
                      {p.avatarIcon}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg leading-tight">{p.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{p.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">Goals</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {p.goals.map((g, i) => <li key={i}>{g}</li>)}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">Needs</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {p.needs.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1 text-rose-600">Pain Points</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {p.painPoints.map((pp, i) => <li key={i}>{pp}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-xs">
                  <span className="font-extrabold text-emerald-900 block mb-0.5">How AI Nursery Helps:</span>
                  <p className="text-emerald-950 leading-relaxed text-[11px]">{p.solutionFit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STAGE 3: DEFINED PROBLEM STATEMENT */}
        <section id="problem" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Stage 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Defined Problem Statement
            </h2>
          </div>

          {/* Highlighted Problem Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-green-900 text-white p-8 rounded-3xl shadow-md text-center space-y-3 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 bg-emerald-800 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
              <Target className="w-3.5 h-3.5 text-emerald-400" /> Core Challenge Defined
            </div>
            <blockquote className="text-lg sm:text-2xl font-black max-w-3xl mx-auto leading-relaxed tracking-tight text-white">
              “Nursery customers often struggle to identify suitable plants, understand plant-care requirements, and get immediate answers to their questions, while nursery staff may not always be available to provide personalized assistance.”
            </blockquote>
          </div>

          {/* Problem Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px] block">Who Experiences It</span>
              <p className="text-slate-700 leading-relaxed">
                First-time apartment buyers, home gardeners, and busy local nursery staff attempting to serve multiple customers at once.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px] block">What Causes It</span>
              <p className="text-slate-700 leading-relaxed">
                Vast botanical diversity, technical jargon on plant labels, and limited 1-on-1 staff availability during peak store hours.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px] block">Why It Matters</span>
              <p className="text-slate-700 leading-relaxed">
                Plant mortality leads to customer dissatisfaction and hesitant repeat sales, while nursery staff waste hours answering repetitive basic questions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px] block">The AI Opportunity</span>
              <p className="text-slate-700 leading-relaxed">
                A 24/7 AI-powered platform providing database-grounded recommendations, photo health diagnosis, and digital ordering.
              </p>
            </div>
          </div>
        </section>

        {/* STAGE 4: IDEATION & CONCEPT EXPLORATION */}
        <section id="ideation" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Stage 4
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Ideation & Concept Exploration
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Evaluated Solution Concepts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideationConcepts.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className={`p-4 rounded-2xl border transition ${
                    item.selected 
                      ? 'bg-emerald-50/70 border-emerald-300' 
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        item.selected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.selected ? 'bg-emerald-700 text-white' : 'bg-slate-300 text-slate-700'
                      }`}>
                        {item.selected ? 'Selected' : 'Evaluated'}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Solution Rationale Banner */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Selected Solution Concept: "AI Nursery Assistant"</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than deploying isolated tools, we selected a unified platform combining <strong>Multi-Filter Catalog Search</strong>, <strong>Find My Plant Diagnostic Quiz</strong>, <strong>Grounded AI Assistant</strong>, and <strong>Plant Doctor AI Vision</strong> backed by a <strong>Secure Admin Portal</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Provides 24/7 instant plant care guidance</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Combines real Supabase inventory with AI models</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reduces staff workload during weekend rush</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Scalable for future IoT & AR enhancements</span>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 5: SELECTED SOLUTION & IMPACT MATRIX */}
        <section id="solution" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Stage 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                Selected Solution & Impact Matrix
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              📌 Label: Planned User Validation
            </span>
          </div>

          {/* Problem -> Solution -> Impact Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">User Problem $\rightarrow$ AI Solution $\rightarrow$ Expected Benefit Matrix</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Identified User Problem</th>
                    <th className="p-4">Root Cause</th>
                    <th className="p-4">AI Nursery Solution</th>
                    <th className="p-4">Expected Impact & Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {problemSolutionMatrix.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-bold text-slate-900">{m.problem}</td>
                      <td className="p-4 text-slate-500">{m.cause}</td>
                      <td className="p-4 text-emerald-800 font-bold">{m.solution}</td>
                      <td className="p-4 text-slate-800 font-semibold">{m.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Feature Links */}
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-sm text-center space-y-6">
            <h3 className="text-2xl font-black text-white">Experience the Implemented Prototype</h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto leading-relaxed">
              Explore the live features built during Phase 2 based on the Design Thinking methodology.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/plants"
                className="px-5 py-3 bg-white text-slate-900 hover:bg-emerald-50 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" /> Plant Catalog & Filters
              </Link>
              <Link
                href="/plant-analysis"
                className="px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs border border-emerald-700 transition flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-emerald-300" /> Plant Doctor Vision
              </Link>
              <Link
                href="/chat"
                className="px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs border border-emerald-700 transition flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4 text-emerald-300" /> Grounded AI Assistant
              </Link>
              <Link
                href="/find-my-plant"
                className="px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs border border-emerald-700 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" /> Find My Plant Quiz
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
