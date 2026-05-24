import { Link } from 'react-router-dom';
import { Calendar, FileText, Lock, Users } from 'lucide-react';
import Badge from './Badge';
import type { ExamMeta } from '../../data/exams';
import { SUBJECT_MAP } from '../../data/subjects';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-');
}

export default function ExamCard({ exam, locked }: { exam: ExamMeta; locked: boolean }) {
  const meta = SUBJECT_MAP[exam.subjectSlug];
  return (
    <Link
      to={`/app/exams/${exam.id}`}
      className="card p-5 group hover:border-navy-300 hover:shadow-elevated transition-all flex flex-col h-full"
    >
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
        <span>{meta?.shortEn || exam.subjectSlug}</span>
        {locked ? <Lock className="h-3.5 w-3.5 text-ink-subtle" /> : <Badge variant="free">Free</Badge>}
      </div>
      <div className="mt-2 text-[15px] font-bold text-ink leading-snug">{exam.titleRu}</div>
      <div className="mt-auto pt-6 flex items-center gap-4 text-[11px] text-ink-muted">
        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(exam.date)}</span>
        <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> {exam.questionCount} вопр.</span>
        <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {exam.attemptsCount}</span>
      </div>
    </Link>
  );
}
