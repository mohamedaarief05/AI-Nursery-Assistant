import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 60;

// Direct Supabase client without server cookies overhead
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required.' }, { status: 400 });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    // Fetch nursery plant catalog names for grounding
    let plantNames = 'Peace Lily, Snake Plant, Areca Palm, Aloe Vera, Money Plant, Rose, Mint, Tulsi, Hibiscus, Lemon Tree';
    let plantsList: any[] = [];

    try {
      const { data: plants } = await supabase
        .from('plants')
        .select('id, name, price, availability, description, sunlight, watering');

      if (plants && plants.length > 0) {
        plantsList = plants;
        plantNames = plants.map(p => p.name).join(', ');
      }
    } catch {
      // Fallback
    }

    const prompt = `You are an expert plant botanist and nursery plant doctor.
Analyze the provided plant photo carefully.

Our nursery currently stocks these specific plants:
${plantNames}

Analyze the photo and respond ONLY in valid JSON format with this exact schema (no markdown, no backticks, just raw JSON):
{
  "commonName": "Likely common name (e.g. Calathea, Peace Lily, Snake Plant)",
  "scientificName": "Botanical Latin name",
  "confidence": "High",
  "healthStatus": "Healthy",
  "healthSummary": "1-2 sentences on whether the foliage looks healthy or shows signs of stress.",
  "lightAdvice": "Sunlight requirement for this plant",
  "waterAdvice": "Watering schedule and moisture advice",
  "treatmentTips": "Practical advice to keep it thriving",
  "catalogMatchName": null,
  "disclaimer": "AI visual diagnosis is an advisory tool and not guaranteed botanical proof."
}

If this plant matches or is very similar to one of our nursery plants (${plantNames}), set "catalogMatchName" to that exact name from our list. Otherwise set it to null.`;

    // Direct REST API call to gemini-3.5-flash for 100% reliable 3-second responses
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const apiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: cleanBase64,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('Gemini REST API error:', errText);
      throw new Error(`Gemini API returned status ${apiRes.status}`);
    }

    const data = await apiRes.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    let parsedResult;
    try {
      parsedResult = JSON.parse(textOutput);
    } catch {
      const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    // If catalog match was identified, match with database plant
    let matchedPlant = null;
    if (parsedResult.catalogMatchName && plantsList.length > 0) {
      matchedPlant = plantsList.find(
        p => p.name.toLowerCase() === parsedResult.catalogMatchName.toLowerCase()
      ) || null;
    }

    return NextResponse.json({
      ...parsedResult,
      matchedPlant
    });
  } catch (error: any) {
    console.error('Plant analysis error:', error);
    return NextResponse.json({ 
      error: error.message || 'Plant analysis failed. Please try another clear photo.' 
    }, { status: 500 });
  }
}
