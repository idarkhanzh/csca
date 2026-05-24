import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, GraduationCap, Layers, ListChecks, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import MarketingHeader from '../components/layout/MarketingHeader';
import MarketingFooter from '../components/layout/MarketingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      {/* HERO */}
      <section className="border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24">
          <div className="grid grid-cols-12 gap-10 items-start">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                <span>Крупнейшая база реальных заданий CSCA</span>
                <span className="h-px w-12 bg-navy-200 hidden md:block" />
                <span className="hidden md:inline">Математика · Логика · Чтение</span>
              </div>
              <h1 className="mt-6 font-extrabold tracking-tight text-ink leading-[0.98] text-[56px] md:text-[76px]">
                Реальные тесты.
                <br />
                Подготовка с нуля.
                <br />
                <span className="text-navy-800">Твой грант в топовый вуз Китая.</span>
              </h1>
              <p className="mt-6 max-w-xl text-ink-muted text-base leading-relaxed">
                Единственная платформа с эксклюзивной базой реальных прошлых заданий
                CSCA и структурированной программой подготовки. Учись по разобранным
                модулям и проверяй себя в симуляторе экзамена.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/app/exams" className="btn-primary px-6 py-3 text-sm">
                  Открыть базу заданий <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/app/pathway" className="btn-secondary px-6 py-3 text-sm">
                  Программа подготовки
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-ink-muted">
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 32+ официальных экзамена</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Объяснения на русском</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Симулятор как на реальном тесте</div>
              </div>
            </div>

            {/* preview card */}
            <div className="col-span-12 lg:col-span-5">
              <div className="card p-1.5">
                <div className="rounded-xl bg-surface-alt p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">База заданий</div>
                    <span className="chip">32 экзамена</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Math (EN) — Mar 2026', count: '48 вопр.' },
                      { label: 'Physics (EN) — Jan 2026', count: '48 вопр.' },
                      { label: 'Math (中) — Apr 2026', count: '48 вопр.' },
                      { label: 'Chemistry (EN) — Mar 2026', count: '40 вопр.' },
                    ].map((c) => (
                      <div key={c.label} className="card p-4">
                        <div className="text-[10px] uppercase tracking-wider text-ink-subtle">Mathematics</div>
                        <div className="mt-1 text-sm font-semibold text-ink leading-snug">{c.label}</div>
                        <div className="mt-2 text-[11px] text-ink-muted">{c.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS CSCA */}
      <section className="border-b border-navy-100 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="label">Что такое CSCA</div>
            <h2 className="mt-3 text-3xl font-extrabold text-ink leading-tight">Единый экзамен для поступления на грант в Китай</h2>
          </div>
          <div className="col-span-12 md:col-span-8 grid sm:grid-cols-2 gap-5">
            {[
              { Icon: GraduationCap, title: 'Обязательный экзамен', text: 'CSCA проводится для большинства программ грантов CSC и стипендий ведущих университетов Китая.' },
              { Icon: ShieldCheck,  title: 'Высокая планка',         text: 'Без структурированной подготовки шанс на топ-вузы резко падает — нужен системный подход.' },
              { Icon: Layers,       title: 'Несколько предметов',    text: 'Математика, физика, химия, гуманитарные и естественные науки на английском и китайском.' },
              { Icon: Timer,        title: 'Жёсткий формат',         text: 'Около 48 вопросов за 60 минут. Один правильный ответ, без частичных баллов.' },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-800"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-bold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="max-w-2xl">
            <div className="label">Как работает платформа</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink leading-tight">
              Не сборник PDF, а живая программа подготовки
            </h2>
            <p className="mt-3 text-ink-muted">
              Мы разобрали реальные задания CSCA и превратили их в модули, уроки и квизы.
              Студент учится по теме, отрабатывает практику и проверяет себя на полном экзамене в симуляторе.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { step: '01', Icon: BookOpen, title: 'Учись по модулям', text: 'Алгебра, тригонометрия, динамика, термодинамика — каждый модуль начинается с короткой теории и примеров.' },
              { step: '02', Icon: ListChecks, title: 'Отрабатывай практику', text: 'После каждого урока — практика и квиз. Решения и подсказки на русском.' },
              { step: '03', Icon: Sparkles, title: 'Проверь себя в симуляторе', text: 'Полноценный экзаменационный режим: таймер, навигация по вопросам, разбор ошибок после сдачи.' },
            ].map((s) => (
              <div key={s.step} className="card p-6">
                <div className="flex items-center gap-3 text-ink-muted text-xs font-semibold">
                  <span className="rounded-md bg-navy-50 px-2 py-0.5 text-navy-800">{s.step}</span>
                  <s.Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STRUCTURED */}
      <section className="border-b border-navy-100 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="label">Почему структурированно</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink leading-tight">
              PDF — это не подготовка. Это исходный материал.
            </h2>
            <p className="mt-4 text-ink-muted">
              Скачать стопку PDF и «читать всё подряд» — самый частый путь к провалу.
              Мы превращаем сырые материалы в карту знаний, чтобы не было ощущения, что ты ничего не успеваешь.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {['Понятно, что учить и в какой последовательности', 'Каждая тема заканчивается практикой и проверкой', 'Прогресс виден в дашборде, а не «где-то в тетрадке»', 'Симулятор готовит к стрессу настоящего экзамена'].map((t) => (
                <div key={t} className="flex items-start gap-2 text-ink">
                  <Check className="h-4 w-4 mt-0.5 text-emerald-600" /> <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: 'PDF-подход', v: ['Хаотичный порядок', 'Нет проверки', 'Нет прогресса'], bad: true },
                { k: 'CSCA Prep', v: ['Модули и уроки', 'Квиз после каждой темы', 'Симулятор и аналитика'], bad: false },
              ].map((col) => (
                <div key={col.k} className={`rounded-xl p-5 ${col.bad ? 'bg-rose-50/60' : 'bg-emerald-50/60'}`}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{col.k}</div>
                  <ul className="mt-3 space-y-2 text-sm text-ink">
                    {col.v.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className={col.bad ? 'text-rose-500' : 'text-emerald-600'}>•</span> {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="max-w-2xl">
            <div className="label">Предметы</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink leading-tight">Покрываем все предметы CSCA</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              ['Math (EN)', 'Algebra · Functions · Geometry'],
              ['Math (中)', 'Программа на китайском'],
              ['Physics (EN)', 'Mechanics · Electricity · Waves'],
              ['Physics (中)', 'Программа на китайском'],
              ['Chemistry (EN)', 'Reactions · Stoichiometry'],
              ['Chemistry (中)', 'Программа на китайском'],
              ['Humanities', 'История · Чтение'],
              ['Natural Sci.', 'Биология · География'],
            ].map(([title, sub]) => (
              <div key={title} className="card p-5">
                <div className="text-[10px] uppercase tracking-wider text-ink-subtle">Предмет</div>
                <div className="mt-1 text-base font-bold text-ink">{title}</div>
                <div className="mt-1 text-xs text-ink-muted">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-navy-100 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="max-w-2xl">
            <div className="label">Доступ</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink leading-tight">Бесплатно или с подпиской</h2>
            <p className="mt-3 text-ink-muted">Начни без оплаты. Полный доступ к официальным экзаменам и продвинутым модулям активируется по подписке через администратора.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="card p-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Free</div>
              <div className="mt-2 text-3xl font-extrabold text-ink">0 ₽<span className="text-base text-ink-muted font-medium"> / навсегда</span></div>
              <ul className="mt-5 space-y-2.5 text-sm text-ink">
                {['Демо-доступ к платформе', 'Базовые модули и уроки', 'Несколько пробных экзаменов', 'Симулятор с короткими сессиями'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-emerald-600" /> {t}</li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary mt-7 w-full">Начать бесплатно</Link>
            </div>
            <div className="card p-7 border-2 border-navy-800 relative">
              <span className="chip absolute -top-3 left-7 bg-navy-800 text-white border-navy-800">Рекомендуем</span>
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Подписка</div>
              <div className="mt-2 text-3xl font-extrabold text-ink">Полный доступ</div>
              <ul className="mt-5 space-y-2.5 text-sm text-ink">
                {['Все официальные экзамены CSCA', 'Продвинутые модули по всем предметам', 'Симулятор полного экзамена', 'Сохранение прогресса и закладки'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-emerald-600" /> {t}</li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary mt-7 w-full">Попробовать бесплатно</Link>
              <div className="mt-3 text-xs text-ink-muted text-center">Подписка активируется администратором.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="label">Начать сейчас</div>
          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold text-ink leading-[1.05] max-w-3xl">
            Экзамен CSCA уже стал обязательным.
            <br /> Хватит тратить время на поиск материалов.
          </h2>
          <div className="mt-10">
            <Link to="/register" className="btn-primary px-6 py-3">
              Начать подготовку бесплатно <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
