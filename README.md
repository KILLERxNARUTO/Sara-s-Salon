# Sara's Beauty & Bridal Studio 👑✨
### *Where Elegance Becomes Artistry* — Guduvanchery, Chennai

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

---

A bespoke, production-ready luxury web platform and automated booking engine engineered specifically for **Sara's Beauty & Bridal Studio**, Guduvanchery's premier haute beauty atelier catering exclusively to ladies and kids.

Built with an ultra-premium dark obsidian & champagne gold aesthetic, GSAP-powered motion choreography, atomic appointment locking, automated WhatsApp booking confirmations, and seamless Vercel cloud deployment.

---

## 💎 Key Highlights

- **Bespoke Luxury Visual System**:
  - Obsidian & champagne gold royal palette (`#110F0E`, `#D4B87A`, `#FDFBF7`).
  - Custom vector **Golden Crowned S Emblem** brand identity.
  - Floating frosted-glass capsule navigation bar with backdrop blur.
  - 3D interactive tilt cards, magnetic cursor interactions, and fluid typography.

- **GSAP-Powered Staggered Menu**:
  - Full-height sliding drawer with staggered underlays and micro-animations.
  - Smart hover-to-open and cursor-away auto-closing behavior with zero frame drops.
  - React portal rendering attached directly to `document.body` for edge-to-edge alignment.

- **Atomic Appointment Booking Engine**:
  - **Strict Single-Client Concurrency**: Enforces that only one client can reserve a given date and time slot (e.g. 10th Oct 10:30 AM), preventing double bookings with database-level checks.
  - Real-time time slot availability calculation based on existing appointments.
  - Dynamic service selection, duration computation, and instant summary generation.

- **Automated WhatsApp Notifications**:
  - Real-time booking alerts sent to salon management via CallMeBot and Baileys WhatsApp sockets.
  - Direct WhatsApp booking link generator with pre-formatted bridal service templates.

- **Optimized for Vercel Cloud Deployment**:
  - Built-in Single Page Application (SPA) rewrite rules in `vercel.json` to prevent `404 NOT_FOUND` errors on deep links (`/services`, `/bridal`, `/packages`, `/book`, etc.).
  - Monorepo root and subfolder deployment compatibility out of the box.

---

## 🏛️ Architecture & Project Structure

```
Website-1-Sara/
├── frontend/                     # React 19 + TypeScript + Vite SPA
│   ├── public/
│   │   ├── images/               # High-res luxury bridal & salon editorial assets
│   │   └── logo.png              # Golden Crowned S Emblem logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── StaggeredMenu.tsx     # GSAP sliding luxury menu drawer
│   │   │   │   ├── StaggeredMenu.css     # Staggered menu styles & gold counter
│   │   │   │   └── hero-01-utils/        # Floating capsule header & hero modules
│   │   │   ├── Navbar.tsx                # Classic navigation fallback
│   │   │   ├── AnimatedCard3D.tsx        # 3D perspective card wrapper
│   │   │   └── ScrollProgressBar.tsx     # Reading progress gold indicator
│   │   ├── pages/
│   │   │   ├── BookingPage.tsx           # Appointment scheduler with atomic slot check
│   │   │   ├── ServicesPage.tsx          # Full categorized treatment catalog
│   │   │   └── AboutContactPage.tsx      # Studio history, maps, and contact form
│   │   ├── sections/                     # Modular landing page sections
│   │   ├── lib/
│   │   │   └── supabase.ts               # Supabase client with safe production fallback
│   │   └── styles/
│   │       └── index.css                 # Global styling, Tailwind tokens, and keyframes
│   ├── vercel.json               # Client-side routing rewrites & asset cache headers
│   └── vite.config.ts            # Vite + Tailwind v4 build configuration
│
├── backend/                      # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── bookings.ts       # Booking endpoints with concurrency validation
│   │   │   └── whatsapp.ts       # WhatsApp messaging endpoints
│   │   └── services/             # Baileys WhatsApp client & notification handlers
│   └── tsconfig.json
│
├── supabase/                     # Supabase database schema, policies, and seeds
│   └── migrations/               # PostgreSQL DDL migrations for bookings table
│
├── vercel.json                   # Root monorepo deployment config for Vercel
├── package.json                  # Root convenience scripts for CI/CD builds
└── README.md
```

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vite.dev/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Vanilla CSS Design System |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Backend API** | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **WhatsApp Automation**| [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) + CallMeBot API |
| **Deployment** | [Vercel](https://vercel.com/) (Frontend) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher)
- A free **[Supabase](https://supabase.com/)** project

---

### 1. Clone the Repository
```bash
git clone https://github.com/SelvaKumaran-G/Website-1-Sara-.git
cd Website-1-Sara-
```

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Configure your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_API_URL=http://localhost:3001
   ```
5. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 3. Backend Setup (Optional for Local API & WhatsApp Bot)

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Configure backend environment:
   ```env
   PORT=3001
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   CALLMEBOT_PHONE=919790690628
   OWNER_PHONE=919790690628
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

---

## ☁️ Deploying to Vercel

The application is pre-configured with root and directory-level `vercel.json` manifests.

### Method 1: Deploy from GitHub (Recommended)
1. Fork or push this repository to your GitHub account:
   `https://github.com/SelvaKumaran-G/Website-1-Sara-`
2. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)** and click **"Add New..."** > **"Project"**.
3. Import the `Website-1-Sara-` repository.
4. Set the project configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` *(or leave as `./` since root `vercel.json` handles build automatically)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Project Anon Key
6. Click **Deploy**. Your site will be live within seconds!

---

## 🗄️ Database Schema (Supabase)

To enable the atomic 1-client-per-slot booking system, run the following SQL query in your Supabase SQL Editor:

```sql
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_phone text not null,
  client_email text,
  service_title text not null,
  booking_date date not null,
  booking_time text not null,
  status text default 'confirmed',
  created_at timestamptz default now()
);

-- Unique index to guarantee no double bookings for the same date & time slot
create unique index if not exists idx_unique_booking_slot 
on public.bookings (booking_date, booking_time)
where status != 'cancelled';
```

---

## 📞 Studio Contact & Credits

- **Studio**: Sara's Beauty & Bridal Studio (Ladies & Kids Only)
- **Address**: Near NPR Mandapam, Mahalakshmi Nagar, Guduvanchery, Tamil Nadu 603202
- **Direct Phone**: [+91 97906 90628](tel:+919790690628) / [+91 99400 99380](tel:+919940099380)
- **WhatsApp**: [+91 97906 90628](https://wa.me/919790690628)
- **Instagram**: [@saras_beauty_and_bridal_studio](https://www.instagram.com/saras_beauty_and_bridal_studio/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
