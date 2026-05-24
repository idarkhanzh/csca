# CSCA Prep

Russian-language preparation platform for the CSCA exam. Built as a Vite + React + TypeScript SPA with Tailwind CSS and Supabase (auth + database). Designed to be deployed to Vercel.

> The platform never exposes raw exam PDFs. All materials are reorganised into structured modules, lessons, quizzes, and exam-style practice.

## Features

- **Landing page** in Russian with hero, sections explaining CSCA, how the platform works, free vs. subscription access, and a final CTA.
- **Authentication** via Supabase Auth (email/password). A demo mode is also available when Supabase isn't configured.
- **Dashboard** — greeting, readiness percentage, lesson/question counters, recent activity, subject progress cards.
- **База заданий** — subject filters, search, cards for 30+ official exams reconstructed from the materials.
- **Exam runner** — structured questions, navigation panel, timer, submit and review with explanations.
- **Подготовка с нуля** — units → modules → lessons with theory, worked examples and practice questions.
- **Lesson** page with original Russian theory blocks, examples, practice quiz, lesson completion tracking.
- **Симулятор** — pick subject, language, count of questions and timer; fullscreen-style exam mode with review.
- **Settings** — profile, language preference, subscription status, logout.
- **Paywall component** — clean lockout screen for subscription-only content.
- **Subscription column** in `profiles` so admins can grant access manually via SQL.

## Stack

- **Frontend:** Vite + React 18 + TypeScript + React Router 6
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Backend:** Supabase (auth + Postgres + RLS)
- **Hosting:** Vercel
- **Repo:** GitHub

## Local install

```bash
# from this directory
npm install
cp .env.example .env   # then fill in Supabase URL + anon key (optional for demo mode)
npm run dev
```

Open <http://localhost:5173>.

> Without Supabase env vars the app still works fully in **demo mode**: login screen has a "Войти в демо" button, and progress is stored in `localStorage`.

## Required environment variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL`       | Supabase project URL (e.g. `https://abcd.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY`  | Supabase anon public key |

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API** copy the **Project URL** and **anon public key** into `.env`.
3. Open **SQL Editor** and run, in order:
   - `supabase/migrations/0001_init.sql` — creates types, tables, triggers, RLS policies and the `handle_new_user` trigger that mirrors auth users into `profiles`.
   - `supabase/migrations/0002_seed.sql` — seeds subjects and 30+ exam rows.
4. In **Authentication → Providers** enable Email provider. Disable email confirmations during development if you want instant sign-ins.

The app reads `subjects`, `modules`, `lessons`, `exams`, and `questions` from the same shapes shown in `src/data/*` and `src/types/database.ts`. The seeded curriculum data lives in the app itself so it ships fully functional without a database round-trip; you can later move it into Supabase tables and switch the data layer when needed.

## Managing subscriptions manually

There is no payment integration yet — admins flip a column in Supabase:

```sql
-- Grant subscription
UPDATE profiles
SET has_subscription = true,
    subscription_status = 'active'
WHERE email = 'student@example.com';

-- Revoke
UPDATE profiles
SET has_subscription = false,
    subscription_status = 'expired'
WHERE email = 'student@example.com';
```

The frontend reads `has_subscription` on every page load to decide whether locked content shows the paywall or the real experience.

## Deploying to Vercel

1. Push this directory to a GitHub repo.
2. In Vercel, **Import Project** and select the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Add the two environment variables under **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. `vercel.json` already rewrites all routes to `index.html` so React Router works.

### Pushing to GitHub

```bash
git init
git add .
git commit -m "feat: initial CSCA Prep scaffold"
git branch -M main
git remote add origin git@github.com:<your-user>/csca-prep.git
git push -u origin main
```

## Project structure

```
csca-prep/
├── public/                       # static assets
├── src/
│   ├── components/
│   │   ├── auth/                 # ProtectedRoute
│   │   ├── layout/               # AppLayout, Sidebar, AppHeader, MarketingHeader, MarketingFooter
│   │   └── ui/                   # Logo, Badge, ProgressBar, Paywall, Timer, QuestionRenderer, ExamCard, SubjectFilter, DashboardStats, Theory
│   ├── data/                     # subjects, exams, questions, pathway (modules + lessons)
│   ├── lib/                      # auth context, supabase client, progress (localStorage), sample picker
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── auth/                 # LoginPage, RegisterPage
│   │   └── app/                  # DashboardPage, ExamsPage, ExamRunnerPage, PathwayPage, LessonPage, SimulatorPage, SimulatorRunnerPage, SettingsPage
│   ├── styles/globals.css
│   ├── types/database.ts         # Supabase row/insert/update types
│   ├── App.tsx                   # routes
│   └── main.tsx                  # bootstraps providers
├── supabase/migrations/
│   ├── 0001_init.sql             # schema, RLS, profile-on-signup trigger
│   └── 0002_seed.sql             # subjects + exam catalog
├── index.html
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── vercel.json                   # SPA rewrites
└── README.md
```

## Russian language quality

All visible UI text is in Russian, written for high-school / university applicants preparing for Chinese university entrance exams. Theory blocks are short, focused, and use proper mathematical notation.

## Copyright note

Raw exam PDFs supplied for development are **not** redistributed. Question prompts and explanations bundled in `src/data/questions.ts` are original Russian-language exercises inspired by the topic distribution and difficulty of the official tests.
