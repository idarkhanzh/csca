// Generate a pseudo-question set for an exam/simulator.
// The seeded question bank is small; we expand it deterministically so
// every exam/simulator session feels filled out without raw exam text.

import { QUESTIONS, type QuestionItem } from '../data/questions';
import type { SubjectSlug } from '../types/database';

export function pickQuestions(subjects: SubjectSlug[] | 'all', count: number, salt = 'default'): QuestionItem[] {
  const pool = subjects === 'all'
    ? QUESTIONS
    : QUESTIONS.filter((q) => subjects.includes(q.subjectSlug));
  if (pool.length === 0) return [];

  // simple hash-based shuffle for stability per (salt, count)
  const seed = Array.from(salt).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
  const order = pool
    .map((q, i) => ({ q, sort: ((i + 1) * seed * 9301 + 49297) % 233280 }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ q }) => q);

  const out: QuestionItem[] = [];
  for (let i = 0; i < count; i++) {
    const base = order[i % order.length];
    out.push({ ...base, id: `${base.id}-${i}` });
  }
  return out;
}
