# AI Nursery Assistant 🌱🤖

> An AI-powered conversational and vision-assisted retail platform designed to bridge the gap between plant nursery buyers and plant care knowledge. Powered by **Next.js 16**, **Google Gemini 3.6 Flash**, **Supabase PostgreSQL**, and **Vercel Cloud**.

[![Live Production Demo](https://img.shields.io/badge/Vercel-Live_Production_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-nursery.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-Gemini_3.6-emerald?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Database](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

---

## 🔗 Quick Links & Live Demos

- **🌐 Production App**: [https://ai-nursery.vercel.app](https://ai-nursery.vercel.app)
- **📊 Project Review Dashboard**: [https://ai-nursery.vercel.app/project-dashboard](https://ai-nursery.vercel.app/project-dashboard)
- **🎨 Design Thinking Portfolio**: [https://ai-nursery.vercel.app/design-thinking](https://ai-nursery.vercel.app/design-thinking)
- **📋 Prototype & Validation Report**: [https://ai-nursery.vercel.app/prototype-validation](https://ai-nursery.vercel.app/prototype-validation)

---

## 📌 Project Overview

Traditional local plant nurseries face significant customer drop-offs caused by:
1. Customer uncertainty regarding apartment light levels (low light vs direct sun) and plant budget choices.
2. High plant mortality due to overwatering or lack of practical, plain-language care guidance.
3. Inability to answer customer care questions outside store hours.
4. Nursery staff overload during weekend rush hours.

**AI Nursery Assistant** solves these challenges by combining a database-grounded AI care assistant, instant multimodal photo foliage diagnosis, smart catalog multi-filtering, personalized diagnostic quiz matching, secure UPI GPay QR checkout with 12-digit UTR transaction reference capture, and a centralized admin management portal.

---

## ✨ Core Features & Modules

### 1. Plant Catalog & Multi-Filters (`/plants`)
- Real-time catalog filtering by **Sunlight Needs** (Low, Medium, Direct Sun), **Watering Frequency** (Daily, Weekly, Rarely), **Category** (Indoor, Outdoor, Succulents, Flowering), and **Price Range** (under ₹250).
- Live stock availability indicators and direct 1-click cart addition.

### 2. Database-Grounded AI Assistant (`/chat`)
- Powered by `gemini-3.6-flash` via the Vercel AI SDK.
- **Safeguards & Zero-Hallucination Policy**: Grounded exclusively in the live Supabase nursery inventory.
- Renders interactive `[PLANT_CARD: Exact Name]` components directly in the stream for instant purchasing.
- Enriched knowledge base providing step-by-step sunlight, watering, soil mix, and fertilization advice.

### 3. Plant Doctor Vision Diagnosis (`/plant-analysis`)
- Multimodal leaf foliage health diagnosis powered by `gemini-3.5-flash` vision model.
- Upload smartphone camera photos to identify plant species, diagnose disease spots/yellowing foliage in **< 2 seconds**, and get recommended treatment steps with 1-click cart addition.

### 4. Find My Plant Quiz (`/find-my-plant`)
- Interactive 6-question diagnostic quiz scoring home space sunlight, balcony placement, experience level, and budget against current nursery inventory.

### 5. Cart & UPI GPay QR Checkout (`/checkout`)
- Supports **Cash on Delivery (COD)** and **Online UPI QR Code Payment** (GPay / PhonePe / Paytm).
- Captures and validates **12-digit UTR transaction reference IDs** (e.g. `452622829101`).
- Generates downloadable, high-resolution **PNG Bill Receipts** directly in the browser.

### 6. Secure Nursery Admin Dashboard (`/admin`)
- Inventory stock management (In Stock vs Out of Stock toggles).
- Order fulfillment tracking and 12-digit UTR transaction reference verification.
- Customer enquiry response system.

### 7. Design Thinking Portfolio (`/design-thinking`)
- 5-stage human-centered Design Thinking journey: **Empathize**, **Define Personas**, **Problem Statement**, **Ideation Concepts**, and **Solution Impact Matrix**.
- Features 3 representative user persona profiles (Dinesh, Selva Kumar, Prasanth).

### 8. Prototype & Validation Report (`/prototype-validation`)
- Phase 2 milestone documentation featuring real-user testing logs, Before/After visual improvement slots, and a live interactive report editor.

---

## 👥 Real-User Validation Log

During Phase 2 user testing trials, feedback was gathered from 3 representative participants:

| Participant | Profile / Role | Assigned Task | Key Feedback & Issue | Implemented Action |
|---|---|---|---|---|
| **Dinesh** | B.Tech Engineering Student | Plant Catalog & Multi-Filters (`/plants`) | *Catalog interface was nice, but website page transition loading occasionally felt slow.* | Optimized static asset bundling, component caching, and image loading for smooth UI execution. |
| **Selva Kumar** | Nursery Customer & Buyer | Website Navigation & Plant Doctor (`/plant-analysis`) | *Overall experience is good, but Plant Doctor diagnosis tool was not working properly initially.* | Overhauled Plant Doctor photo upload API stability and optimized execution speed. |
| **Prasanth** | Local Nursery Owner | Commercial Features & Ask AI Guidance (`/chat`) | *Website presentation was good; requested customer feedback forms and richer AI care tips.* | Enriched Ask AI care tips knowledge base with detailed sunlight/watering advice and added customer feedback channels. |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16.3 (App Router, React 19), Tailwind CSS, Lucide React Icons
- **AI Core**: Vercel AI SDK (`ai`), Google Gemini 3.6 Flash (Chat), Google Gemini 3.5 Flash (Vision)
- **Database & Backend**: Supabase PostgreSQL, Row Level Security (RLS)
- **Utilities**: `html2canvas` (PNG Bill Downloader), Webpack static asset bundling
- **Deployment**: Vercel Serverless Platform

---

## 🚀 Local Setup & Installation Guide

### 1. Clone the Repository & Install Dependencies
```bash
git clone https://github.com/mohamedaarief05/AI-Nursery-Assistant.git
cd AI-Nursery-Assistant
npm install
```

### 2. Configure Supabase Database
1. Create a project at [Supabase](https://supabase.com).
2. Open `supabase_setup.sql` in the project root.
3. Execute the SQL script in your Supabase SQL Editor to create `plants`, `categories`, `orders`, `enquiries`, and insert sample nursery inventory.

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Academic Integrity & Documentation Standards

In compliance with academic evaluation guidelines:
- **Preliminary Research**: Clearly labeled as `📌 Preliminary Domain Findings` derived from nursery scenario mapping.
- **User Personas**: Clearly labeled as `📌 Representative Personas` representing key user archetypes.
- **Validation**: Clearly labeled as `📌 Planned User Validation` documenting Phase 2 milestone testing.
- **Standard Terminology**: Uses *"12-digit UTR transaction reference capture and validation"* and *"Database-grounded AI responses with safeguards"*.

---

## 📄 License & Attribution

Developed as an **AI Immersion Project** demonstrating how artificial intelligence can empower small businesses through 24/7 customer support, multimodal vision diagnosis, and automated order processing.

© 2026 AI Nursery Assistant. All rights reserved.
