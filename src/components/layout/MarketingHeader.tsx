import { Link, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';

const NAV = [
  { to: '/app/exams', label: 'База заданий' },
  { to: '/app/pathway', label: 'Подготовка с нуля' },
  { to: '/app/simulator', label: 'Симулятор' },
  { to: '/agencies', label: 'Агентствам' },
];

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-navy-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center gap-10">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-muted">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => isActive ? 'text-ink font-semibold' : 'hover:text-ink'}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/login" className="text-sm text-ink-muted hover:text-ink">Войти</Link>
          <Link to="/register" className="btn-primary text-sm">Попробовать бесплатно</Link>
        </div>
      </div>
    </header>
  );
}
