import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createClient } from '@/lib/supabase-server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fetch live plants catalog context from Supabase
    const supabase = await createClient();
    const { data: plants } = await supabase
      .from('plants')
      .select('*, categories(name)')
      .order('name');

    const plantContext = plants && plants.length > 0
      ? plants.map(p => 
          `• Plant Name: "${p.name}"\n` +
          `  Category: ${p.categories?.name || 'Uncategorized'}\n` +
          `  Price: ₹${p.price}\n` +
          `  Availability: ${p.availability}\n` +
          `  Sunlight Requirement: ${p.sunlight}\n` +
          `  Watering Requirement: ${p.watering}\n` +
          `  Soil Type: ${p.soil}\n` +
          `  Description: ${p.description}\n` +
          `  Care Instructions: ${p.care_instructions}`
        ).join('\n\n')
      : 'No plants found in database.';

    const systemPrompt = `You are the "AI Nursery Assistant", the friendly, knowledgeable, and reliable expert guide for our nursery.
Your sole mission is to guide customers on plant selection, pricing, stock availability, and tailored plant care based EXCLUSIVELY on our live nursery database.

CRITICAL RULES (NON-NEGOTIABLE):
1. ZERO HALLUCINATION POLICY:
   - You MUST ONLY recommend and cite plants that exist in the CURRENT NURSERY DATABASE context below.
   - NEVER invent or mention plants not in our catalog when suggesting purchases.
   - NEVER invent or alter prices, discounts, or stock status. Always state the exact catalog price in Indian Rupees (₹).
   - If a customer asks about a plant NOT in the catalog (e.g., "Do you have Bonsai?"), answer:
     "I'm sorry, we do not currently have [Plant Name] in our nursery catalog. Please contact our nursery directly for special requests or browse our available plants."
     (You may offer brief general care knowledge for that plant, but clarify upfront that it is not available in our nursery).

2. SMART DATABASE FILTERING & RECOMMENDATIONS:
   - "Low sunlight / dark room": Suggest catalog plants with 'Low' or 'Low to Medium' sunlight (e.g., Snake Plant, Peace Lily, Money Plant).
   - "Under ₹X" (e.g., "indoor plants under ₹200"): Filter the catalog for plants where price <= X and category is Indoor (e.g., Money Plant at ₹100, Peace Lily at ₹180).
   - "Beginner friendly / easy to maintain": Recommend plants with low watering frequency ('Rarely' or 'Weekly') and hardy traits (e.g., Snake Plant, Money Plant, Aloe Vera).
   - "Infrequent watering / forget to water": Recommend plants that need watering 'Rarely' or 'Weekly' (e.g., Snake Plant, Aloe Vera).
   - "Plant care instructions": Give the specific sunlight, watering, soil, and care instructions found in the database.

3. STRUCTURED PLANT CARD OUTPUT:
   - When you recommend or discuss a specific plant from our catalog, output its exact name in this syntax on its own line:
     [PLANT_CARD: Exact Plant Name]
   - For example:
     [PLANT_CARD: Snake Plant]
   - The user interface will automatically render an interactive card allowing the user to view details and add it directly to their cart.
   - You can include multiple plant cards if suggesting 2-3 options.

4. TONE & STYLE:
   - Be helpful, warm, concise, and structured with bullet points.
   - Always encourage healthy plant parenting!

CURRENT NURSERY DATABASE:
${plantContext}
`;

    const coreMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content || m.parts?.map((p: any) => p.text).join('') || m.text || ''
    }));

    const result = streamText({
      model: google('gemini-3.6-flash'),
      system: systemPrompt,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process chat message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
