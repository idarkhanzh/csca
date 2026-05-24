import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { useMemo } from 'react';
import { SUBJECTS } from '../../data/subjects';
import { LESSONS, MODULES, lessonsByModule, modulesBySubject } from '../../data/pathway';
import type { SubjectSlug } from '../../types/database';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { getCompletedLessons, subjectReadiness } from '../../lib/progress';
import { useAuth } from '../../lib/auth';

const PATHWAY_SUBJECTS: SubjectSlug[] = ['math-en', 'physics-en', 'chemistry-en'];

export default function PathwayPage() {
  const { hasSubscription } = useAuth();
  const [params, setParams] = useSearchParams();
  const subject = (params.get('subject') as SubjectSlug | null) ?? 'math-en';

  const completed = useMemo(() => getCompletedLessons(), []);

  const modules = modulesBySubject(subject);

  function changeSubject(s: SubjectSlug) {
    const p = new URLSearchParams(params);
    p.set('subject', s);
    setParams(p);
  }

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-extrabold text-ink">Подготовка с нуля</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {MODULES.length} модулей · {LESSONS.length} уроков · программа построена по разбору реальных заданий CSCA.
        </p>
      </div>

      {/* Subject switcher */}
      <div className="flex flex-wrap gap-2">
        {PATHWAY_SUBJECTS.map((slug) => {
          const meta = SUBJECTS.find((s) => s.slug === slug)!;
          const active = subject === slug;
          return (
            <button
              key={slug}
              onClick={() => changeSubject(slug)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                active ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-ink-muted border-navy-100 hover:text-ink'
              }`}
            >
              {meta.nameRu}
            </button>
          );
        })}
      </div>

      {/* Subject summary */}
      <div className="card p-6 flex items-center gap-6">
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Готовность по предмету</div>
          <div className="mt-2 text-2xl font-extrabold text-ink">{subjectReadiness(subject)}%</div>
          <ProgressBar value={subjectReadiness(subject)} className="mt-3 max-w-md" />
        </div>
        <div className="hidden md:block text-xs text-ink-muted">
          Совет: проходи модули по порядку — каждый строится на предыдущем.
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((m) => {
          const lessons = lessonsByModule(subject, m.slug);
          const done = lessons.filter((l) => completed[l.id]).length;
          const pct = lessons.length === 0 ? 0 : Math.round((done / lessons.length) * 100);
          const locked = m.accessTier === 'subscription' && !hasSubscription;

          return (
            <div key={`${subject}-${m.slug}`} className="card overflow-hidden">
              <div className="p-6 flex items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-ink">{m.titleRu}</h3>
                    {locked ? <Badge variant="subscription"><Lock className="h-3 w-3" /> Подписка</Badge> : <Badge variant="free">Free</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-ink-muted max-w-2xl">{m.descriptionRu}</p>
                  <div className="mt-4 flex items-center gap-4 max-w-md">
                    <ProgressBar value={pct} />
                    <span className="text-xs text-ink-muted whitespace-nowrap">{done} / {lessons.length}</span>
                  </div>
                </div>
              </div>

              {lessons.length > 0 && (
                <ul className="divide-y divide-navy-100 border-t border-navy-100">
                  {lessons.map((l) => {
                    const lessonLocked = l.accessTier === 'subscription' && !hasSubscription;
                    const isDone = Boolean(completed[l.id]);
                    return (
                      <li key={l.id}>
                        <Link
                          to={`/app/pathway/${l.id}`}
                          className="flex items-center gap-4 px-6 py-3.5 hover:bg-surface-alt transition-colors"
                        >
                          <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ${
                            isDone ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-800'
                          }`}>
                            {isDone ? '✓' : '·'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-ink truncate">{l.titleRu}</div>
                            <div className="text-[11px] text-ink-muted">~{l.estimatedMinutes} мин · теория + практика</div>
                          </div>
                          {lessonLocked && <Lock className="h-4 w-4 text-ink-subtle" />}
                          <ChevronRight className="h-4 w-4 text-ink-subtle" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
