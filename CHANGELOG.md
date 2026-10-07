# Project Changelog — AI Nursery Assistant 🌱🤖

All notable developments and milestones for the **AI Nursery Assistant** project are documented below.

---

## [Phase 2 Milestone] — September 2026

### Added
* **Design Thinking Documentation (`/design-thinking`)**: 5-stage human-centered framework covering empathy domain research, 3 user personas (Alex, Sam, Taylor), problem definition, ideation, and problem-solution impact matrix.
* **Prototype & Validation Portal (`/prototype-validation`)**: Interactive validation report detailing testing methodology, 3 real-user evaluation trials, feedback implementation matrix, and QA records.
* **Academic Review Hub (`/project-dashboard`)**: Central academic dashboard linking design thinking and prototype validation milestones.
* **Customer Feedback System (`/feedback`)**: Direct customer rating and feedback submission portal with backend Supabase storage and admin review tab (`/admin/feedback`).
* **Design & Validation Markdown Docs**: Added `DESIGN_THINKING.md` and `VALIDATION_REPORT.md` summarizing research and validation results.

### Improved & Optimized
* **AI Streaming Latency Feedback**: Enhanced loading indicators and botanical animation status in Ask AI (`/chat`) to reduce perceived response latency.
* **Plant Care Information Structure**: Reorganized plant detail cards on `/plants` into dedicated sunlight, watering, and soil care tip sections.
* **Navigation Flow & Header Layout**: Added direct quick-links between catalog, plant doctor, chat assistant, and quiz to streamline mobile navigation.
* **Phase 2 Status & Terminology Consistency**: Standardized documentation across `/project-dashboard`, `/prototype-validation`, `/design-thinking`, and `README.md` to reflect completed 3-user validation.

### Verified & Tested
* **Technical QA Audit**: Completed 42 test scenarios across database CRUD, environment variable security, responsive viewports, and edge-case error handling with 100% pass rate.
* **Real-User Validation Trials**: Completed empirical testing with 3 genuine participants (Dinesh - Student, Selva Kumar - Customer, Dinesh Kannan - Nursery Owner) on 8–9 September 2026.

---

## [Phase 1 Milestone] — Initial Foundation & Architecture

### Added
* **Project Initialization**: Next.js 16 App Router setup with Tailwind CSS and Lucide React Icons.
* **Supabase PostgreSQL Schema**: Created tables for `plants`, `categories`, `orders`, `order_items`, `inquiries`, `reviews`, and `feedback`.
* **Grounded AI Care Assistant (`/chat`)**: Integrated Google Gemini 3.6 Flash using database-grounded system prompts based on live inventory.
* **Plant Doctor Multimodal Vision (`/plant-analysis`)**: Integrated Google Gemini 3.5 Flash for foliage photo analysis and health assessment.
* **Space-Matching Discovery Quiz (`/find-my-plant`)**: 6-step interactive questionnaire recommending inventory based on sunlight and budget.
* **Cart & UPI Checkout (`/checkout`)**: Shopping cart with Cash on Delivery (COD) and Online UPI 12-digit UTR transaction reference capture.
* **Nursery Admin Dashboard (`/admin`)**: Real-time stock status toggles, order fulfillment processing, and customer inquiry response management.
* **Production Cloud Deployment**: Automated CI/CD deployment on Vercel Cloud infrastructure.
