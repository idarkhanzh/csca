import { ArrowRight, FlaskConical } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '../../data/subjects';
import type { SubjectSlug } from '../../types/database';

export default function SimulatorPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectSlug | 'all'>('all');
  const [language, setLanguage] = useState<'en' | 'zh' | 'any'>('en');
  const [count, setCount] = useState(20);
  const [duration, setDuration] = useState(30);

  function start(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('subject', subject);
    params.set('language', language);
    params.set('count', String(count));
    params.set('duration', String(duration));
    navigate(`/app/simulator/run?${params.toString()}`);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-ink">Симулятор экзамена</h1>
        <p className="mt-1 text-sm text-ink-muted">Полноценный экзаменационный режим: таймер, навигация по вопросам, разбор ошибок в конце.</p>
      </div>

      <form onSubmit={start} className="card p-7 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Предмет</label>
            <select className="input mt-1.5" value={subject} onChange={(e) => setSubject(e.target.value as SubjectSlug | 'all')}>
              <option value="all">Все предметы</option>
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.nameRu}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Язык</label>
            <select className="input mt-1.5" value={language} onChange={(e) => setLanguage(e.target.value as 'en' | 'zh' | 'any')}>
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="any">Любой</option>
            </select>
          </div>
          <div>
            <label className="label">Количество вопросов</label>
            <div className="mt-1.5 flex items-center gap-3">
              {[10, 20, 30, 48].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    count === n ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-ink-muted border-navy-200 hover:text-ink'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Таймер, мин</label>
            <div className="mt-1.5 flex items-center gap-3">
              {[15, 30, 45, 60].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDuration(n)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    duration === n ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-ink-muted border-navy-200 hover:text-ink'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-navy-100 pt-5">
          <div className="text-xs text-ink-muted flex items-center gap-2">
            <FlaskConical className="h-4 w-4" /> {count} вопросов · {duration} мин · экзаменационный режим
          </div>
          <button type="submit" className="btn-primary">
            Начать симулятор <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="card p-6 text-sm text-ink-muted">
        <p>
          После завершения сессии ты увидишь правильные ответы и объяснения. Результат сохранится в дашборде
          и повлияет на общий показатель готовности к CSCA.
        </p>
      </div>
    </div>
  );
}
