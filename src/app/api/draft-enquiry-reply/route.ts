import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 30;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { customerName, message, plantName, tone = 'friendly' } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Customer message is required.' }, { status: 400 });
    }

    // 1. Fetch entire nursery catalog summary so the AI knows real stock, prices, and categories
    let catalogSummary = '';
    try {
      const { data: allPlants } = await supabase
        .from('plants')
        .select('name, price, availability, categories(name), sunlight, watering')
        .order('name');

      if (allPlants && allPlants.length > 0) {
        catalogSummary = allPlants.map(p => 
          `• ${p.name} | Category: ${(p.categories as any)?.name || 'General'} | Price: ₹${p.price} | Stock: ${p.availability}`
        ).join('\n');
      }
    } catch (err) {
      console.warn('Could not fetch plants catalog:', err);
    }

    // 2. Retrieve detailed plant care information if a specific plant was enquired
    let specificPlantDetails = '';
    if (plantName && plantName.trim()) {
      try {
        const { data: plant } = await supabase
          .from('plants')
          .select('name, price, availability, sunlight, watering, soil, care_instructions')
          .ilike('name', `%${plantName.trim()}%`)
          .limit(1)
          .maybeSingle();

        if (plant) {
          specificPlantDetails = `
SPECIFIC ENQUIRED PLANT DETAILS:
- Name: ${plant.name}
- Price: ₹${plant.price}
- Status: ${plant.availability}
- Sunlight: ${plant.sunlight}
- Watering: ${plant.watering}
- Soil: ${plant.soil}
- Care Instructions: ${plant.care_instructions}
`;
        }
      } catch (err) {
        console.warn('Could not fetch plant details:', err);
      }
    }

    const toneDescriptions: Record<string, string> = {
      friendly: 'warm, welcoming, helpful, and pleasant',
      concise: 'direct, clear, and to the point (2 short sentences)',
      expert: 'botanical care expert providing clear, step-by-step guidance on light, water, or soil',
    };

    const selectedToneDesc = toneDescriptions[tone] || toneDescriptions.friendly;

    const prompt = `You are the owner and head botanist of the AI Nursery.
Write a clear, professional, and helpful response to this customer enquiry.

CUSTOMER DETAILS:
- Name: ${customerName || 'Valued Customer'}
- Enquiry / Question: "${message}"
${plantName ? `- Plant Specified: ${plantName}` : ''}
${specificPlantDetails}

LIVE NURSERY CATALOG & STOCK:
${catalogSummary || 'Catalog unavailable'}

DESIRED TONE:
${selectedToneDesc}

CRITICAL RESPONSE RULES:
1. GREETING:
   - Start with a polite greeting using the customer's name, capitalized properly (e.g. "Hello ${customerName ? customerName.charAt(0).toUpperCase() + customerName.slice(1).split(' ')[0] : 'there'},").

2. CLARITY & ACCURACY:
   - Answer the customer's question directly in the very first sentence.
   - If they ask about availability (e.g. fruit plants, indoor plants, flowering plants): Check the live catalog above and state EXACTLY which plants are Available with their price (₹), and mention if any popular matching plants are currently Out of Stock.
   - If they ask about plant care (watering, yellow leaves, pests, sunlight): Provide clear, actionable advice. Use 2-3 short bullet points if explaining multiple steps.
   - NEVER invent plants, prices, or varieties not in our catalog.

3. STRUCTURE & BREVITY:
   - Keep the reply clean, structured, and easy to read (total 2 to 4 sentences or a short bulleted list).
   - Never write messy run-on paragraphs.
   - Always complete every sentence — never end mid-sentence.

4. CLOSING:
   - End with a welcoming closing sentence inviting them to order, visit, or ask more questions.
   - Conclude with:
"- AI Nursery Team"

5. OUTPUT:
   - Output ONLY the finished reply text. Do NOT add quotation marks or JSON.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const apiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('Gemini API error:', errText);
      throw new Error(`Gemini API failed with status ${apiRes.status}`);
    }

    const data = await apiRes.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const replyPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
    const replyText = replyPart?.text?.trim() || '';

    if (!replyText) {
      throw new Error('Gemini returned an empty reply.');
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Draft enquiry reply error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate draft reply.' },
      { status: 500 }
    );
  }
}
