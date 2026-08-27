import * as fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';


async function listModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  console.log(data.models?.map(m => m.name));
}

listModels();
