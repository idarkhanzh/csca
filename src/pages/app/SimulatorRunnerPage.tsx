import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import QuestionRenderer from '../../components/ui/QuestionRenderer';
import Timer from '../../components/ui/Timer';
import { pickQuestions } from '../../lib/sample';
import { saveAttempt } from '../../lib/progress';
import { SUBJECT_MAP, SUBJECTS } from '../../data/subjects';
import type { SubjectSlug } from '../../types/database';

export default function SimulatorRunnerPage() {
  const [params] = useSearchParams();
  const subjectParam = (params.get('subject') || 'all') as SubjectSlug | 'all';
  const language = params.get('language') || 'en';
  const count = Math.max(5, Math.min(60, Number(params.get('count') || 20)));
  const duration = Math.max(5, Math.min(120, Number(params.get('duration') || 30)));

  const subjectsForPool: SubjectSlug[] | 'all' = useMemo(() => {
    if (subjectParam === 'all') {
      if (language === 'any') return 'all';
      return SUBJECTS.filter((s) => s.language === language).map((s) => s.slug);
    }
    return [subjectParam];
  }, [subjectParam, language]);

  const salt = `sim-${subjectParam}-${language}-${count}-${duration}`;
  const questions = useMemo(() => pickQuestions(subjectsForPool, count, salt), [subjectsForPool, count, salt]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const total = questions.length;
  const q = questions[idx];
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((acc, qq) => acc + (answers[qq.id] === qq.correctKey ? 1 : 0), 0);

  function submit() {
    setSubmitted(true);
    const titleSubject = subjectParam === 'all' ? 'Все предметы' : SUBJECT_MAP[subjectParam]?.nameRu || subjectParam;
    saveAttempt({
      id: `att-sim-${Date.now()}`,
      mode: 'simulator',
      subjectSlug: subjectParam === 'all' ? 'math-en' : subjectParam,
      title: `Симулятор · ${titleSubject} · ${total} вопр.`,
      score,
      total,
      durationSeconds: duration * 60,
      completedAt: new Date().toISOString(),
    });
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="card p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-ink-subtle">Симулятор</div>
            <h2 className="mt-1 text-2xl font-extrabold text-ink">Результат: {score} / {total}</h2>
            <p className="mt-1 text-sm text-ink-muted">Точность {Math.round((score / Math.max(1, total)) * 100)}% · разобрать ошибки в списке ниже</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setSubmitted(false); setAnswers({}); setIdx(0); }} className="btn-secondary"><RotateCcw className="h-4 w-4" /> Перепройти</button>
            <Link to="/app/simulator" className="btn-primary">Новая сессия</Link>
          </div>
        </div>
        <div className="space-y-4">
          {questions.map((qq, i) => (
            <QuestionRenderer key={qq.id} question={qq} index={i} total={total} answer={answers[qq.id]} onAnswer={() => {}} showResult />
          ))}
        </div>
      </div>
    );
  }

  const root = fullscreen ? 'fixed inset-0 z-50 bg-surface-alt overflow-y-auto p-6' : 'space-y-6';

  return (
    <div className={root}>
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/app/simulator" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> Выйти</Link>
        <span className="text-xs text-ink-subtle">·</span>
        <div className="text-sm text-ink-muted">Симулятор · {total} вопр.</div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block text-xs text-ink-muted">{answeredCount} / {total}</div>
          <Timer durationSeconds={duration * 60} onElapsed={submit} />
          <button onClick={() => setFullscreen((f) => !f)} className="btn-secondary px-2.5 py-1.5" aria-label="Fullscreen">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 mt-4">
        <div className="space-y-5">
          {q && (
            <QuestionRenderer
              question={q}
              index={idx}
              total={total}
              answer={answers[q.id]}
              onAnswer={(k) => setAnswers((a) => ({ ...a, [q.id]: k }))}
            />
          )}
          <div className="flex items-center justify-between">
            <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            {idx === total - 1 ? (
              <button onClick={submit} className="btn-primary">Завершить</button>
            ) : (
              <button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} className="btn-primary">
                Далее <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <aside className="card p-5 h-fit sticky top-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Навигация</div>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {questions.map((qq, i) => {
              const answered = Boolean(answers[qq.id]);
              const active = i === idx;
              return (
                <button
                  key={qq.id}
                  onClick={() => setIdx(i)}
                  className={`h-8 rounded-md text-[11px] font-semibold transition-colors ${
                    active ? 'bg-navy-800 text-white' :
                    answered ? 'bg-emerald-100 text-emerald-800' :
                    'bg-surface-soft text-ink-muted hover:bg-navy-50'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button onClick={submit} className="btn-primary w-full mt-5">Завершить и проверить</button>
        </aside>
      </div>
    </div>
  );
}
