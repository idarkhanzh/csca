import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../lib/auth';

export default function LoginPage() {
  const { signIn, loginDemo, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = (location.state as { from?: string } | null)?.from || '/app/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate(redirect, { replace: true });
  }

  function demo() {
    loginDemo();
    navigate(redirect, { replace: true });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-navy-950 text-white p-12">
        <Logo to="/" />
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">Готовься к CSCA по реальным заданиям и структурированным модулям.</h1>
          <p className="mt-4 text-navy-200/80 max-w-md">Войди в аккаунт, чтобы сохранять прогресс, отмечать закладки и проходить полный симулятор экзамена.</p>
        </div>
        <div className="text-xs text-navy-200/60">© 2026 CSCA Prep</div>
      </div>
      <div className="flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="lg:hidden mb-8"><Logo /></div>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-extrabold text-ink">Вход в аккаунт</h2>
          <p className="mt-1 text-sm text-ink-muted">Нет аккаунта? <Link to="/register" className="text-navy-800 font-semibold">Зарегистрироваться</Link></p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label">Email</label>
              <input className="input mt-1.5" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input className="input mt-1.5" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {error && <div className="text-xs text-rose-600">{error}</div>}
            <button className="btn-primary w-full" disabled={loading}>{loading ? 'Входим…' : 'Войти'}</button>
          </form>

          <div className="mt-6 text-center text-xs text-ink-muted">
            {configured ? 'Используем Supabase Auth' : 'Supabase не подключен — можно войти в демо-режим.'}
          </div>
          <button onClick={demo} className="btn-secondary w-full mt-3">Войти в демо</button>
        </div>
      </div>
    </div>
  );
}
