import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EXAMS } from '../../data/exams';
import { SUBJECT_MAP } from '../../data/subjects';
import { pickQuestions } from '../../lib/sample';
import QuestionRenderer from '../../components/ui/QuestionRenderer';
import Timer from '../../components/ui/Timer';
import Paywall from '../../components/ui/Paywall';
import { useAuth } from '../../lib/auth';
import { saveAttempt, toggleBookmark, getBookmarks } from '../../lib/progress';

export default function ExamRunnerPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { hasSubscription } = useAuth();
  const exam = EXAMS.find((e) => e.id === examId);

  const questions = useMemo(
    () => (exam ? pickQuestions([exam.subjectSlug], exam.questionCount, exam.id) : []),
    [exam],
  );

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookmarks, setBookmarks] = useState<Record<string, true>>(() => getBookmarks());

  if (!exam) {
    return (
      <div className="card p-10 text-center">
        <h2 className="text-lg font-bold text-ink">Экзамен не найден</h2>
        <Link to="/app/exams" className="btn-primary mt-4 inline-flex">К базе заданий</Link>
      </div>
    );
  }

  if (exam.accessTier === 'subscription' && !hasSubscription) {
    return (
      <div className="space-y-4">
        <Link to="/app/exams" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> Назад</Link>
        <Paywall />
      </div>
    );
  }

  const meta = SUBJECT_MAP[exam.subjectSlug];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctKey ? 1 : 0), 0);
  const q = questions[idx];

  function setAnswer(key: string) {
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.id]: key }));
  }
  function bookmark() {
    if (!q) return;
    const next = toggleBookmark(q.id);
    setBookmarks((b) => {
      const c = { ...b };
      if (next) c[q.id] = true; else delete c[q.id];
      return c;
    });
  }

  function submit() {
    setSubmitted(true);
    saveAttempt({
      id: `att-${Date.now()}`,
      mode: 'exam',
      subjectSlug: exam!.subjectSlug,
      title: exam!.titleRu,
      score,
      total,
      durationSeconds: exam!.durationMinutes * 60,
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
            <div className="text-xs uppercase tracking-wider text-ink-subtle">{meta?.shortEn}</div>
            <h2 className="mt-1 text-2xl font-extrabold text-ink">Результат: {score} / {total}</h2>
            <p className="mt-1 text-sm text-ink-muted">Точность {Math.round((score / Math.max(1, total)) * 100)}% · {exam.titleRu}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setSubmitted(false); setAnswers({}); setIdx(0); }} className="btn-secondary"><RotateCcw className="h-4 w-4" /> Перепройти</button>
            <Link to="/app/exams" className="btn-primary">К базе заданий</Link>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <QuestionRenderer
              key={q.id}
              question={q}
              index={i}
              total={total}
              answer={answers[q.id]}
              onAnswer={() => {}}
              showResult
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/app/exams" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> Назад</Link>
        <div className="text-xs text-ink-subtle">·</div>
        <div className="text-sm text-ink-muted">{exam.titleRu}</div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block text-xs text-ink-muted">{answeredCount} / {total} отвечено</div>
          <Timer durationSeconds={exam.durationMinutes * 60} onElapsed={submit} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          {q && (
            <QuestionRenderer
              question={q}
              index={idx}
              total={total}
              answer={answers[q.id]}
              onAnswer={setAnswer}
              bookmarked={Boolean(bookmarks[q.id])}
              onBookmark={bookmark}
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
