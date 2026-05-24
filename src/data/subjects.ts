import type { SubjectSlug } from '../types/database';

export interface SubjectMeta {
  slug: SubjectSlug;
  nameRu: string;
  shortRu: string;
  shortEn: string;
  language: 'en' | 'zh';
  color: string;
  description: string;
}

export const SUBJECTS: SubjectMeta[] = [
  { slug: 'math-en',         nameRu: 'Математика (EN)',     shortRu: 'Math EN',   shortEn: 'Math (EN)',     language: 'en', color: '#172446', description: 'Алгебра, функции, геометрия, вероятность.' },
  { slug: 'math-zh',         nameRu: 'Математика (中)',      shortRu: 'Math 中',   shortEn: 'Math (中)',      language: 'zh', color: '#1f2f5e', description: 'Аналог английской версии, подача на китайском.' },
  { slug: 'physics-en',      nameRu: 'Физика (EN)',         shortRu: 'Phys EN',   shortEn: 'Physics (EN)',  language: 'en', color: '#1e3a8a', description: 'Механика, электричество, термодинамика.' },
  { slug: 'physics-zh',      nameRu: 'Физика (中)',          shortRu: 'Phys 中',   shortEn: 'Physics (中)',   language: 'zh', color: '#1e40af', description: 'Полный курс физики на китайском.' },
  { slug: 'chemistry-en',    nameRu: 'Химия (EN)',          shortRu: 'Chem EN',   shortEn: 'Chemistry (EN)',language: 'en', color: '#312e81', description: 'Реакции, стехиометрия, растворы.' },
  { slug: 'chemistry-zh',    nameRu: 'Химия (中)',           shortRu: 'Chem 中',   shortEn: 'Chemistry (中)', language: 'zh', color: '#3730a3', description: 'Полный курс химии на китайском.' },
  { slug: 'humanities',      nameRu: 'Гуманитарные науки',  shortRu: 'Hum',       shortEn: 'Humanities',    language: 'en', color: '#334155', description: 'История, обществознание, чтение.' },
  { slug: 'natural-science', nameRu: 'Естественные науки',  shortRu: 'Nat. Sci.', shortEn: 'Natural Sci.',  language: 'en', color: '#0f172a', description: 'Биология, география, экология.' },
];

export const SUBJECT_MAP: Record<SubjectSlug, SubjectMeta> = SUBJECTS.reduce(
  (acc, s) => { acc[s.slug] = s; return acc; },
  {} as Record<SubjectSlug, SubjectMeta>,
);
