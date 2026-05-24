import { FormEvent, useState } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { getSupabase } from '../../lib/supabase';
import Badge from '../../components/ui/Badge';

export default function SettingsPage() {
  const { profile, email, signOut, hasSubscription, refresh, configured } = useAuth();
  const navigate = useNavigate();
  const supabase = getSupabase();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [locale, setLocale] = useState<'ru' | 'en'>(profile?.locale || 'ru');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!supabase || !profile) return;
    setSaving(true);
    await supabase.from('profiles').update({ full_name: fullName, locale }).eq('id', profile.id);
    await refresh();
    setSaving(false);
    setSavedAt(Date.now());
  }

  async function logout() {
    await signOut();
    navigate('/login', { replace: true });
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold text-ink">Настройки</h1>
        <p className="mt-1 text-sm text-ink-muted">Профиль, язык интерфейса и статус подписки.</p>
      </div>

      <form onSubmit={save} className="card p-7 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Имя</label>
            <input className="input mt-1.5" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Имя Фамилия" />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input mt-1.5 bg-surface-soft text-ink-muted" value={email || ''} disabled />
          </div>
          <div>
            <label className="label">Язык интерфейса</label>
            <select className="input mt-1.5" value={locale} onChange={(e) => setLocale(e.target.value as 'ru' | 'en')}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary" disabled={!configured || saving}>{saving ? 'Сохраняем…' : 'Сохранить'}</button>
          {savedAt && <span className="text-xs text-emerald-700">Сохранено</span>}
          {!configured && <span className="text-xs text-ink-muted">Сохранение доступно при подключённом Supabase.</span>}
        </div>
      </form>

      <div className="card p-7">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-800">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-ink">Статус подписки</div>
            <div className="text-xs text-ink-muted">Подписка активируется администратором вручную.</div>
          </div>
          {hasSubscription
            ? <Badge variant="success">Подписка активна</Badge>
            : <Badge variant="neutral">Free</Badge>}
        </div>
        <div className="mt-5 rounded-xl border border-dashed border-navy-200 bg-surface-alt p-4 text-xs text-ink-muted">
          Чтобы открыть полный доступ к официальным экзаменам и продвинутым модулям, свяжитесь с
          администратором. Пример SQL для активации:
          <pre className="mt-2 rounded-lg bg-navy-950 p-3 font-mono text-[11px] text-white overflow-x-auto">
{`UPDATE profiles
SET has_subscription = true, subscription_status = 'active'
WHERE email = '${email || 'student@example.com'}';`}
          </pre>
        </div>
      </div>

      <div className="card p-7">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-semibold text-ink">Выйти из аккаунта</div>
            <div className="text-xs text-ink-muted">Сессия закроется на этом устройстве.</div>
          </div>
          <button onClick={logout} className="btn-secondary"><LogOut className="h-4 w-4" /> Выйти</button>
        </div>
      </div>
    </div>
  );
}
