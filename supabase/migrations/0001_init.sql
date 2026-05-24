-- CSCA Prep — initial schema
-- Run inside Supabase SQL editor or via supabase CLI: supabase db push
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- ENUMS -----------------------------------------------------------------------
do $$ begin
  create type subject_slug as enum (
    'math-en','math-zh','physics-en','physics-zh',
    'chemistry-en','chemistry-zh','humanities','natural-science'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type access_tier as enum ('free','subscription');
exception when duplicate_object then null; end $$;

do $$ begin
  create type subscription_status as enum ('free','active','expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type attempt_mode as enum ('exam','quiz','simulator');
exception when duplicate_object then null; end $$;

do $$ begin
  create type difficulty_level as enum ('easy','medium','hard');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lesson_status as enum ('in_progress','completed');
exception when duplicate_object then null; end $$;

-- PROFILES --------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  locale text not null default 'ru' check (locale in ('ru','en')),
  has_subscription boolean not null default false,
  subscription_status subscription_status not null default 'free',
  subscription_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_profile_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_profile_updated_at();

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- CONTENT TABLES --------------------------------------------------------------
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug subject_slug not null unique,
  name_ru text not null,
  name_en text not null,
  language text not null default 'en',
  color text not null default '#172446',
  sort int not null default 0
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  subject_slug subject_slug not null references public.subjects(slug) on delete cascade,
  slug text not null,
  title_ru text not null,
  description_ru text not null default '',
  sort int not null default 0,
  access_tier access_tier not null default 'free',
  unique (subject_slug, slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title_ru text not null,
  theory_md text not null default '',
  examples jsonb not null default '[]'::jsonb,
  sort int not null default 0,
  access_tier access_tier not null default 'free',
  estimated_minutes int not null default 10,
  unique (module_id, slug)
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  subject_slug subject_slug not null references public.subjects(slug) on delete cascade,
  title_ru text not null,
  exam_date date not null,
  question_count int not null default 0,
  duration_minutes int not null default 60,
  access_tier access_tier not null default 'subscription',
  attempts_count int not null default 0
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title_ru text not null,
  question_count int not null default 0
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  exam_id uuid references public.exams(id) on delete cascade,
  subject_slug subject_slug not null references public.subjects(slug) on delete cascade,
  prompt_ru text not null,
  choices jsonb not null,
  correct_key text not null,
  explanation_ru text not null default '',
  difficulty difficulty_level not null default 'medium',
  sort int not null default 0,
  check (lesson_id is not null or exam_id is not null)
);

create index if not exists idx_questions_lesson on public.questions(lesson_id);
create index if not exists idx_questions_exam on public.questions(exam_id);
create index if not exists idx_questions_subject on public.questions(subject_slug);

-- USER STATE TABLES -----------------------------------------------------------
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_id uuid references public.exams(id) on delete set null,
  quiz_id uuid references public.quizzes(id) on delete set null,
  mode attempt_mode not null,
  subject_slug subject_slug not null,
  score int not null default 0,
  total int not null default 0,
  duration_seconds int not null default 0,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

create index if not exists idx_attempts_user on public.attempts(user_id, completed_at desc);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status lesson_status not null default 'in_progress',
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- ROW LEVEL SECURITY ----------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.exams enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.bookmarks enable row level security;

-- Profiles: each user sees and updates only their own row.
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
for update using (auth.uid() = id);

drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert" on public.profiles
for insert with check (auth.uid() = id);

-- Catalog tables: readable by any authenticated user.
do $$
declare t text;
begin
  foreach t in array array['subjects','modules','lessons','exams','quizzes','questions']
  loop
    execute format($f$
      drop policy if exists "%I read" on public.%I;
      create policy "%I read" on public.%I
      for select using (auth.role() = 'authenticated');
    $f$, t, t, t, t);
  end loop;
end $$;

-- Attempts / progress / bookmarks: per-user.
drop policy if exists "attempts self all" on public.attempts;
create policy "attempts self all" on public.attempts
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "lesson_progress self all" on public.lesson_progress;
create policy "lesson_progress self all" on public.lesson_progress
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "bookmarks self all" on public.bookmarks;
create policy "bookmarks self all" on public.bookmarks
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
