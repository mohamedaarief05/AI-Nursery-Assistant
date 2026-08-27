import { google } from '@ai-sdk/google';
import { streamText, Message } from 'ai';
import { createClient } from '@/lib/supabase-server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("INCOMING MESSAGES:", JSON.stringify(messages, null, 2));

  // Fetch all plants context from Supabase
  const supabase = await createClient();
  const { data: plants } = await supabase.from('plants').select('*, categories(name)');

  const plantContext = plants?.map(p => 
    `- Name: ${p.name}\n  Category: ${p.categories?.name}\n  Price: ₹${p.price}\n  Availability: ${p.availability}\n  Care: Sunlight: ${p.sunlight}, Water: ${p.watering}, Soil: ${p.soil}. ${p.care_instructions}`
  ).join('\n\n') || 'No plants found in database.';

  const systemPrompt = `You are the "AI Nursery Assistant", a helpful, friendly, and professional virtual assistant for a real plant nursery.
Your goal is to answer customer questions about plant availability, prices, varieties, and basic care.

CRITICAL RULES:
1. You MUST ONLY use the plant data provided in the CURRENT NURSERY DATABASE context below.
2. DO NOT invent, guess, or hallucinate plant names, prices, or availability.
3. If a customer asks about a plant NOT in the database, you MUST say: "I'm sorry, I couldn't find that plant in our current nursery catalog. Please contact the nursery for more information."
4. If the price is unavailable or 0, say: "I currently don't have the price information for this plant. Please contact the nursery."
5. Clearly distinguish between information from the nursery database and general plant-care advice. You can give general plant care advice for plants not in the catalog, but clarify it's not currently in stock.
6. When recommending a plant from the database, use this exact format for the plant card placeholder so the UI can render it:
   [PLANT_CARD: Exact Plant Name]
   For example, if you recommend a Rose, include "[PLANT_CARD: Rose]" in your message on its own line.
7. Be concise, warm, and helpful.

CURRENT NURSERY DATABASE:
${plantContext}
`;

  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content || m.parts?.map((p: any) => p.text).join('') || m.text || ''
  }));

  const result = streamText({
    model: google('gemini-3.6-flash'), // 2.5 is deprecated, using 3.6
    system: systemPrompt,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
