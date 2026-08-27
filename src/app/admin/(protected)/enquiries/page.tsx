import { createClient } from '@/lib/supabase-server';
import { Enquiry } from '@/lib/types';
import EnquiriesClient from './EnquiriesClient';

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('enquiries').select('*, plants(name)').order('created_at', { ascending: false });
  const enquiries = (data as Enquiry[]) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Customer Enquiries</h1>
      <EnquiriesClient initialEnquiries={enquiries} />
    </div>
  );
}
