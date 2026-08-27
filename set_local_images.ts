import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const urlMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseKey = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setLocalImages() {
  const { data: plants } = await supabase.from('plants').select('id, name');
  
  if (!plants) return;

  for (const plant of plants) {
    // Convert "Tulsi (Holy Basil)" to "tulsi-holy-basil"
    const slug = plant.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
      
    const localUrl = `/plants/${slug}.jpg`;
    
    await supabase.from('plants').update({ image_url: localUrl }).eq('id', plant.id);
    console.log(`Updated ${plant.name} -> ${localUrl}`);
  }
}

setLocalImages();
