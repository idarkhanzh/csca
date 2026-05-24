import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Paywall({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="card p-5 flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-800">
          <Lock className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-ink">Раздел доступен по подписке</div>
          <div className="text-xs text-ink-muted">Для открытия полного доступа свяжитесь с администратором.</div>
        </div>
        <Link to="/app/settings" className="btn-secondary text-xs">Перейти</Link>
      </div>
    );
  }
  return (
    <div className="card p-10 text-center max-w-xl mx-auto">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-800 mb-5">
        <Lock className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-extrabold text-ink">Этот раздел доступен по подписке</h2>
      <p className="mt-2 text-ink-muted">
        Чтобы открыть полный доступ к модулям, симулятору и официальным экзаменам,
        свяжитесь с администратором — мы активируем подписку вручную.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/app/dashboard" className="btn-secondary">Назад к дашборду</Link>
        <Link to="/app/settings" className="btn-primary">Открыть настройки</Link>
      </div>
    </div>
  );
}
