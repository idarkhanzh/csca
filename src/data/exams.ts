import type { AccessTier, SubjectSlug } from '../types/database';

export interface ExamMeta {
  id: string;
  subjectSlug: SubjectSlug;
  titleRu: string;
  date: string;          // ISO yyyy-mm-dd
  questionCount: number;
  durationMinutes: number;
  accessTier: AccessTier;
  attemptsCount: number;
  sourceFile?: string;   // for our reference only; never shown as a download
}

// Mirrors supabase/migrations/0002_seed.sql exam rows.
export const EXAMS: ExamMeta[] = [
  { id: 'math-en-2025-12', subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Dec 2025',  date: '2025-12-21', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 140 },
  { id: 'math-en-2026-01', subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Jan 2026',  date: '2026-01-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 137, sourceFile: 'Math January official test 2026.pdf' },
  { id: 'math-en-2026-03', subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Mar 2026',  date: '2026-03-15', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 330, sourceFile: 'Maths official test march 2026.pdf' },
  { id: 'math-en-2026-04', subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Apr 2026',  date: '2026-04-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 185 },
  { id: 'math-zh-2025-12', subjectSlug: 'math-zh',         titleRu: 'Mathematics (中) — Dec 2025',   date: '2025-12-21', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 312 },
  { id: 'math-zh-2026-01', subjectSlug: 'math-zh',         titleRu: 'Mathematics (中) — Jan 2026',   date: '2026-01-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  83 },
  { id: 'math-zh-2026-03', subjectSlug: 'math-zh',         titleRu: 'Mathematics (中) — Mar 2026',   date: '2026-03-15', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:   0 },
  { id: 'math-zh-2026-04', subjectSlug: 'math-zh',         titleRu: 'Mathematics (中) — Apr 2026',   date: '2026-04-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 157 },
  { id: 'phys-en-2025-12', subjectSlug: 'physics-en',      titleRu: 'Physics (EN) — Dec 2025',      date: '2025-12-21', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  66 },
  { id: 'phys-en-2026-01', subjectSlug: 'physics-en',      titleRu: 'Physics (EN) — Jan 2026',      date: '2026-01-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  64, sourceFile: 'Physics CSCA jan official test 2026 .pdf' },
  { id: 'phys-en-2026-03', subjectSlug: 'physics-en',      titleRu: 'Physics (EN) — Mar 2026',      date: '2026-03-15', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 170, sourceFile: 'Physics march official test 2026.pdf' },
  { id: 'phys-en-2026-04', subjectSlug: 'physics-en',      titleRu: 'Physics (EN) — Apr 2026',      date: '2026-04-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  82 },
  { id: 'phys-zh-2025-12', subjectSlug: 'physics-zh',      titleRu: 'Physics (中) — Dec 2025',       date: '2025-12-21', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount: 105 },
  { id: 'phys-zh-2026-01', subjectSlug: 'physics-zh',      titleRu: 'Physics (中) — Jan 2026',       date: '2026-01-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  31 },
  { id: 'phys-zh-2026-03', subjectSlug: 'physics-zh',      titleRu: 'Physics (中) — Mar 2026',       date: '2026-03-15', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  59 },
  { id: 'phys-zh-2026-04', subjectSlug: 'physics-zh',      titleRu: 'Physics (中) — Apr 2026',       date: '2026-04-25', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  88 },
  { id: 'math-en-mock-1',  subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Mock 1',    date: '2026-02-10', questionCount: 48, durationMinutes: 60, accessTier: 'free',         attemptsCount: 212, sourceFile: 'Math csca MOCK test 1.pdf' },
  { id: 'math-en-mock-2',  subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Mock 2',    date: '2026-04-02', questionCount: 48, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  97, sourceFile: 'Maths Mock test English .pdf' },
  { id: 'chem-en-2026-01', subjectSlug: 'chemistry-en',    titleRu: 'Chemistry (EN) — Jan 2026',    date: '2026-01-25', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  45 },
  { id: 'chem-en-2026-03', subjectSlug: 'chemistry-en',    titleRu: 'Chemistry (EN) — Mar 2026',    date: '2026-03-15', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  62 },
  { id: 'chem-zh-2026-01', subjectSlug: 'chemistry-zh',    titleRu: 'Chemistry (中) — Jan 2026',     date: '2026-01-25', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  28 },
  { id: 'chem-zh-2026-03', subjectSlug: 'chemistry-zh',    titleRu: 'Chemistry (中) — Mar 2026',     date: '2026-03-15', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  33 },
  { id: 'hum-2026-01',     subjectSlug: 'humanities',      titleRu: 'Humanities — Jan 2026',        date: '2026-01-25', questionCount: 36, durationMinutes: 50, accessTier: 'subscription', attemptsCount:  19 },
  { id: 'hum-2026-03',     subjectSlug: 'humanities',      titleRu: 'Humanities — Mar 2026',        date: '2026-03-15', questionCount: 36, durationMinutes: 50, accessTier: 'subscription', attemptsCount:  24 },
  { id: 'nat-2026-01',     subjectSlug: 'natural-science', titleRu: 'Natural Sci. — Jan 2026',      date: '2026-01-25', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  12 },
  { id: 'nat-2026-03',     subjectSlug: 'natural-science', titleRu: 'Natural Sci. — Mar 2026',      date: '2026-03-15', questionCount: 40, durationMinutes: 60, accessTier: 'subscription', attemptsCount:  17 },
  { id: 'math-en-all',     subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — All Topics Review', date: '2026-05-01', questionCount: 60, durationMinutes: 90, accessTier: 'subscription', attemptsCount: 41, sourceFile: 'Math official all topics.pdf' },
  { id: 'math-en-pre',     subjectSlug: 'math-en',         titleRu: 'Mathematics (EN) — Pre-test Drill',    date: '2025-11-20', questionCount: 30, durationMinutes: 45, accessTier: 'free',         attemptsCount: 304 },
  { id: 'phys-en-drill',   subjectSlug: 'physics-en',      titleRu: 'Physics (EN) — Mock Drill',            date: '2026-02-14', questionCount: 30, durationMinutes: 45, accessTier: 'free',         attemptsCount: 156 },
  { id: 'chem-en-drill',   subjectSlug: 'chemistry-en',    titleRu: 'Chemistry (EN) — Mock Drill',          date: '2026-02-20', questionCount: 30, durationMinutes: 45, accessTier: 'free',         attemptsCount:  88 },
  { id: 'hum-drill',       subjectSlug: 'humanities',      titleRu: 'Humanities — Mock Drill',              date: '2026-02-28', questionCount: 24, durationMinutes: 35, accessTier: 'free',         attemptsCount:  47 },
  { id: 'nat-drill',       subjectSlug: 'natural-science', titleRu: 'Natural Sci. — Mock Drill',            date: '2026-03-04', questionCount: 30, durationMinutes: 45, accessTier: 'free',         attemptsCount:  39 },
];
