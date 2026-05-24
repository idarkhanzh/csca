import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LESSONS, MODULES } from '../../data/pathway';
import { SUBJECT_MAP } from '../../data/subjects';
import { QUESTIONS } from '../../data/questions';
import Theory from '../../components/ui/Theory';
import QuestionRenderer from '../../components/ui/QuestionRenderer';
import Paywall from '../../components/ui/Paywall';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../lib/auth';
import { getCompletedLessons, markLessonComplete, saveAttempt } from '../../lib/progress';

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { hasSubscription } = useAuth();

  const lesson = LESSONS.find((l) => l.id === lessonId);
  const module = useMemo(
    () => (lesson ? MODULES.find((m) => m.subjectSlug === lesson.subjectSlug && m.slug === lesson.moduleSlug) : null),
    [lesson],
  );
  const practice = useMemo(
    () => (lesson ? QUESTIONS.filter((q) => lesson.questionIds.includes(q.id)) : []),
    [lesson],
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Reset per-lesson state when navigating to a different lesson — React Router
  // reuses the same component instance, so without this, the previous lesson's
  // answers + "submitted" state leaks into the next one.
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0 });
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="card p-10 text-center">
        <h2 className="text-lg font-bold text-ink">Урок не найден</h2>
        <Link to="/app/pathway" className="btn-primary mt-4 inline-flex">К программе</Link>
      </div>
    );
  }

  if (lesson.accessTier === 'subscription' && !hasSubscription) {
    return (
      <div className="space-y-4">
        <Link to="/app/pathway" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> Назад</Link>
        <Paywall />
      </div>
    );
  }

  const subjectMeta = SUBJECT_MAP[lesson.subjectSlug];
  const isCompleted = Boolean(getCompletedLessons()[lesson.id]);

  function submit() {
    setSubmitted(true);
    const score = practice.reduce((acc, q) => acc + (answers[q.id] === q.correctKey ? 1 : 0), 0);
    saveAttempt({
      id: `att-l-${Date.now()}`,
      mode: 'quiz',
      subjectSlug: lesson!.subjectSlug,
      title: `Практика: ${lesson!.titleRu}`,
      score,
      total: practice.length,
      durationSeconds: 0,
      completedAt: new Date().toISOString(),
    });
    markLessonComplete(lesson!.id);
  }

  function nextLesson() {
    const idx = LESSONS.findIndex((l) => l.id === lesson!.id);
    const next = LESSONS[idx + 1];
    if (next) navigate(`/app/pathway/${next.id}`);
    else navigate('/app/pathway');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm">
        <Link to="/app/pathway" className="inline-flex items-center gap-1 text-ink-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> {module?.titleRu || 'К программе'}</Link>
        <span className="text-ink-subtle">·</span>
        <span className="text-ink-muted">{subjectMeta?.nameRu}</span>
        {isCompleted && <Badge variant="success" className="ml-2"><CheckCircle2 className="h-3 w-3" /> Пройдено</Badge>}
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-ink leading-tight">{lesson.titleRu}</h1>
        <p className="mt-1 text-sm text-ink-muted">~{lesson.estimatedMinutes} мин · теория, разбор примеров и практика</p>
      </div>

      <article className="card p-7">
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Теория</div>
        <Theory markdown={lesson.theoryMd} />
      </article>

      {lesson.examples.length > 0 && (
        <article className="card p-7">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Разбор примеров</div>
          <div className="mt-3 space-y-4">
            {lesson.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-navy-100 bg-surface-alt p-5">
                <div className="text-xs font-semibold text-ink-muted">Пример {i + 1}</div>
                <div className="mt-1 text-sm font-semibold text-ink">{ex.prompt}</div>
                <div className="mt-2 text-sm text-ink"><span className="font-semibold">Решение:</span> {ex.solution}</div>
              </div>
            ))}
          </div>
        </article>
      )}

      {practice.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Практика</div>
              <h2 className="mt-1 text-xl font-bold text-ink">{practice.length} {practice.length === 1 ? 'вопрос' : 'вопроса'} для проверки</h2>
            </div>
            {submitted && (
              <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="btn-secondary">
                <RotateCcw className="h-4 w-4" /> Пройти ещё раз
              </button>
            )}
          </div>

          <div className="space-y-4">
            {practice.map((q, i) => (
              <QuestionRenderer
                key={q.id}
                question={q}
                index={i}
                total={practice.length}
                answer={answers[q.id]}
                onAnswer={(k) => setAnswers((a) => ({ ...a, [q.id]: k }))}
                showResult={submitted}
              />
            ))}
          </div>

          {!submitted ? (
            <button onClick={submit} className="btn-primary">Проверить ответы</button>
          ) : (
            <div className="card p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink">Урок отмечен как пройденный</div>
                <div className="text-xs text-ink-muted">Можно переходить к следующей теме.</div>
              </div>
              <button onClick={nextLesson} className="btn-primary">Следующий урок</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
