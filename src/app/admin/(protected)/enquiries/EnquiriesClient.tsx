'use client';

import { useState } from 'react';
import { Enquiry } from '@/lib/types';
import { Mail, Phone, Calendar, MessageSquare, Send, X, Search, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';

export default function EnquiriesClient({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error: toastError } = useToast();

  const handleStatusChange = async (id: string, newStatus: string) => {
    const previous = [...enquiries];
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus as Enquiry['status'] } : e));
    
    const supabase = createClient();
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      toastError('Failed to update status: ' + error.message);
      setEnquiries(previous);
    } else {
      success(`Enquiry marked as ${newStatus}`);
    }
  };

  const openReplyModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyText(enquiry.admin_reply || '');
    setIsReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedEnquiry) return;
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase
      .from('enquiries')
      .update({ 
        admin_reply: replyText,
        status: 'Contacted'
      })
      .eq('id', selectedEnquiry.id);

    setIsSubmitting(false);

    if (error) {
      toastError('Failed to send reply: ' + error.message);
      return;
    }

    setEnquiries(enquiries.map(e => 
      e.id === selectedEnquiry.id 
        ? { ...e, admin_reply: replyText, status: 'Contacted' as const } 
        : e
    ));
    
    success(`Reply sent to ${selectedEnquiry.customer_name}!`);
    setIsReplyModalOpen(false);
    setSelectedEnquiry(null);
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesStatus = statusFilter === 'All' || enquiry.status === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      enquiry.customer_name?.toLowerCase().includes(query) ||
      enquiry.phone?.toLowerCase().includes(query) ||
      enquiry.email?.toLowerCase().includes(query) ||
      enquiry.message?.toLowerCase().includes(query) ||
      enquiry.plants?.name?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const newCount = enquiries.filter(e => e.status === 'New').length;
  const contactedCount = enquiries.filter(e => e.status === 'Contacted').length;
  const completedCount = enquiries.filter(e => e.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Customer Enquiries</h1>
          <p className="text-slate-500 text-sm mt-1">
            Review customer questions, plant enquiries, and send nursery responses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">New Enquiries</p>
          <p className="text-2xl font-black text-amber-700">{newCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Contacted</p>
          <p className="text-2xl font-black text-blue-700">{contactedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Resolved / Completed</p>
          <p className="text-2xl font-black text-emerald-700">{completedCount}</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search enquiries by name, phone, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            <option value="New">New ({newCount})</option>
            <option value="Contacted">Contacted ({contactedCount})</option>
            <option value="Completed">Completed ({completedCount})</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Message & Reply</th>
                <th className="px-6 py-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-slate-50/60 transition items-start">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{enquiry.customer_name}</div>
                    <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                      <a href={`tel:${enquiry.phone}`} className="flex items-center text-emerald-700 hover:underline">
                        <Phone className="w-3 h-3 mr-1" /> {enquiry.phone}
                      </a>
                      {enquiry.email && (
                        <a href={`mailto:${enquiry.email}`} className="flex items-center text-slate-400 hover:underline">
                          <Mail className="w-3 h-3 mr-1" /> {enquiry.email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {enquiry.plants?.name && (
                      <div className="mb-1.5">
                        <span className="text-[11px] font-bold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                          Plant: {enquiry.plants.name}
                        </span>
                      </div>
                    )}
                    <p className="text-slate-700 text-sm leading-relaxed mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{enquiry.message}"
                    </p>
                    {enquiry.admin_reply && (
                      <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl">
                        <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">Your Sent Reply:</p>
                        <p className="text-sm text-blue-900">{enquiry.admin_reply}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <select 
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                        className={`text-xs rounded-lg px-2.5 py-1.5 border font-bold outline-none ${
                          enquiry.status === 'New' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                      
                      <button 
                        onClick={() => openReplyModal(enquiry)}
                        className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-1.5 px-3 rounded-lg transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        {enquiry.admin_reply ? 'Edit Reply' : 'Send Reply'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-black text-slate-800">Reply to {selectedEnquiry.customer_name}</h3>
              <button onClick={() => setIsReplyModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Customer's Message:</p>
                <p className="text-slate-700 italic font-medium">"{selectedEnquiry.message}"</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Reply (Saved & displayed on customer profile)
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full h-32 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm outline-none resize-none"
                  placeholder="Type your response to the customer here..."
                />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsReplyModalOpen(false)}
                className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReply}
                disabled={isSubmitting || !replyText.trim()}
                className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Sending...' : 'Save & Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
