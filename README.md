# AI Nursery Assistant 🌱🤖

> An AI-powered conversational and vision-assisted retail platform designed to bridge the gap between plant nursery buyers and plant care knowledge. Powered by **Next.js 16**, **Google Gemini 3.6 Flash**, **Supabase PostgreSQL**, and **Vercel Cloud**.

[![Live Production Demo](https://img.shields.io/badge/Vercel-Live_Production_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-nursery.vercel.app)
[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamedaarief05/AI-Nursery-Assistant)
[![Framework](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

---

## 1. Project Overview

The **AI Nursery Assistant** is a web-based retail and care guidance system built for local plant nurseries and plant buyers. It merges database-grounded AI conversational support, computer vision foliage analysis, personalized plant recommendation quizzes, UPI 12-digit UTR transaction reference capture, and an administrative stock/order management dashboard into a single responsive application.

- **Live Application**: [https://ai-nursery.vercel.app](https://ai-nursery.vercel.app)
- **Project Review Dashboard**: [https://ai-nursery.vercel.app/project-dashboard](https://ai-nursery.vercel.app/project-dashboard)
- **GitHub Repository**: [https://github.com/mohamedaarief05/AI-Nursery-Assistant](https://github.com/mohamedaarief05/AI-Nursery-Assistant)

---

## 2. Problem Statement

Local plant nurseries and urban plant buyers face several operational and decision-making challenges:
1. **Plant Buyer Uncertainty**: Difficulty selecting plants matching specific home lighting conditions (direct sunlight vs low-light indoor spaces) and budget parameters.
2. **High Plant Mortality Rate**: Lack of accessible, step-by-step watering, soil mix, and disease treatment instructions leading to plant failure.
3. **Off-Hours Care Support Gap**: Customers cannot get instant plant care answers outside standard nursery operating hours.
4. **Staff Overload**: Nursery staff experience heavy customer inquiry backlogs during busy weekend hours.

---

## 3. Proposed Solution

The **AI Nursery Assistant** addresses these challenges through a centralized digital platform providing:
- **Instant 24/7 AI Assistance**: Database-grounded AI responses with safeguards for plant selection and care instructions.
- **Multimodal Visual Diagnosis**: Leaf photo upload and health analysis powered by vision models.
- **Personalized Discovery Quiz**: Automated matching of room light, care experience, and budget to plant inventory.
- **Streamlined Ordering & UTR Capture**: Integrated cart and 12-digit UTR transaction reference capture and validation for UPI payments.
- **Unified Admin Portal**: Real-time inventory status management, order fulfillment, and customer inquiry response handling.

---

## 4. Key Features

- **Plant Catalog & Multi-Filters (`/plants`)**: Search and filter by sunlight needs, watering frequency, plant category, and price range with live stock indicators.
- **Database-Grounded AI Assistant (`/chat`)**: Interactive plant care chatbot utilizing database-grounded AI responses with safeguards based on live nursery inventory.
- **Plant Doctor Vision Diagnosis (`/plant-analysis`)**: Foliage photo analysis tool identifying plant health issues and suggesting treatment steps.
- **Find My Plant Quiz (`/find-my-plant`)**: 6-question space-matching quiz recommending inventory based on sunlight, balcony placement, experience, and budget.
- **Cart & UPI Payment Flow (`/checkout`)**: Checkout supporting Cash on Delivery (COD) and Online UPI Payment with 12-digit UTR transaction reference capture and validation, generating downloadable bill receipts.
- **Customer Account Center (`/profile`)**: User profile info editing, order history tracking, and inquiry status review.
- **Nursery Admin Dashboard (`/admin`)**: Portal for inventory toggling, order fulfillment processing, 12-digit UTR transaction reference validation, and inquiry replies.

---

## 5. Technology Stack

- **Frontend Framework**: Next.js 16 (App Router, Server Actions, React 19)
- **Styling**: Tailwind CSS, Lucide React Icons
- **AI Integration**: Vercel AI SDK, Google Gemini 3.6 Flash (Chat), Google Gemini 3.5 Flash (Vision)
- **Database & Backend**: Supabase PostgreSQL, Supabase Auth, Serverless API Routes
- **Deployment Platform**: Vercel Cloud Infrastructure

---

## 6. Development Process

The project followed an end-to-end engineering and design methodology:

```
Idea → Problem Identification → Design Thinking → Prototype → Technical Testing → Real-User Validation → Feedback → Future Improvements
```

1. **Idea & Problem Identification**: Mapping nursery retail operational challenges and customer care drop-off points.
2. **Design Thinking**: Empathy research, user personas, problem definition, ideation, and solution selection.
3. **Prototype Development**: Building the functional Next.js & Supabase application.
4. **Technical Testing**: Comprehensive functionality, database, security, and responsive UI QA testing.
5. **Real-User Validation**: Testing with 3 genuine participants (Student, Customer, Nursery Owner).
6. **Feedback & Roadmap**: Synthesizing real user input into prioritized future enhancements.

---

## 7. Design Thinking

The design process applied a 5-phase human-centered framework:
- **Empathy Research**: Understanding urban plant buyer hesitations and nursery staff operational constraints.
- **User Personas**: Formulating representative user archetypes (Urban Apartment Buyer, Plant Enthusiast, Nursery Owner).
- **Problem Definition**: Framing core obstacles around light selection, care guidance, and staff availability.
- **Ideation**: Brainstorming database-grounded AI assistance, photo foliage diagnosis, and space-matching quiz concepts.
- **Selected Solution**: Developing the unified AI Nursery Assistant platform.

Explore the complete interactive design portfolio at:  
[https://ai-nursery.vercel.app/design-thinking](https://ai-nursery.vercel.app/design-thinking)

---

## 8. Prototype Development

The functional prototype is fully deployed and accessible in a production environment:
- **Functional Application**: [https://ai-nursery.vercel.app](https://ai-nursery.vercel.app)
- **Prototype & Validation Report**: [https://ai-nursery.vercel.app/prototype-validation](https://ai-nursery.vercel.app/prototype-validation)

---

## 9. Technical Testing & QA

> **Note**: Technical QA and Real-User Validation are separate evaluation methods. Technical QA verifies software functionality and reliability, while Real-User Validation evaluates usability and practical user experience with genuine participants.

### Technical QA Summary:
- **Total Test Scenarios**: 42 Scenarios
- **Passed Tests**: 42 Passed
- **Failed Tests**: 0 Failed
- **Bugs Discovered & Fixed**: 1 Discovered / 1 Fixed
- **Known Remaining Bugs**: 0 Remaining

### Scope Tested:
- **Security & API Key Audit**: Verified environment variable isolation.
- **Database Operations**: Validated Supabase CRUD queries, foreign key integrity, and fallback error handling.
- **Responsive UI**: Tested desktop, tablet, and mobile layouts.
- **Edge-Case Handling**: Verified empty state renders, missing photo fallbacks, and form validation.

---

## 10. Real-User Validation

✅ **REAL-USER VALIDATION COMPLETED**
- **Participants**: 3 / 3 Genuine Testers Completed
- **Testing Period**: 8–9 September 2026

### Participant Feedback Summary:

1. **Dinesh (Student — Laptop)**
   - **Device**: Laptop | **Testing Date**: 8 September 2026
   - **Feedback**: Found the website easy to understand and plant search/filtering straightforward. Noted that Ask AI was useful but responses sometimes took longer than expected. Plant Doctor feature worked well. Suggested organizing plant-care information more clearly and adding an Ask AI conversation history feature.

2. **Selva Kumar (Customer — Mobile Phone)**
   - **Device**: Mobile Phone | **Testing Date**: 8 September 2026
   - **Feedback**: Confirmed the website and plant catalog were easy to use. Evaluated Ask AI as very useful and Plant Doctor as easy to use. Found navigation generally easy, but noted minor confusion when moving between different sections or menu bars.

3. **Dinesh Kannan (Nursery Owner — Laptop)**
   - **Device**: Laptop | **Testing Date**: 9 September 2026
   - **Feedback**: Found the website, plant discovery, Ask AI, Plant Doctor, and Find My Plant quiz useful and easy to navigate.
   - **Admin Dashboard Feedback**: Highlighted that *"The Admin Dashboard was very good and easy to understand. The dashboard provides a clear and convenient way for a nursery owner to manage the system."* Suggested adding a customer feedback feature.

---

## 11. Feedback-Driven Improvements

Feedback collected during real-user testing has been synthesized into prioritized opportunities for future product roadmap iterations:

| User Feedback / Observation | Identified Opportunity | Improvement / Future Roadmap |
|---|---|---|
| Ask AI responses sometimes take longer than expected | AI interaction can feel slow | Improve Ask AI loading/response experience |
| Add history in Ask AI | Users cannot easily review previous conversations | Add Ask AI conversation history |
| Plant-care information could be organized more clearly | Information presentation can be improved | Better organization of plant-care information |
| Navigation between sections can sometimes be confusing | Users may have difficulty moving between major sections | Improve navigation clarity |
| Customer feedback was suggested | Nursery owners need a way to collect customer opinions | Add customer feedback functionality |

*Note: The items listed above represent future iteration roadmap priorities based on participant feedback and are not presented as completed features.*

---

## 12. Project Documentation

Access all project evaluation dashboards and documentation live:
- **Project Review Dashboard**: [https://ai-nursery.vercel.app/project-dashboard](https://ai-nursery.vercel.app/project-dashboard)
- **Design Thinking Portfolio**: [https://ai-nursery.vercel.app/design-thinking](https://ai-nursery.vercel.app/design-thinking)
- **Prototype & Validation Report**: [https://ai-nursery.vercel.app/prototype-validation](https://ai-nursery.vercel.app/prototype-validation)

---

## 13. Development Journey & Local Setup

### Local Setup Instructions:

```bash
# 1. Clone the repository
git clone https://github.com/mohamedaarief05/AI-Nursery-Assistant.git
cd AI-Nursery-Assistant

# 2. Install dependencies
npm install

# 3. Configure environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# 4. Start local development server
npm run dev
```

---

## 14. Deployment & Repository

- **GitHub Repository**: [https://github.com/mohamedaarief05/AI-Nursery-Assistant](https://github.com/mohamedaarief05/AI-Nursery-Assistant)
- **Live Production URL**: [https://ai-nursery.vercel.app](https://ai-nursery.vercel.app)

© 2026 AI Nursery Assistant. All rights reserved.
