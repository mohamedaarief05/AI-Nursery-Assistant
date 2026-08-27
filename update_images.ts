import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const urlMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseKey = keyMatch ? keyMatch[1].trim() : '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const imageMap: Record<string, string> = {
  'Money Plant': 'https://images.unsplash.com/photo-1596521503392-4f3316c02ec5?w=500&q=80',
  'Tomato Plant': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
  'Areca Palm': 'https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=500&q=80',
  'Bougainvillea': 'https://images.unsplash.com/photo-1582294691459-715bd0c1cc52?w=500&q=80',
  'Tulsi (Holy Basil)': 'https://images.unsplash.com/photo-1629853927237-7096c4ce56c7?w=500&q=80',
};

async function updateImages() {
  console.log("Updating plant images...");
  for (const [name, url] of Object.entries(imageMap)) {
    const { error } = await supabase
      .from('plants')
      .update({ image_url: url })
      .eq('name', name);
    
    if (error) {
      console.error(`Error updating ${name}:`, error.message);
    } else {
      console.log(`Updated ${name}`);
    }
  }
  console.log("Finished updating images!");
}

updateImages();
