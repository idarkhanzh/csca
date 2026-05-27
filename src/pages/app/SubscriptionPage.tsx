import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Check, ClipboardList, Crown, ExternalLink, FlaskConical, Infinity as InfinityIcon, Library, Sparkles, X } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import Badge from '../../components/ui/Badge';

const TG_RU = 'https://t.me/csca_manager';
const TG_KZ_KG = 'https://t.me/alikhan4ikm';

const FEATURES = [
  {
    Icon: Library,
    title: 'Все официальные экзамены CSCA',
    text: 'Полный доступ к 30+ реальным экзаменам с декабря 2025 по апрель 2026: Math, Physics, Chemistry, Humanities, Natural Science — на английском и китайском.',
  },
  {
    Icon: BookOpen,
    title: 'Продвинутые модули программы',
    text: 'Открываются все темы курса: функции и графики, последовательности, тригонометрия, геометрия, вероятность, динамика, электричество, термодинамика, стехиометрия и многое другое.',
  },
  {
    Icon: ClipboardList,
    title: 'Разбор каждого вопроса',
    text: 'После каждой попытки — пошаговое объяснение на русском. Видно, где именно ты ошибся и почему правильный ответ — именно тот.',
  },
  {
    Icon: FlaskConical,
    title: 'Полный симулятор экзамена',
    text: 'Сессии до 48 вопросов и 60 минут, как на реальном CSCA. Таймер, навигация по вопросам, режим экрана и полный разбор после сдачи.',
  },
  {
    Icon: Sparkles,
    title: 'Прогресс и аналитика',
    text: 'Сохранение прогресса по уроков, закладок, попыток. Готовность к экзамену по каждому предмету, серия дней подряд, последняя активность.',
  },
  {
    Icon: InfinityIcon,
    title: 'Пожизненный доступ',
    text: 'Один разовый платёж — вечный доступ к платформе. Никаких ежемесячных списаний и автоматических продлений. Все будущие обновления базы — включены.',
  },
];

export default function SubscriptionPage() {
  const { hasSubscription, email } = useAuth();
  const [open, setOpen] = useState(false);

  // close modal on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="space-y-7 max-w-5xl">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Подписка</div>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">Полный доступ к CSCA Prep</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Один платёж — пожизненный доступ ко всей платформе. Никаких подписочных списаний.
        </p>
      </div>

      {hasSubscription ? (
        <ActiveSubscriptionCard />
      ) : (
        <PurchaseCard onBuy={() => setOpen(true)} />
      )}

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Что входит</div>
        <h2 className="mt-1 text-xl font-bold text-ink">Что открывается после покупки</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {FEATURES.map(({ Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-800">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
            <Check className="h-5 w-5" />
          </div>
          <div className="text-sm text-ink-muted">
            <div className="text-base font-bold text-ink">Как происходит активация</div>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>Нажми «Купить» и выбери страну.</li>
              <li>Откроется чат в Telegram с менеджером.</li>
              <li>Сообщи email, на который зарегистрирован аккаунт{email ? <span> (<span className="font-semibold text-ink">{email}</span>)</span> : ''}, и оплати удобным способом.</li>
              <li>Менеджер активирует подписку — статус в твоём аккаунте обновится автоматически.</li>
            </ol>
          </div>
        </div>
      </section>

      {open && <CountryChoiceModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function PurchaseCard({ onBuy }: { onBuy: () => void }) {
  return (
    <div className="card p-7 md:p-8 border-2 border-navy-800 relative overflow-hidden">
      <span className="chip absolute -top-3 left-7 bg-navy-800 text-white border-navy-800">
        <Crown className="h-3 w-3" /> Лучшее предложение
      </span>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">CSCA Prep · Полный доступ</div>
          <div className="mt-4 flex items-baseline gap-4 flex-wrap">
            <div className="text-4xl md:text-5xl font-extrabold text-ink leading-none">3 000 ₽</div>
            <div className="text-2xl md:text-3xl font-bold text-ink leading-none">/ 15 000 ₸</div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="text-ink-subtle line-through">5 000 ₽ / 25 000 ₸</span>
            <Badge variant="warning">−40% сейчас</Badge>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <InfinityIcon className="h-3.5 w-3.5" /> Пожизненный доступ — один платёж
          </div>

          <ul className="mt-6 space-y-2.5 text-sm text-ink">
            {[
              'Все 30+ официальных экзаменов CSCA',
              'Все продвинутые модули по всем предметам',
              'Полный симулятор экзамена с разбором',
              'Прогресс, закладки и аналитика',
              'Все будущие обновления базы — включены',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button onClick={onBuy} className="btn-primary px-6 py-3 text-sm">
              Купить <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-xs text-ink-muted">Активация вручную в Telegram, ~5 минут</div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-alt border border-navy-100 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Сравнение</div>
          <div className="mt-3 space-y-3 text-sm">
            <Row label="Базовые модули" free check sub />
            <Row label="Несколько пробных экзаменов" free check sub />
            <Row label="Все официальные экзамены CSCA" sub />
            <Row label="Продвинутые модули" sub />
            <Row label="Симулятор полного экзамена" sub />
            <Row label="Разбор и аналитика" sub />
            <Row label="Пожизненный доступ" sub />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, free, sub }: { label: string; free?: boolean; sub?: boolean; check?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 text-ink">{label}</div>
      <div className="w-12 text-center">
        {free ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <span className="text-ink-subtle">—</span>}
      </div>
      <div className="w-12 text-center">
        {sub ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <span className="text-ink-subtle">—</span>}
      </div>
    </div>
  );
}

function ActiveSubscriptionCard() {
  return (
    <div className="card p-7 border-2 border-emerald-300">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Crown className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Статус</div>
          <h2 className="mt-1 text-xl font-extrabold text-ink">Подписка активна · пожизненный доступ</h2>
          <p className="mt-1 text-sm text-ink-muted">Все материалы, симулятор и будущие обновления открыты. Спасибо, что с нами!</p>
        </div>
        <Badge variant="success">Активна</Badge>
      </div>
    </div>
  );
}

function CountryChoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-elevated border border-navy-100 p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-ink-muted hover:text-ink hover:bg-surface-soft"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Шаг 1 из 1</div>
        <h2 className="mt-1 text-xl font-extrabold text-ink">Откуда ты оплачиваешь?</h2>
        <p className="mt-1 text-sm text-ink-muted">Это нужно, чтобы соединить тебя с правильным менеджером — у нас разные способы приёма платежей для разных стран.</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <a
            href={TG_RU}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-2 border-navy-100 hover:border-navy-800 transition-colors p-5 text-left group"
          >
            <div className="text-2xl">🇷🇺</div>
            <div className="mt-2 text-base font-bold text-ink">Россия</div>
            <div className="mt-1 text-xs text-ink-muted">Оплата 3 000 ₽ · карта РФ, СБП</div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">
              Открыть Telegram <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </a>
          <a
            href={TG_KZ_KG}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-2 border-navy-100 hover:border-navy-800 transition-colors p-5 text-left group"
          >
            <div className="text-2xl">🇰🇿 🇰🇬</div>
            <div className="mt-2 text-base font-bold text-ink">Казахстан / Кыргызстан</div>
            <div className="mt-1 text-xs text-ink-muted">Оплата 15 000 ₸ · Kaspi, перевод</div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">
              Открыть Telegram <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </a>
        </div>

        <div className="mt-6 text-xs text-ink-muted">
          После оплаты менеджер активирует подписку вручную — обычно в течение нескольких минут.
        </div>
      </div>
    </div>
  );
}
