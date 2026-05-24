import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, ClipboardList, FlaskConical, Sparkles, Target } from 'lucide-react';
import DashboardStats from '../../components/ui/DashboardStats';
import ProgressBar from '../../components/ui/ProgressBar';
import { SUBJECTS } from '../../data/subjects';
import { LESSONS } from '../../data/pathway';
import { computeReadiness, getAttempts, getCompletedLessons, lessonsCompletedCount, questionsSolvedCount, subjectReadiness } from '../../lib/progress';
import { useAuth } from '../../lib/auth';
import { useMemo } from 'react';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export default function DashboardPage() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] || 'друг';
  const readiness = useMemo(() => computeReadiness(), []);
  const completed = useMemo(() => getCompletedLessons(), []);
  const recentAttempts = useMemo(() => getAttempts().slice(0, 4), []);

  const nextLesson = LESSONS.find((l) => !completed[l.id]) || LESSONS[0];

  const subjectsTop = SUBJECTS.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Дашборд</div>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">Добро пожаловать, {firstName}</h1>
        <p className="mt-1 text-ink-muted text-sm">Краткий обзор подготовки — продолжай движение по программе.</p>
      </div>

      <DashboardStats items={[
        { label: 'Готовность к CSCA',  value: `${readiness}%`,                Icon: Target,        sub: 'на основе уроков и квизов' },
        { label: 'Пройдено модулей',   value: lessonsCompletedCount(),         Icon: BookOpen,      sub: `из ${LESSONS.length} доступных` },
        { label: 'Решено вопросов',    value: questionsSolvedCount(),          Icon: ClipboardList, sub: 'за последние сессии' },
        { label: 'Серия дней',         value: '5',                             Icon: Sparkles,      sub: 'не прерывай ритм' },
      ]} />

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Continue */}
        <div className="lg:col-span-2 card p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="label">Продолжить обучение</div>
              <h2 className="mt-2 text-xl font-bold text-ink">{nextLesson?.titleRu || 'Все уроки пройдены 🎉'}</h2>
              <p className="mt-1 text-sm text-ink-muted">{nextLesson ? `Модуль · ~${nextLesson.estimatedMinutes} мин чтения и практики` : 'Можно переходить к симулятору.'}</p>
            </div>
            <div className="hidden md:grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-navy-800 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            {nextLesson ? (
              <Link to={`/app/pathway/${nextLesson.id}`} className="btn-primary">
                Продолжить <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/app/simulator" className="btn-primary">К симулятору <ArrowRight className="h-4 w-4" /></Link>
            )}
            <Link to="/app/pathway" className="btn-secondary">Вся программа</Link>
          </div>
        </div>

        {/* Recommended simulator */}
        <div className="card p-7 flex flex-col">
          <div className="label">Рекомендация</div>
          <h3 className="mt-2 text-lg font-bold text-ink leading-snug">Прогон в симуляторе</h3>
          <p className="mt-1 text-sm text-ink-muted">Короткая сессия 20 вопросов поможет проверить готовность сегодня.</p>
          <div className="mt-auto pt-5">
            <Link to="/app/simulator" className="btn-primary w-full">
              <FlaskConical className="h-4 w-4" /> Запустить
            </Link>
          </div>
        </div>
      </div>

      {/* Subject progress */}
      <div className="card p-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="label">Прогресс по предметам</div>
            <h3 className="mt-1 text-lg font-bold text-ink">5 ключевых направлений</h3>
          </div>
          <Link to="/app/pathway" className="text-sm font-semibold text-navy-800 hover:underline">Открыть программу →</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjectsTop.map((s) => {
            const pct = subjectReadiness(s.slug);
            return (
              <Link key={s.slug} to={`/app/pathway?subject=${s.slug}`} className="card p-5 hover:border-navy-300 transition-colors">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.shortEn}
                </div>
                <div className="mt-2 text-base font-bold text-ink">{s.nameRu}</div>
                <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
                  <span>Готовность</span>
                  <span className="font-semibold text-ink">{pct}%</span>
                </div>
                <ProgressBar value={pct} className="mt-1.5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="card p-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="label">Последняя активность</div>
            <h3 className="mt-1 text-lg font-bold text-ink">Что ты решал недавно</h3>
          </div>
        </div>
        {recentAttempts.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-navy-200 bg-surface-alt p-6 text-sm text-ink-muted">
            Пока пусто. Пройди первый урок или запусти симулятор — здесь появятся результаты.
          </div>
        ) : (
          <div className="mt-6 divide-y divide-navy-100">
            {recentAttempts.map((a) => (
              <div key={a.id} className="flex items-center gap-4 py-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{a.title}</div>
                  <div className="text-xs text-ink-muted">{a.mode === 'exam' ? 'Экзамен' : a.mode === 'simulator' ? 'Симулятор' : 'Квиз'} · {formatDate(a.completedAt)}</div>
                </div>
                <div className="text-sm font-bold text-ink">{a.score} / {a.total}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
