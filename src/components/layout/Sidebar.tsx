import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, GraduationCap, FlaskConical, Settings, Flame } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../lib/auth';

const NAV = [
  { to: '/app/dashboard', label: 'Дашборд',           Icon: LayoutDashboard },
  { to: '/app/exams',     label: 'База заданий',      Icon: Library },
  { to: '/app/pathway',   label: 'Подготовка с нуля', Icon: GraduationCap },
  { to: '/app/simulator', label: 'Симулятор',         Icon: FlaskConical },
  { to: '/app/settings',  label: 'Настройки',         Icon: Settings },
];

export default function Sidebar() {
  const { profile } = useAuth();
  const initials = (profile?.full_name || profile?.email || 'У')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-navy-950 text-white">
      <div className="px-5 pt-6 pb-8">
        <div className="inline-flex items-center gap-2.5">
          <span className="grid place-items-center rounded-xl bg-white text-navy-950 font-extrabold h-8 w-8">c</span>
          <span className="font-extrabold tracking-tight text-white text-base">CSCA Prep</span>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                isActive ? 'bg-white/10 text-white font-semibold' : 'text-navy-200/80 hover:text-white hover:bg-white/5',
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4 text-sm">
          <div className="flex items-center gap-2 text-amber-300/90 font-semibold">
            <Flame className="h-4 w-4" /> 5 дн. подряд
          </div>
          <div className="mt-1 text-xs text-navy-200/70">Не прерывай серию!</div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white text-xs font-semibold">{initials || 'У'}</div>
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{profile?.full_name || 'Студент'}</div>
          <div className="text-[11px] text-navy-200/70 truncate">CSCA 2026</div>
        </div>
      </div>
    </aside>
  );
}
