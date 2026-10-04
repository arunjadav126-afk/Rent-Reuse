# 🎓 Rent & Reuse — Campus Peer-to-Peer Sharing & Circular Economy Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Rent & Reuse** is a hyper-local, sustainability-focused campus platform designed for university students to share, rent, swap, donate, and repair academic gear, textbooks, lab equipment, electronics, and hostel essentials within a trusted college ecosystem.

---

## 🌟 Key Features

### 🔄 1. Multi-Mode Resource Sharing
- **Free Sharing & Loans**: Lend items for zero cost to support peers.
- **Daily Rentals**: Earn pocket money by renting out underutilized devices, tools, or books at fair daily rates.
- **Peer Swaps**: Exchange items directly for mutual semester needs.
- **Direct Donations**: Give away surplus supplies, textbooks, or hostel gear to juniors.

### 🛡️ 2. Verified Campus Trust Network & Karma System
- **Verified Student Profiles**: Domain-restricted signup (`.edu`, `.ac.in`) ensures a closed, safe campus network.
- **Gamified Karma Ledger**: Immutable audit log awarding Karma points for lending, returning on time, donating, and fixing items.
- **Campus Trust Scores**: Transparency ratings (0.00 – 5.00) built on verified transactions and peer vouches.

### 📱 3. Contactless QR Verification & Safe Handover Points
- **QR Code Handover**: Dual QR scanning protocol for verified pickup and return validation.
- **Item Condition Checklist**: Interactive pre- and post-loan condition logging to prevent disputes.
- **Mapped Safe Pickup Points**: Designated campus locations (Library entrance, Student Center, Sports Complex) with operational hours and lat/lng coordinates.

### 📦 4. Academic Starter Bundles & Course Tagging
- **Department & Course Tagging**: Categorized by course codes and majors (e.g., ECE, Mech, CS, Art).
- **Curated Starter Bundles**: Pre-packaged kits tailored for specific academic years (e.g., *1st Year Engineering Kit*, *Drafting Set*, *Lab Starter Pack*).

### 🎓 5. Semester-End Release & Waitlist Queue
- **Graduation Gear Release**: Seniors can schedule future batch releases of books, mattresses, kettles, and lab kits for incoming freshmen.
- **Reserve Waitlists**: Reserve high-demand items in advance of upcoming semesters.

### 🛠️ 6. Campus Repair Clinic & Fixers Hub
- **Peer Repair Bounties**: Post broken gear or damaged lab instruments to the Fixers Hub where skilled student technicians repair items for Karma points.

### 📢 7. Wanted Board (Peer Requests)
- **Instant Needs Broadcast**: Post urgent resource requests (e.g., scientific calculator for exam, lab coat) to receive immediate offers from nearby peers.

### 📊 8. Impact Dashboard & Sustainability Analytics
- **CO₂ Offset Tracking**: Real-time calculation of carbon footprint savings ($kg$ CO₂ prevented) through circular reuse.
- **Student Savings Index**: Cumulative financial savings ($₹$) achieved by borrowing instead of purchasing new items.

### 🌐 9. Multilingual Accessibility
- Full internationalization support: **English**, **Hindi (हिन्दी)**, and **Tamil (தமிழ்)**.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.js.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, Lucide React Icons
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security & Triggers)
- **Interactive Features**: Canvas Confetti, QR Code Generator (`qrcode`)

---

## 🗄️ Database Architecture

The application is backed by PostgreSQL on Supabase with 15 core entities:

- `profiles` — Student & Fixer credentials, trust score, karma balance, RLS policies.
- `items` — Listings with mode, condition, department tags, availability dates, photos.
- `requests` — Borrowing workflow lifecycle (`pending` ➔ `approved` ➔ `active` ➔ `returned`).
- `handovers` — QR tokens, verification timestamps, and condition checklists.
- `karma_ledger` — Immutable transaction ledger tracking karma points.
- `messages` — In-app messaging contextualized per request.
- `wanted_posts` — Peer requests for unlisted items.
- `bundles` — Department starter packages.
- `repair_requests` — Community repair tickets with fixer bounties.
- `safe_points` — Mapped campus pickup locations.
- `categories`, `item_availability`, `ratings`, `reports`, `notifications`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Supabase Account**: (Optional for local mock mode, required for live DB)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arunjadav126-afk/Rent-Reuse.git
   cd Rent-Reuse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Initialize Database**:
   Import `schema.sql` into your Supabase SQL Editor to set up tables, RLS policies, triggers, and seed data.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
rent-and-reuse/
├── public/                # Static assets & web manifest
├── schema.sql             # Full PostgreSQL / Supabase Schema & Seed Data
├── src/
│   ├── app/               # Next.js App Router (pages & global layout)
│   ├── components/        # React Components (Modals, Views, Cards, Navigation)
│   │   ├── AdminView.tsx
│   │   ├── AuthModal.tsx
│   │   ├── BundlesView.tsx
│   │   ├── ChatModal.tsx
│   │   ├── Header.tsx
│   │   ├── ImpactDashboardView.tsx
│   │   ├── ItemCard.tsx
│   │   ├── PostItemModal.tsx
│   │   ├── QRHandoverModal.tsx
│   │   └── WantedBoardView.tsx
│   └── lib/               # Utility functions, Supabase client, i18n, mock data, TypeScript types
│       ├── i18n.ts
│       ├── mockData.ts
│       ├── store.tsx
│       ├── supabase.ts
│       └── types.ts
├── package.json
└── tsconfig.json
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

