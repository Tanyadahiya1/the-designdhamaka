# The Design Dhamaka — Agency Website

A cinematic, 3D-powered portfolio site for a creative digital agency, with a
built-in **admin panel** to view client enquiries and manage your portfolio —
no paid libraries or APIs required to run it.

**Theme:** warm cream (`#FBF3E4`) + deep brown ink (`#2B1810`) + burst
orange/gold accents (`#E8792B` / `#F2B705`), matching the logo. Headlines use
**Fredoka** (rounded, bold, free Google Font) paired with **Inter** for body
text. The hero's 3D object is a glossy "dhamaka" burst with radiating rays
and confetti that pulses outward on click — glassmorphism panels (`.glass`,
`.glass-strong` in `index.css`) are used throughout for cards, the navbar,
and the contact form.

Stack: React + TypeScript + Vite + Tailwind CSS + React Three Fiber (Three.js)
+ Framer Motion + Lenis + Supabase (free tier, optional).

---

## 1. Run it locally (VS Code)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The site works
fully out of the box — hero, 3D object, all sections, contact form. Without
a database connected, the contact form and admin panel run in **demo mode**
(nothing is saved permanently). Follow step 2 to turn on real persistence.

---

## 2. Connect the database + admin login (free, ~5 minutes)

This project uses **Supabase** (a free-tier hosted Postgres database with
built-in auth) to store client enquiries and your portfolio projects, and to
log you into `/admin`. No credit card is required for the free tier.

1. Go to [supabase.com](https://supabase.com) → create a free account →
   **New project**.
2. Once it's created, open **SQL Editor** → **New query**, paste the
   contents of [`supabase/schema.sql`](./supabase/schema.sql), and click
   **Run**. This creates the `inquiries` and `projects` tables with the
   right access rules (visitors can submit enquiries; only you can read or
   manage them).
3. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon public key**.
4. In this project, copy `.env.example` to `.env` and paste them in:

   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

5. Create your admin login: **Authentication → Users → Add user**, enter
   your email and a password. That's the login you'll use at `/admin`.
6. Restart `npm run dev`. The contact form now saves to your database, and
   `/admin` will ask you to log in with the user you just created.

---

## 3. Using the admin panel

Visit `/admin` (e.g. `yoursite.com/admin`) and log in.

- **Client Enquiries** — every contact-form submission appears here with
  name, email, phone, budget and message. Mark each as `new`, `contacted`
  or `archived`, or delete it.
- **Portfolio Work** — add, feature/unfeature, or delete projects. Featured
  projects automatically show up in the **Selected Work** section on the
  live site — no code changes needed.

---

## 4. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the
   repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist` (defaults are already correct via `vercel.json`).
4. Under **Environment Variables**, add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` (same values as your `.env`).
5. Deploy. Your site and `/admin` will both be live on your Vercel URL.

---

## 5. Content you'll want to personalize

- `src/components/Testimonials.tsx` — replace placeholder quotes/names.
- `src/components/Footer.tsx` / `CTA.tsx` — swap `hello@thedesigndhamaka.com`
  and social links for your real ones.
- `src/data/projects.ts` — starter portfolio data shown until you add real
  projects from `/admin` (or edit this file directly).
- Replace `public/favicon.svg` with your own mark if you have one.

---

## Project structure

```
src/
  components/       Navbar, Hero, Scene3D (3D object), Marquee, About,
                     Services, Work, Statement, Process, Agency,
                     Testimonials, CTA (contact form), Footer, CustomCursor,
                     SmoothScroll
  pages/
    Home.tsx         assembles the public site
    admin/            login + dashboard (enquiries & portfolio management)
  lib/
    supabase.ts       Supabase client (safely no-ops if unconfigured)
    useAuth.ts         admin session hook
  data/projects.ts    fallback/starter portfolio content
  types/index.ts       shared TypeScript types
supabase/schema.sql    database schema — run once in Supabase SQL editor
```

## Notes

- No paid APIs or libraries are used anywhere — Supabase's free tier is
  optional and only needed for persistence; the site is fully usable without
  it.
- The 3D scene lazy-loads and reduces particle count on mobile for
  performance; `prefers-reduced-motion` is respected throughout.
- Custom cursor is desktop-only and disables itself on touch devices.
