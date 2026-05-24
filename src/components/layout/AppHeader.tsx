import { Bell, Globe } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import ProgressBar from '../ui/ProgressBar';

export default function AppHeader({ greetingName, readiness }: { greetingName?: string; readiness?: number }) {
  const { profile } = useAuth();
  const name = greetingName || profile?.full_name?.split(' ')[0] || 'друг';
  const value = typeof readiness === 'number' ? readiness : 45;
  const initials = (profile?.full_name || profile?.email || 'У').trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-6 px-6 lg:px-8 py-4">
        <div className="text-sm text-ink-muted">
          С возвращением, <span className="font-semibold text-ink">{name}</span>
        </div>
        <div className="ml-auto flex items-center gap-5">
          <div className="hidden md:flex items-center gap-3 text-xs text-ink-muted">
            <span>Готовность к CSCA</span>
            <ProgressBar value={value} className="w-32" />
            <span className="font-semibold text-ink">{value}%</span>
          </div>
          <button className="btn-secondary px-3 py-1.5 text-xs gap-1">
            <Globe className="h-3.5 w-3.5" /> RU
          </button>
          <button className="relative rounded-full p-2 text-ink-muted hover:bg-surface-soft" aria-label="Уведомления">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-navy-100 text-navy-800 text-xs font-bold">{initials || 'У'}</div>
        </div>
      </div>
    </header>
  );
}
