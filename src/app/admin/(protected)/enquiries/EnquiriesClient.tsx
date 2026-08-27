'use client';

import { useState } from 'react';
import { Enquiry } from '@/lib/types';
import { Mail, Phone, Calendar, MessageSquare, Send, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// We must use the browser client for client components
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EnquiriesClient({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    
    // DB update
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update status: ' + error.message);
      // Revert on error
      setEnquiries(enquiries);
    }
  };

  const openReplyModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    // @ts-expect-error
    setReplyText(enquiry.admin_reply || '');
    setIsReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedEnquiry) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from('enquiries')
      .update({ 
        admin_reply: replyText,
        status: 'Contacted'
      })
      .eq('id', selectedEnquiry.id);

    setIsSubmitting(false);

    if (error) {
      alert('Failed to send reply. Did you run the SQL command to add admin_reply? Error: ' + error.message);
      return;
    }

    setEnquiries(enquiries.map(e => 
      e.id === selectedEnquiry.id 
        // @ts-expect-error
        ? { ...e, admin_reply: replyText, status: 'Contacted' } 
        : e
    ));
    
    setIsReplyModalOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Message</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Status & Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-slate-50 transition items-start">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date(enquiry.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{enquiry.customer_name}</div>
                  <div className="text-sm text-slate-500 mt-1 flex flex-col gap-1">
                    <span className="flex items-center"><Phone className="w-3 h-3 mr-1"/> {enquiry.phone}</span>
                    {enquiry.email && <span className="flex items-center"><Mail className="w-3 h-3 mr-1"/> {enquiry.email}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {enquiry.plants?.name && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                        Plant: {enquiry.plants.name}
                      </span>
                    </div>
                  )}
                  <p className="text-slate-600 text-sm mb-2">{enquiry.message}</p>
                  {/* @ts-expect-error */}
                  {enquiry.admin_reply && (
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mt-2">
                      <p className="text-xs font-semibold text-blue-800 mb-1">Your Reply:</p>
                      {/* @ts-expect-error */}
                      <p className="text-sm text-blue-900">{enquiry.admin_reply}</p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-3">
                    <select 
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className={`text-sm rounded-lg px-3 py-1.5 border border-slate-200 font-medium focus:ring-2 focus:ring-slate-200 outline-none ${
                        enquiry.status === 'New' ? 'bg-amber-100 text-amber-800' :
                        enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Completed">Completed</option>
                    </select>
                    
                    <button 
                      onClick={() => openReplyModal(enquiry)}
                      className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Reply
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Reply to {selectedEnquiry.customer_name}</h3>
              <button onClick={() => setIsReplyModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Customer's Message:</p>
                <p className="text-slate-700">{selectedEnquiry.message}</p>
              </div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Reply (will be visible in their profile)
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-32 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
                placeholder="Type your reply here..."
              ></textarea>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsReplyModalOpen(false)}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReply}
                disabled={isSubmitting || !replyText.trim()}
                className="px-4 py-2 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition flex items-center disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
