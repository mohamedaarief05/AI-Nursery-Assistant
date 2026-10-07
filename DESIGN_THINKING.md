# Design Thinking Portfolio — AI Nursery Assistant 🌱🤖

**Project:** AI Nursery Assistant  
**Milestone:** Phase 2 — Design Thinking, Prototype Engineering, Technical QA & Real-User Validation  
**Live Application:** [https://ai-nursery.vercel.app](https://ai-nursery.vercel.app)  
**Interactive Portfolio:** [https://ai-nursery.vercel.app/design-thinking](https://ai-nursery.vercel.app/design-thinking)  

---

## 1. Overview & Methodology

The **AI Nursery Assistant** is built upon a 5-stage human-centered **Design Thinking** methodology to bridge the gap between plant nursery buyers and plant care knowledge:

```
[1. Empathize] ➔ [2. Define] ➔ [3. Ideate] ➔ [4. Prototype] ➔ [5. Test & Validate]
```

---

## 2. Stage 1: Empathy Research & Domain Findings

Preliminary research and domain scenario mapping across urban plant buyers and local plant nursery operations revealed four core challenges:

1. **Plant Buyer Uncertainty:** Beginner buyers struggle to evaluate their indoor/balcony lighting conditions (direct sun vs low light) and space dimensions, leading to purchase hesitation.
2. **Avoidable Plant-Care Mistakes:** Inexperienced plant owners frequently struggle with watering schedules, soil aeration, and nutrient mix, resulting in deteriorating plant health.
3. **Off-Hours Care Support Gap:** When customers observe leaf yellowing, drooping, or pests at home, physical nurseries provide no real-time guidance outside standard opening hours.
4. **Nursery Staff Bottlenecks:** Nursery owners and staff are occupied with physical plant maintenance and inventory management during weekend retail rushes, limiting their ability to answer repetitive care questions.

---

## 3. Stage 2: Representative User Personas

### Persona 1: Alex (Apartment Resident)
* **Archetype:** Urban Apartment Resident & Beginner Plant Buyer
* **Goals:** Filter plants suitable for apartment balcony lighting and maintain a modest budget (< ₹250).
* **Needs:** Multi-criteria catalog filtering and clear, plain-language care summaries.
* **Pain Points:** Misjudging room light levels and difficulty selecting plants without in-person advice.
* **Solution Alignment:** Tested Plant Catalog & Multi-Filters (`/plants`) for instant light and price matching.

### Persona 2: Sam (Care Enthusiast)
* **Archetype:** Plant Enthusiast & Home Gardener
* **Goals:** Quickly diagnose leaf issues using smartphone photos and check live stock for healthy plants.
* **Needs:** Fast photo upload for instant leaf health evaluation and reliable care advice.
* **Pain Points:** Unidentified plant pests and lack of botanist advice outside nursery hours.
* **Solution Alignment:** Tested Plant Doctor Vision API (`/plant-analysis`) for multimodal visual diagnosis.

### Persona 3: Taylor (Nursery Manager)
* **Archetype:** Local Plant Nursery Owner & Manager
* **Goals:** Provide automated 24/7 care assistance to store visitors and manage stock/orders easily.
* **Needs:** Comprehensive AI care guidance grounded in inventory, plus a customer feedback channel.
* **Pain Points:** Staff overload answering repetitive care questions during peak weekend hours.
* **Solution Alignment:** Implemented Grounded AI Assistant (`/chat`) and Nursery Admin Portal (`/admin`).

---

## 4. Stage 3: Defined Problem Statement

> **Core Problem Statement:**  
> *"Nursery customers often struggle to identify suitable plants, understand plant-care requirements, and get immediate answers to their questions, while nursery staff may not always be available to provide personalized assistance."*

---

## 5. Stage 4: Ideation & Concept Selection

During the ideation phase, various technical and architectural approaches were evaluated:

| Concept Evaluated | Selection | Rationale |
|---|---|---|
| **Multi-Filter Catalog & Search** | ✅ Selected | Empowers customers to filter by sunlight, watering, category, and price range. |
| **Grounded AI Care Chatbot** | ✅ Selected | Provides accurate care guidance grounded in actual nursery inventory. |
| **Plant Doctor Vision Diagnosis** | ✅ Selected | Multimodal image analysis identifying plant health issues from leaf photos. |
| **Find My Plant 6-Step Quiz** | ✅ Selected | Guided questionnaire matching apartment spaces to optimal plants. |
| **Nursery Admin Dashboard** | ✅ Selected | Centralizes stock toggles, order fulfillment, and inquiry responses. |
| **Customer Feedback Channel** | ✅ Selected | Allows nursery owners to gather customer ratings and reviews directly. |
| **Static Care Manual (PDFs)** | ❌ Discarded | Lacked personalization, real-time inventory grounding, and interactivity. |
| **Generic Ungrounded Chatbot** | ❌ Discarded | Produced hallucinations and recommended non-inventory plant species. |

---

## 6. Stage 5: Selected Solution & Impact Matrix

| User Challenge | Root Cause | Implemented Solution | Impact / Outcome |
|---|---|---|---|
| **Plant Selection Uncertainty** | Complex lighting & space requirements | Multi-Filter Catalog & Find My Plant Quiz | Confident, personalized plant selection in under 60 seconds |
| **Lack of Plant Care Knowledge** | Inconsistent watering and light guidelines | Database-Grounded AI Assistant (Gemini 3.6 Flash) | Helps users make better plant-care decisions and reduce avoidable mistakes |
| **Leaf Yellowing & Disease** | Inability to identify plant pests at home | Plant Doctor Multimodal Vision (Gemini 3.5 Flash) | AI-generated health diagnosis and actionable recovery steps |
| **Staff Overload & Bottlenecks** | Repetitive care inquiries during store rush | Automated AI Assistant + Admin Dashboard | Reduced staff inquiry backlog and centralized order management |

---

## 7. Prototype Implementation & Validation Link

The finalized design thinking concepts were engineered into a production web application:
- **Application Architecture:** Next.js 16 (App Router), Supabase PostgreSQL, Google Gemini API, Tailwind CSS.
- **Verification:** 42/42 Technical QA scenarios passed.
- **Empirical Validation:** Completed with 3 real users on 8–9 September 2026.
- **Validation Report:** Detailed in [`VALIDATION_REPORT.md`](./VALIDATION_REPORT.md) and live at [`/prototype-validation`](https://ai-nursery.vercel.app/prototype-validation).
