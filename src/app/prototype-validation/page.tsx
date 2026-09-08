'use client';

import { useState, useEffect, useRef } from 'react';
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
  RotateCcw,
  HelpCircle,
  Upload,
  Image as ImageIcon,
  Check,
  FileText,
  Eye,
  Plus,
  X,
  Trash2,
  ExternalLink,
  Download,
  Laptop,
  Smartphone,
  UserCheck,
  MessageSquare,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

interface EvidenceItem {
  id: string;
  category: 'Screenshots' | 'Questionnaires' | 'Photos' | 'Notes';
  title: string;
  description: string;
  date: string;
  dataUrl: string;
}

export default function PrototypeValidationPage() {
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<EvidenceItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetCategoryForUpload, setTargetCategoryForUpload] = useState<'Screenshots' | 'Questionnaires' | 'Photos' | 'Notes'>('Photos');

  // Genuine Real-User Testing Data (3 Verified Testers)
  const realTesters = [
    {
      id: 1,
      name: 'Dinesh',
      profile: 'Student',
      date: '8 September 2026',
      device: 'Laptop',
      deviceIcon: Laptop,
      featuresTested: ['Ask AI', 'Plant Doctor', 'Find My Plant'],
      responses: [
        { q: '1. Was the website easy to understand when you first opened it?', a: 'Yes, the website was easy to understand and had a good overall presentation.' },
        { q: '2. Was it easy to find the plant you were looking for?', a: 'Yes, finding the required plants was straightforward and convenient.' },
        { q: '3. Were the search and filters easy to use?', a: 'Yes, the search and filtering features were easy to use.' },
        { q: '4. Was the AI Plant Assistant useful for answering your questions?', a: 'Yes, the AI Assistant was useful, but the responses sometimes took longer than expected.' },
        { q: '5. Was the Plant Doctor/image analysis feature easy to use?', a: 'Yes, the Plant Doctor feature was easy to use and worked very well.' },
        { q: '6. Were the plant-care recommendations understandable?', a: 'Yes, the recommendations were understandable, although the information could be organized more clearly.' },
        { q: '7. Was the Find My Plant quiz useful?', a: 'Yes, the quiz was useful for finding suitable plant recommendations.' },
        { q: '8. Was navigation between the different sections easy?', a: 'Yes, navigation between the different sections was easy and clear.' },
        { q: '9. Did you experience any problems or confusing parts?', a: 'No major problems were encountered; the overall experience was clear.' },
        { q: '10. What is one improvement you would most like to see?', a: 'I would recommend adding a conversation history feature to Ask AI so users can review their previous interactions.' }
      ],
      keyOpportunities: [
        'Improve the perceived response speed of Ask AI.',
        'Organize plant-care information more clearly.',
        'Consider adding conversation history to Ask AI.'
      ]
    },
    {
      id: 2,
      name: 'Selva Kumar',
      profile: 'Customer',
      date: '8 September 2026',
      device: 'Mobile Phone',
      deviceIcon: Smartphone,
      featuresTested: ['Website Navigation', 'Plant Catalog', 'Ask AI', 'Plant Doctor', 'Find My Plant'],
      responses: [
        { q: '1. Was the website easy to understand when you first opened it?', a: 'Yes, the website was easy to understand and had a good overall presentation.' },
        { q: '2. Was it easy to find the plant you were looking for?', a: 'Yes, finding the required plant was easy.' },
        { q: '3. Were the search and filters easy to use?', a: 'Yes, the search and filtering features were easy to use.' },
        { q: '4. Was the AI Plant Assistant useful for answering your questions?', a: 'Yes, the AI Plant Assistant was very useful for getting plant-related information.' },
        { q: '5. Was the Plant Doctor/image analysis feature easy to use?', a: 'Yes, the Plant Doctor feature was easy to use.' },
        { q: '6. Were the plant-care recommendations understandable?', a: 'Yes, the plant-care recommendations were clear and understandable.' },
        { q: '7. Was the Find My Plant quiz useful?', a: 'Yes, the quiz was useful for finding suitable plants.' },
        { q: '8. Was navigation between the different sections easy?', a: 'Yes, navigation was generally easy.' },
        { q: '9. Did you experience any problems or confusing parts?', a: 'One confusing part was navigating from one section or menu bar to another.' },
        { q: '10. What is one improvement you would most like to see?', a: 'No specific improvement was suggested.' }
      ],
      keyOpportunities: [
        'Improve navigation clarity and make movement between major sections more intuitive.'
      ]
    },
    {
      id: 3,
      name: 'Dinesh Kannan',
      profile: 'Nursery Owner',
      date: '9 September 2026',
      device: 'Laptop',
      deviceIcon: Laptop,
      featuresTested: ['Plant Catalog', 'Ask AI', 'Plant Doctor', 'Find My Plant', 'Admin Dashboard'],
      responses: [
        { q: '1. Was the website easy to understand when you first opened it?', a: 'Yes, the website was easy to understand.' },
        { q: '2. Was it easy to find the plant you were looking for?', a: 'Yes, finding the required plants was easy.' },
        { q: '3. Were the search and filters easy to use?', a: 'Yes, the search and filtering features were easy to use.' },
        { q: '4. Was the AI Plant Assistant useful for answering your questions?', a: 'Yes, the AI Plant Assistant was useful.' },
        { q: '5. Was the Plant Doctor/image analysis feature easy to use?', a: 'Yes, the Plant Doctor was useful for customers and received positive feedback from customers.' },
        { q: '6. Were the plant-care recommendations understandable?', a: 'Yes, the plant-care recommendations were understandable.' },
        { q: '7. Was the Find My Plant quiz useful?', a: 'Yes, the Find My Plant quiz was useful.' },
        { q: '8. Was navigation between the different sections easy?', a: 'Yes, navigation between the different sections was easy.' },
        { q: '9. Did you experience any problems or confusing parts?', a: 'No, no major problems or confusing parts were encountered.' },
        { q: '10. What is one improvement you would most like to see?', a: 'The website could include a dedicated customer feedback feature to collect feedback from customers.' }
      ],
      adminFeedback: 'The Admin Dashboard was very good and easy to understand. The dashboard provides a clear and convenient way for a nursery owner to manage the system.',
      keyFindings: [
        'Overall website was easy to understand.',
        'Plant discovery and filtering were easy to use.',
        'AI Assistant was useful.',
        'Plant Doctor was considered useful for customers.',
        'Find My Plant was useful.',
        'Navigation was easy.',
        'Admin Dashboard was considered good and easy to understand.',
        'A customer feedback feature was suggested.'
      ]
    }
  ];

  // Consolidated Feedback Matrix
  const consolidatedFeedback = [
    {
      feedback: 'Ask AI responses sometimes take longer than expected.',
      opportunity: 'AI interaction can feel slow.',
      enhancement: 'Improve AI response/loading experience.',
      status: 'Future Enhancement'
    },
    {
      feedback: 'Add history in Ask AI.',
      opportunity: 'Users may want to revisit previous conversations.',
      enhancement: 'Add Ask AI conversation history.',
      status: 'Future Enhancement'
    },
    {
      feedback: 'Plant-care information is slightly messy.',
      opportunity: 'Information organization could be clearer.',
      enhancement: 'Improve care-information structure and formatting.',
      status: 'Future Enhancement'
    },
    {
      feedback: 'Navigation between sections can be confusing.',
      opportunity: 'Section navigation could be clearer.',
      enhancement: 'Improve navigation visibility and consistency.',
      status: 'Future Enhancement'
    },
    {
      feedback: 'Add customer feedback functionality.',
      opportunity: 'Nursery owners need a way to collect customer opinions.',
      enhancement: 'Add or enhance a customer feedback mechanism.',
      status: 'Implemented (/feedback page available)'
    },
    {
      feedback: 'Admin Dashboard was good and easy to understand.',
      opportunity: 'Existing dashboard usability was positively validated.',
      enhancement: 'Maintain the current clear dashboard structure.',
      status: 'Validated & Maintained'
    }
  ];

  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);

  useEffect(() => {
    try {
      const savedEvidence = localStorage.getItem('real_validation_evidence');
      if (savedEvidence) setEvidenceList(JSON.parse(savedEvidence));
    } catch {}
  }, []);

  const triggerFileUpload = (cat: 'Screenshots' | 'Questionnaires' | 'Photos' | 'Notes') => {
    setTargetCategoryForUpload(cat);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const newItem: EvidenceItem = {
          id: `ev-${Date.now()}`,
          category: targetCategoryForUpload,
          title: `${targetCategoryForUpload} Log (${file.name})`,
          description: `Uploaded document: ${file.name} (${Math.round(file.size / 1024)} KB)`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          dataUrl: result
        };

        const updated = [newItem, ...evidenceList];
        setEvidenceList(updated);
        try {
          localStorage.setItem('real_validation_evidence', JSON.stringify(updated));
        } catch {}
        setActiveEvidenceModal(newItem);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDeleteEvidence = (id: string) => {
    if (confirm('Remove this evidence item?')) {
      const updated = evidenceList.filter(item => item.id !== id);
      setEvidenceList(updated);
      try {
        localStorage.setItem('real_validation_evidence', JSON.stringify(updated));
      } catch {}
      if (activeEvidenceModal?.id === id) setActiveEvidenceModal(null);
    }
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      {/* Hidden File Input for Evidence Attachment */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.png,.jpg"
        className="hidden"
      />

      <div className="container mx-auto px-4 max-w-5xl space-y-16">

        {/* Page Header & Validation Status */}
        <header className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-50 rounded-full blur-3xl -z-10 opacity-70"></div>

          {/* Validation Status Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs sm:text-sm font-black px-4 py-2 rounded-full border bg-emerald-100 text-emerald-950 border-emerald-300 flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              ✅ REAL-USER VALIDATION COMPLETED (3 / 3 Real Users Tested)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Prototype &amp; Real-User Validation Report <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              AI Nursery Assistant
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Empirical evaluation of usability, plant discovery, AI assistance, and administration through structured testing with genuine participants.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-100 text-left">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Participants</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" /> 3 Real Users Tested
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Testing Period</span>
              <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> 8–9 September 2026
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Academic Standard</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Zero Fabrication
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Technical QA</span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> 42/42 Tests Passed
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
              1. Prototype Architecture &amp; Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-600" /> What the Prototype Does
              </h3>
              <p>
                The <strong>AI Nursery Assistant</strong> is a functional web application designed to bridge the gap between plant nursery buyers and plant care knowledge. It combines a database-grounded catalog, conversational AI assistant, computer vision leaf diagnosis, space-matching quiz, and admin portal.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" /> Real-World Problem Addressed
              </h3>
              <p>
                Solves customer hesitation caused by uncertainty regarding plant light/water needs, lack of instant care guidance, and nursery staff unavailability during busy weekend store hours.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" /> Key Features Evaluated
              </h3>
              <p>
                Tested modules include <strong>Plant Catalog</strong> (`/plants`), <strong>Ask AI Assistant</strong> (`/chat`), <strong>Plant Doctor Vision Diagnosis</strong> (`/plant-analysis`), <strong>Find My Plant Quiz</strong> (`/find-my-plant`), and <strong>Admin Dashboard</strong> (`/admin`).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: TESTING OBJECTIVE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              2. Testing Objective
            </h2>
          </div>

          <div className="p-6 bg-gradient-to-r from-emerald-900 to-green-900 text-white rounded-2xl text-center shadow-sm">
            <p className="text-sm sm:text-base font-bold leading-relaxed max-w-3xl mx-auto">
              “The objective of this validation is to evaluate usability, clarity, usefulness, AI assistance, plant discovery, and overall user experience through testing with at least three real users.”
            </p>
          </div>
        </section>

        {/* SECTION 3: STRUCTURED TESTING TASKS */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              3. Structured Testing Tasks for Participants
            </h2>
            <p className="text-xs text-slate-500 mt-1">Guided protocols performed by each participant during testing trials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Task A</span>
              <h3 className="font-bold text-slate-900 text-xs">Plant Discovery</h3>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Open <code className="text-emerald-700 font-mono">/plants</code></li>
                <li>Search for a plant</li>
                <li>Apply sunlight/price filters</li>
                <li>Find a suitable plant</li>
                <li>Add it to the cart</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Task B</span>
              <h3 className="font-bold text-slate-900 text-xs">AI Assistant</h3>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Open <code className="text-emerald-700 font-mono">/chat</code></li>
                <li>Ask a plant care question</li>
                <li>Ask about sunlight/water</li>
                <li>Evaluate response clarity</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Task C</span>
              <h3 className="font-bold text-slate-900 text-xs">Plant Doctor</h3>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Open <code className="text-emerald-700 font-mono">/plant-analysis</code></li>
                <li>Upload a plant leaf photo</li>
                <li>Review the AI analysis</li>
                <li>Check result clarity</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Task D</span>
              <h3 className="font-bold text-slate-900 text-xs">Find My Plant</h3>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Open <code className="text-emerald-700 font-mono">/find-my-plant</code></li>
                <li>Complete questionnaire</li>
                <li>Review recommended plants</li>
                <li>Evaluate suitability</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Task E</span>
              <h3 className="font-bold text-slate-900 text-xs">Overall Experience</h3>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Navigate through website</li>
                <li>Check mobile/desktop UI</li>
                <li>Provide overall feedback</li>
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 4: REAL-USER VALIDATION RESULTS — INDIVIDUAL TESTERS */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-10">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 4
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              4. Individual Real-User Testing Feedback (3 Testers)
            </h2>
            <p className="text-xs text-slate-500 mt-1">Complete questionnaire responses and findings from genuine user testing sessions.</p>
          </div>

          <div className="space-y-12">
            {realTesters.map((tester) => {
              const DeviceIcon = tester.deviceIcon;
              return (
                <div key={tester.id} className="bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                  
                  {/* Tester Info Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center border border-emerald-200">
                        #{tester.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-slate-900">{tester.name}</h3>
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {tester.profile}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                          <span>📅 Tested: <strong>{tester.date}</strong></span>
                          <span className="flex items-center gap-1">
                            <DeviceIcon className="w-3.5 h-3.5 text-slate-600" /> Device: <strong>{tester.device}</strong>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {tester.featuresTested.map((feat, fIdx) => (
                        <span key={fIdx} className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 10 Questionnaire Responses */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" /> Questionnaire Responses
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {tester.responses.map((item, qIdx) => (
                        <div key={qIdx} className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <p className="font-bold text-slate-800 text-[11px] leading-snug">{item.q}</p>
                          <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            "{item.a}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Highlighted Admin Dashboard Card for Tester 3 */}
                  {tester.adminFeedback && (
                    <div className="bg-amber-50/80 border-2 border-amber-300 p-5 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-amber-700" /> Additional Admin Dashboard Feedback (Nursery Owner Specific)
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                        "{tester.adminFeedback}"
                      </p>
                    </div>
                  )}

                  {/* Key Opportunities / Key Findings */}
                  <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      {tester.keyFindings ? 'Key Findings' : 'Key Improvement Opportunities'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {(tester.keyFindings || tester.keyOpportunities || []).map((opp, oIdx) => (
                        <li key={oIdx} className="bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-950 font-medium flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: REAL-USER VALIDATION SUMMARY TABLE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 5
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              5. Real-User Validation Summary Table
            </h2>
            <p className="text-xs text-slate-500 mt-1">Consolidated findings across all three real-user testing trials.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider font-extrabold border-b border-slate-200 text-[10px]">
                  <th className="p-3.5 rounded-tl-xl">Tester</th>
                  <th className="p-3.5">Profile</th>
                  <th className="p-3.5">Device</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 rounded-tr-xl">Overall Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Dinesh</td>
                  <td className="p-3.5">Student</td>
                  <td className="p-3.5">Laptop</td>
                  <td className="p-3.5 whitespace-nowrap">8 Sep 2026</td>
                  <td className="p-3.5 font-medium">Positive experience with suggestions for Ask AI improvements</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Selva Kumar</td>
                  <td className="p-3.5">Customer</td>
                  <td className="p-3.5">Mobile Phone</td>
                  <td className="p-3.5 whitespace-nowrap">8 Sep 2026</td>
                  <td className="p-3.5 font-medium">Positive experience with minor navigation confusion</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Dinesh Kannan</td>
                  <td className="p-3.5">Nursery Owner</td>
                  <td className="p-3.5">Laptop</td>
                  <td className="p-3.5 whitespace-nowrap">9 Sep 2026</td>
                  <td className="p-3.5 font-medium">Positive experience; Admin Dashboard was easy to understand</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: USER FEEDBACK → IMPROVEMENT OPPORTUNITIES */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Section 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 flex items-center gap-2">
              💡 User Feedback → Improvement Opportunities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Summarizing actual feedback collected from the three real testers, mapping user observations to identified opportunities and future roadmap enhancements.
            </p>
          </div>

          {/* Feedback Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 uppercase tracking-wider font-extrabold border-b border-slate-200 text-[10px]">
                  <th className="p-3.5 rounded-tl-xl w-1/3">User Feedback</th>
                  <th className="p-3.5 w-1/3">Problem / Opportunity</th>
                  <th className="p-3.5 rounded-tr-xl w-1/3">Suggested Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    Ask AI responses sometimes take longer than expected.
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    AI interaction can feel slow.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Improve the loading and response experience of Ask AI.
                    <span className="block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Suggested Improvement / Future Enhancement
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    “Add history in Ask AI.”
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    Users cannot easily review previous conversations.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Add Ask AI conversation history.
                    <span className="block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Suggested Improvement / Future Enhancement
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    Plant-care information could be organized more clearly.
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    Information presentation can be improved.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Improve the structure and formatting of plant-care information.
                    <span className="block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Suggested Improvement / Future Enhancement
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    Navigation between sections can sometimes be confusing.
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    Users may have difficulty moving between major sections.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Make navigation more intuitive and consistent.
                    <span className="block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Suggested Improvement / Future Enhancement
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    Customer feedback was suggested.
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    Nursery owners need a way to collect customer opinions.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Add a dedicated customer feedback feature.
                    <span className="block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Suggested Improvement / Future Enhancement
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900 leading-relaxed">
                    Admin Dashboard was very good and easy to understand.
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed">
                    Existing dashboard usability was positively validated.
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-950 leading-relaxed">
                    Maintain the current clear and simple dashboard structure.
                    <span className="block mt-1 text-[10px] font-extrabold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                      Validated &amp; Maintained
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Validation Insight — What We Learned */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-extrabold text-emerald-900 flex items-center gap-2 uppercase tracking-wider">
              🔄 Validation Insight: What We Learned
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-emerald-950 font-medium">
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Users found the website generally easy to understand.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Plant search and filtering were considered easy to use.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Ask AI was considered useful, with response speed identified as an improvement opportunity.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Plant Doctor was considered useful and easy to use.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Find My Plant was useful for discovering suitable plants.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Navigation was generally positive, although one tester found movement between sections slightly confusing.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>The Nursery Owner found the Admin Dashboard easy to understand.</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>A customer feedback feature was suggested as a future enhancement.</span>
              </li>
            </ul>
          </div>

          {/* Design Thinking Connection */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
              🎯 Design Thinking Connection: How User Feedback Influences the Next Iteration
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The empirical feedback collected during genuine real-user testing directly informs our iterative design cycle. Rather than making speculative assumptions, user observations will be used to prioritize the roadmap for future product iterations:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-800 font-semibold pl-2">
              <li>Ask AI conversation history</li>
              <li>Better Ask AI loading and response experience</li>
              <li>Clearer plant-care information organization</li>
              <li>Improved navigation visibility and consistency between sections</li>
              <li>Dedicated customer feedback functionality</li>
            </ol>
            <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
              Note: The items listed above represent future iteration roadmap priorities based on participant feedback and are not presented as completed features.
            </p>
          </div>

          {/* Final Validation Status Card */}
          <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-700/60 pb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">✅ REAL-USER VALIDATION COMPLETED</h3>
                  <p className="text-xs text-emerald-200 font-medium">3 / 3 Genuine Testers Completed</p>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-emerald-800/80 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-600/60 w-fit">
                Testing Dates: 8–9 September 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed pt-1">
              Real-user testing provided practical feedback from a Student, Customer, and Nursery Owner. The findings identify both validated strengths and opportunities for future iterations.
            </p>
          </div>
        </section>

        {/* SECTION 7: EVIDENCE ATTACHMENT AREA */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Section 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                7. Testing Evidence &amp; Photo Attachments
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Testing Evidence: Supporting screenshots and evidence from the three real-user testing sessions can be attached here.
              </p>
            </div>

            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              {evidenceList.length} Evidence Logs Attached
            </span>
          </div>

          {/* Interactive Category Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-5 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl border border-emerald-200 transition-all text-center space-y-3 flex flex-col items-center justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Tester Screenshots</span>
                <p className="text-[11px] text-slate-500 mt-1">Catalog filter &amp; search completion screenshots.</p>
              </div>
              <button
                onClick={() => triggerFileUpload('Screenshots')}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Screenshot
              </button>
            </div>

            <div className="p-5 bg-blue-50/50 hover:bg-blue-50 rounded-2xl border border-blue-200 transition-all text-center space-y-3 flex flex-col items-center justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Completed Questionnaires</span>
                <p className="text-[11px] text-slate-500 mt-1">Filled 10-question survey responses.</p>
              </div>
              <button
                onClick={() => triggerFileUpload('Questionnaires')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Survey
              </button>
            </div>

            <div className="p-5 bg-purple-50/50 hover:bg-purple-50 rounded-2xl border border-purple-200 transition-all text-center space-y-3 flex flex-col items-center justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Testing Photos &amp; Scans</span>
                <p className="text-[11px] text-slate-500 mt-1">Plant Doctor leaf photo diagnosis session scans.</p>
              </div>
              <button
                onClick={() => triggerFileUpload('Photos')}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Trial Photo
              </button>
            </div>

            <div className="p-5 bg-amber-50/50 hover:bg-amber-50 rounded-2xl border border-amber-200 transition-all text-center space-y-3 flex flex-col items-center justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Testing Dates &amp; Notes</span>
                <p className="text-[11px] text-slate-500 mt-1">Trial schedule dates and observer logs.</p>
              </div>
              <button
                onClick={() => triggerFileUpload('Notes')}
                className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Notes / Log
              </button>
            </div>
          </div>

          {/* Evidence Gallery */}
          {evidenceList.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" /> Evidence Photo Logs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {evidenceList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveEvidenceModal(item)}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer flex flex-col group relative"
                  >
                    <div className="h-36 w-full bg-slate-200 relative overflow-hidden">
                      <img
                        src={item.dataUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md">
                          <Eye className="w-3.5 h-3.5 text-emerald-700" /> View Image
                        </span>
                      </div>
                      <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3.5 flex flex-col flex-grow text-xs space-y-1">
                      <span className="font-extrabold text-slate-800 line-clamp-1">{item.title}</span>
                      <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{item.description}</p>
                      <div className="pt-2 mt-auto flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-400">
                        <span>{item.date}</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          View <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 8: SEPARATED TECHNICAL TESTING & QA SUMMARY */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              Section 8 • Technical Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-center gap-2">
              🔧 Technical Testing &amp; QA
            </h2>
            <p className="text-xs text-slate-400 mt-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700 leading-relaxed">
              <strong>Note:</strong> Technical QA and real-user validation are separate evaluation methods. Technical QA evaluates technical functionality and reliability, while real-user validation evaluates usability and user experience through actual users.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Test Scenarios</span>
              <span className="text-lg font-black text-white">42 Scenarios</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Passed Tests</span>
              <span className="text-lg font-black text-emerald-400">42 / 42 Passed</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Failed Tests</span>
              <span className="text-lg font-black text-emerald-400">0 Failed</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Bugs Discovered / Fixed</span>
              <span className="text-lg font-black text-amber-400">1 Discovered / 1 Fixed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Security &amp; API Key Audit Completed</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Database Operations Tested</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Responsive UI Testing Completed</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Error/Edge-Case Testing Completed</span>
            </div>
          </div>
        </section>

      </div>

      {/* FULL-SCREEN EVIDENCE PHOTO PREVIEW MODAL */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                  {activeEvidenceModal.category} Evidence
                </span>
                <span className="text-xs text-slate-400">{activeEvidenceModal.date}</span>
              </div>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-h-96 flex items-center justify-center">
                <img
                  src={activeEvidenceModal.dataUrl}
                  alt={activeEvidenceModal.title}
                  className="max-h-96 w-auto object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{activeEvidenceModal.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{activeEvidenceModal.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteEvidence(activeEvidenceModal.id)}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Evidence
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={activeEvidenceModal.dataUrl}
                  download={`evidence-${activeEvidenceModal.id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Image
                </a>
                <button
                  onClick={() => setActiveEvidenceModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
