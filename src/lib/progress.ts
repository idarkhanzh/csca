// Local-first progress store backed by localStorage.
// Mirrors what `attempts` and `lesson_progress` would track in Supabase,
// so the app stays useful without a backend yet still works the same shape.

import { LESSONS } from '../data/pathway';
import type { SubjectSlug } from '../types/database';

const KEYS = {
  lessons: 'csca-prep:lessons-completed',
  attempts: 'csca-prep:attempts',
  bookmarks: 'csca-prep:bookmarks',
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export interface AttemptRecord {
  id: string;
  mode: 'exam' | 'quiz' | 'simulator';
  subjectSlug: SubjectSlug;
  title: string;
  score: number;
  total: number;
  durationSeconds: number;
  completedAt: string;
}

export function getCompletedLessons(): Record<string, true> {
  return read<Record<string, true>>(KEYS.lessons, {});
}
export function markLessonComplete(lessonId: string) {
  const m = getCompletedLessons();
  m[lessonId] = true;
  write(KEYS.lessons, m);
}

export function getAttempts(): AttemptRecord[] {
  return read<AttemptRecord[]>(KEYS.attempts, []);
}
export function saveAttempt(a: AttemptRecord) {
  const list = getAttempts();
  list.unshift(a);
  write(KEYS.attempts, list.slice(0, 50));
}

export function getBookmarks(): Record<string, true> {
  return read<Record<string, true>>(KEYS.bookmarks, {});
}
export function toggleBookmark(questionId: string) {
  const m = getBookmarks();
  if (m[questionId]) delete m[questionId];
  else m[questionId] = true;
  write(KEYS.bookmarks, m);
  return Boolean(m[questionId]);
}

export function lessonsCompletedCount(): number {
  return Object.keys(getCompletedLessons()).length;
}

export function questionsSolvedCount(): number {
  return getAttempts().reduce((acc, a) => acc + a.total, 0);
}

export function computeReadiness(): number {
  // Simple deterministic mix: lesson coverage + recent quiz accuracy.
  // Fresh user with zero progress legitimately gets 0%.
  const totalLessons = LESSONS.length || 1;
  const lessonCoverage = Math.min(1, lessonsCompletedCount() / totalLessons);

  const attempts = getAttempts().slice(0, 10);
  if (attempts.length === 0 && lessonsCompletedCount() === 0) return 0;

  const accuracy = attempts.length === 0
    ? 0
    : attempts.reduce((acc, a) => acc + (a.total ? a.score / a.total : 0), 0) / attempts.length;

  const mixed = 0.55 * lessonCoverage + 0.45 * accuracy;
  return Math.round(mixed * 100);
}

export function currentStreakDays(): number {
  // Count consecutive days (ending today) on which there's at least one attempt.
  const attempts = getAttempts();
  if (attempts.length === 0) return 0;

  const days = new Set(
    attempts.map((a) => new Date(a.completedAt).toISOString().slice(0, 10)),
  );

  let streak = 0;
  const cursor = new Date();
  // Allow today to be missing — start streak from "yesterday" only if today is empty.
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function subjectReadiness(slug: SubjectSlug): number {
  const subjectLessons = LESSONS.filter((l) => l.subjectSlug === slug);
  if (subjectLessons.length === 0) return 0;
  const done = subjectLessons.filter((l) => getCompletedLessons()[l.id]).length;
  const lessonShare = done / subjectLessons.length;

  const attempts = getAttempts().filter((a) => a.subjectSlug === slug).slice(0, 5);
  const accuracy = attempts.length === 0
    ? 0
    : attempts.reduce((acc, a) => acc + (a.total ? a.score / a.total : 0), 0) / attempts.length;

  return Math.round((0.6 * lessonShare + 0.4 * accuracy) * 100);
}
