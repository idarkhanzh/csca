import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import SubjectFilter from '../../components/ui/SubjectFilter';
import ExamCard from '../../components/ui/ExamCard';
import { EXAMS } from '../../data/exams';
import type { SubjectSlug } from '../../types/database';
import { useAuth } from '../../lib/auth';

export default function ExamsPage() {
  const { hasSubscription } = useAuth();
  const [subject, setSubject] = useState<SubjectSlug | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXAMS.filter((e) => {
      if (subject !== 'all' && e.subjectSlug !== subject) return false;
      if (!q) return true;
      return e.titleRu.toLowerCase().includes(q);
    });
  }, [subject, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-ink">База заданий</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {EXAMS.length} официальных экзаменов CSCA · декабрь 2025 — апрель 2026
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <SubjectFilter value={subject} onChange={setSubject} />
        <div className="lg:ml-auto relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle" />
          <input
            className="input pl-9"
            placeholder="Поиск…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="text-xs text-ink-muted">Показано <span className="font-semibold text-ink">{filtered.length}</span> из {EXAMS.length}</div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e) => (
          <ExamCard key={e.id} exam={e} locked={e.accessTier === 'subscription' && !hasSubscription} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center text-ink-muted text-sm">
          Ничего не найдено. Попробуйте сменить предмет или очистить поиск.
        </div>
      )}
    </div>
  );
}
