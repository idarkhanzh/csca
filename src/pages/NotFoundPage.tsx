import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-surface-alt px-6">
      <div className="text-center max-w-md">
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">404</div>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">Страница не найдена</h1>
        <p className="mt-2 text-sm text-ink-muted">Возможно, ссылка устарела. Вернись на главную или открой дашборд.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="btn-secondary">На главную</Link>
          <Link to="/app/dashboard" className="btn-primary">К дашборду</Link>
        </div>
      </div>
    </div>
  );
}
