import { NextRequest, NextResponse } from 'next/server';
import { addFeedback, getAllFeedback } from '@/lib/feedback-store';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const feedbackList = getAllFeedback();
    return NextResponse.json({ feedback: feedbackList });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, role, rating, category, feedback } = await req.json();

    if (!feedback || !feedback.trim()) {
      return NextResponse.json({ error: 'Feedback message is required.' }, { status: 400 });
    }

    // 1. Save to server persistent feedback store
    const saved = addFeedback({
      name: name?.trim() || 'Anonymous Customer',
      role: role || 'Customer',
      rating: Number(rating) || 5,
      category: category || 'General Experience',
      feedback: feedback.trim(),
    });

    // 2. Also log to Supabase enquiries as a sync record
    try {
      await supabase.from('enquiries').insert({
        customer_name: saved.name,
        phone: `${saved.role} | Rating: ${saved.rating}★`,
        email: null,
        message: `[CUSTOMER FEEDBACK - ${saved.category}]\nRating: ${saved.rating}/5 Stars\nReview: "${saved.feedback}"`,
        plant_id: null,
        status: 'New',
      });
    } catch (e) {
      console.warn('Supabase enquiry sync warning:', e);
    }

    return NextResponse.json({ success: true, item: saved });
  } catch (error: any) {
    console.error('Feedback submission error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit feedback' }, { status: 500 });
  }
}
