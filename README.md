# AI Nursery Assistant 🌱

An AI-powered solution for improving customer support in local nurseries. Built with Next.js, Tailwind CSS, Supabase, and Vercel AI SDK.

## Setup Guide

Follow these steps to run the project locally.

### 1. Install Dependencies
Make sure you are in the project root folder.
\`\`\`bash
npm install
\`\`\`

### 2. Configure Supabase Database
1. Go to [Supabase](https://supabase.com) and create a new project.
2. Go to the SQL Editor in your Supabase dashboard.
3. Open the `supabase_setup.sql` file located in the root of this project.
4. Copy the entire contents of the file, paste it into the Supabase SQL editor, and click "Run". This will create all the required tables, policies, and insert sample plants.

### 3. Configure Environment Variables
1. Rename the `.env.local.example` file to `.env.local` (or create a new `.env.local` file).
2. Get your Supabase URL and Anon Key from the Supabase Project Settings -> API.
3. Get a Google Gemini API Key from Google AI Studio.
4. Update the variables in `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
\`\`\`

### 4. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Accessing the Admin Dashboard
Navigate to \`/admin\` in the app. Since this is a prototype, the dashboard is open, but in a real production environment, you should integrate Supabase Auth to protect these routes.

## AI Immersion Project
This project was built to demonstrate how AI can help small businesses by handling customer queries instantly, reducing missed calls, and providing 24/7 support.
