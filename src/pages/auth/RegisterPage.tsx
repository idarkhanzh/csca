import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../lib/auth';

export default function RegisterPage() {
  const { signUp, loginDemo, configured } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signUp(email, password, fullName);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setSuccess(true);
  }

  function demo() {
    loginDemo(fullName || undefined);
    navigate('/app/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-navy-950 text-white p-12">
        <Logo to="/" />
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">Создай аккаунт и начни подготовку к CSCA уже сегодня.</h1>
          <p className="mt-4 text-navy-200/80 max-w-md">Бесплатный доступ к базовым модулям и пробным экзаменам. Подписка — по заявке через администратора.</p>
        </div>
        <div className="text-xs text-navy-200/60">© 2026 CSCA Prep</div>
      </div>

      <div className="flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="lg:hidden mb-8"><Logo /></div>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-extrabold text-ink">Регистрация</h2>
          <p className="mt-1 text-sm text-ink-muted">Уже есть аккаунт? <Link to="/login" className="text-navy-800 font-semibold">Войти</Link></p>

          {success ? (
            <div className="mt-8 card p-6">
              <div className="text-base font-semibold text-ink">Подтвердите email</div>
              <p className="mt-1 text-sm text-ink-muted">Мы отправили письмо на <span className="font-semibold text-ink">{email}</span>. Перейдите по ссылке, чтобы активировать аккаунт.</p>
              <Link to="/login" className="btn-primary mt-5 w-full">Перейти ко входу</Link>
            </div>
          ) : (
            <>
              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="label">Имя</label>
                  <input className="input mt-1.5" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="input mt-1.5" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label">Пароль</label>
                  <input className="input mt-1.5" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Минимум 6 символов" />
                </div>
                {error && <div className="text-xs text-rose-600">{error}</div>}
                <button className="btn-primary w-full" disabled={loading}>{loading ? 'Создаём аккаунт…' : 'Создать аккаунт'}</button>
              </form>
              <div className="mt-6 text-center text-xs text-ink-muted">
                {configured ? 'Регистрация через Supabase Auth' : 'Supabase не подключен — войти можно в демо-режим.'}
              </div>
              <button onClick={demo} className="btn-secondary w-full mt-3">Войти в демо без регистрации</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
