'use client';

import { Printer, Download, FileText } from 'lucide-react';

export default function PrintableValidationForm() {
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Print Trigger Button (Hidden when printing) */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          <div>
            <span className="font-extrabold text-sm text-emerald-950 block">Official Participant Testing Questionnaire (PDF Form)</span>
            <span className="text-xs text-emerald-800">Print or save as PDF for participants to fill out during testing trials</span>
          </div>
        </div>

        <button
          onClick={handlePrintPDF}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl transition shadow-md flex items-center gap-2 text-xs whitespace-nowrap"
        >
          <Printer className="w-4 h-4" /> Download / Print PDF Form
        </button>
      </div>

      {/* PRINTABLE PDF FORM CONTENT (Visible in print mode & preview) */}
      <div className="hidden print:block bg-white p-8 border border-slate-300 rounded-2xl space-y-8 text-slate-900 font-sans">
        
        {/* PDF Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">AI Nursery Assistant</h1>
            <p className="text-xs font-bold text-slate-600">User Testing & Prototype Validation Questionnaire</p>
          </div>
          <div className="text-right text-xs">
            <span className="font-mono font-bold block">Document Ref: FORM-VAL-2026</span>
            <span className="text-slate-500">Milestone: Phase 2 Prototype</span>
          </div>
        </div>

        {/* Participant Details Block */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded-xl text-xs bg-slate-50">
          <div>
            <span className="font-bold block uppercase text-[10px] text-slate-500">Participant Name:</span>
            <div className="border-b border-slate-400 h-6 mt-1"></div>
          </div>
          <div>
            <span className="font-bold block uppercase text-[10px] text-slate-500">Role / Profile:</span>
            <div className="border-b border-slate-400 h-6 mt-1"></div>
          </div>
          <div>
            <span className="font-bold block uppercase text-[10px] text-slate-500">Testing Date & Time:</span>
            <div className="border-b border-slate-400 h-6 mt-1"></div>
          </div>
          <div>
            <span className="font-bold block uppercase text-[10px] text-slate-500">Evaluator / Observer Signature:</span>
            <div className="border-b border-slate-400 h-6 mt-1"></div>
          </div>
        </div>

        {/* STAGE 1: PRE-TESTING BACKGROUND */}
        <div className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider bg-slate-900 text-white px-3 py-1.5 rounded">
            Stage 1: Pre-Testing Background Questions
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-slate-800">1.1 Have you ever purchased plants online or at a local nursery?</p>
              <div className="flex gap-6 mt-1">
                <span>[  ] Yes, Online</span>
                <span>[  ] Yes, In-Person Nursery</span>
                <span>[  ] No, First-Time Buyer</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-800">1.2 What is your primary challenge when selecting a new plant for home/office?</p>
              <div className="border border-slate-300 h-14 rounded mt-1 p-2"></div>
            </div>
          </div>
        </div>

        {/* STAGE 2: CORE TASK EVALUATIONS */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider bg-slate-900 text-white px-3 py-1.5 rounded">
            Stage 2: Core Task Evaluations (Features 1 to 6)
          </h2>

          {/* Task 1 */}
          <div className="border p-3 rounded-xl space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900">Task 2.1: Plant Catalog & Multi-Filters (/plants)</h3>
            <p className="text-slate-600"><em>Instruction: Find an indoor plant under ₹250 requiring low sunlight and check stock status.</em></p>
            <p className="font-bold">Were the filters (price, sunlight, water, stock) easy to locate and use?</p>
            <div className="border border-slate-300 h-12 rounded p-1"></div>
          </div>

          {/* Task 2 */}
          <div className="border p-3 rounded-xl space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900">Task 2.2: Grounded AI Assistant (/chat)</h3>
            <p className="text-slate-600"><em>Instruction: Ask the assistant for care advice regarding overwatering a Succulent.</em></p>
            <p className="font-bold">Was the AI answer plain-language, clear, and helpful?</p>
            <div className="border border-slate-300 h-12 rounded p-1"></div>
          </div>

          {/* Task 3 */}
          <div className="border p-3 rounded-xl space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900">Task 2.3: Plant Doctor Vision Diagnosis (/plant-analysis)</h3>
            <p className="text-slate-600"><em>Instruction: Upload a leaf photo to diagnose leaf yellowing and check nursery stock.</em></p>
            <p className="font-bold">How fast was the diagnosis response and was the foliage report accurate?</p>
            <div className="border border-slate-300 h-12 rounded p-1"></div>
          </div>

          {/* Task 4 */}
          <div className="border p-3 rounded-xl space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900">Task 2.4: Find My Plant Quiz (/find-my-plant)</h3>
            <p className="text-slate-600"><em>Instruction: Complete the 6-question quiz for balcony recommendations.</em></p>
            <p className="font-bold">Did the recommended plant results match your space and budget expectations?</p>
            <div className="border border-slate-300 h-12 rounded p-1"></div>
          </div>

          {/* Task 5 */}
          <div className="border p-3 rounded-xl space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900">Task 2.5: Cart Checkout & UPI GPay QR UTR Entry (/checkout)</h3>
            <p className="text-slate-600"><em>Instruction: Select Online UPI payment, enter UTR ID, and download PNG bill image.</em></p>
            <p className="font-bold">Was entering the 12-digit UTR ID and downloading the bill image straightforward?</p>
            <div className="border border-slate-300 h-12 rounded p-1"></div>
          </div>
        </div>

        {/* STAGE 3: USABILITY RATINGS & OVERALL FEEDBACK */}
        <div className="space-y-3 page-break-before">
          <h2 className="text-sm font-black uppercase tracking-wider bg-slate-900 text-white px-3 py-1.5 rounded">
            Stage 3: Overall Usability Ratings & Feedback
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold">3.1 System Usability Rating (Scale 1 to 5):</p>
              <div className="flex gap-6 mt-1 font-mono">
                <span>[  ] 1 - Very Difficult</span>
                <span>[  ] 2 - Needs Work</span>
                <span>[  ] 3 - Average</span>
                <span>[  ] 4 - Easy</span>
                <span>[  ] 5 - Excellent</span>
              </div>
            </div>

            <div>
              <p className="font-bold">3.2 What feature did you find MOST useful?</p>
              <div className="border border-slate-300 h-14 rounded p-2"></div>
            </div>

            <div>
              <p className="font-bold">3.3 What part of the system did you find confusing or unclear?</p>
              <div className="border border-slate-300 h-14 rounded p-2"></div>
            </div>

            <div>
              <p className="font-bold">3.4 What new feature or improvement would you request for Phase 3?</p>
              <div className="border border-slate-300 h-14 rounded p-2"></div>
            </div>
          </div>
        </div>

        {/* PDF Footer Signoff */}
        <div className="pt-6 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500">
          <span>AI Nursery Assistant • Official Validation Questionnaire</span>
          <span>Page 1 of 1 • Completed Survey Form</span>
        </div>

      </div>
    </div>
  );
}
