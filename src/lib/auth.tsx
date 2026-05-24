import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getSupabase, isSupabaseConfigured } from './supabase';
import type { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  ready: boolean;
  userId: string | null;
  email: string | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  hasSubscription: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  loginDemo: (fullName?: string) => void;
}

const DEMO_KEY = 'csca-prep:demo-profile';

function makeDemoProfile(fullName: string): Profile {
  const now = new Date().toISOString();
  return {
    id: 'demo-user',
    email: 'demo@cscaprep.local',
    full_name: fullName,
    locale: 'ru',
    has_subscription: false,
    subscription_status: 'free',
    subscription_expires_at: null,
    created_at: now,
    updated_at: now,
  };
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabase();
  const configured = isSupabaseConfigured;

  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = useCallback(async (uid: string, fallbackEmail: string | null) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    if (error) {
      console.warn('profile load error', error.message);
      return;
    }
    if (!data && fallbackEmail) {
      // Auto-create a free profile if missing (covers signup race).
      const insert = await supabase
        .from('profiles')
        .insert({ id: uid, email: fallbackEmail, locale: 'ru' })
        .select('*')
        .maybeSingle();
      if (insert.data) setProfile(insert.data as Profile);
    } else if (data) {
      setProfile(data as Profile);
    }
  }, [supabase]);

  useEffect(() => {
    if (!configured) {
      // Hydrate demo profile if present
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(DEMO_KEY) : null;
      if (raw) {
        try {
          const p = JSON.parse(raw) as Profile;
          setProfile(p);
          setUserId(p.id);
          setEmail(p.email);
        } catch {
          /* ignore */
        }
      }
      setReady(true);
      return;
    }
    if (!supabase) {
      setReady(true);
      return;
    }
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data }) => {
      if (cancelled) return;
      const session = data.session;
      if (session?.user) {
        setUserId(session.user.id);
        setEmail(session.user.email ?? null);
        await loadProfile(session.user.id, session.user.email ?? null);
      }
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setEmail(session.user.email ?? null);
        void loadProfile(session.user.id, session.user.email ?? null);
      } else {
        setUserId(null);
        setEmail(null);
        setProfile(null);
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [supabase, configured, loadProfile]);

  const signIn = useCallback(async (e: string, password: string) => {
    if (!supabase) return { error: 'Supabase не подключен. Войдите в демо-режим.' };
    const { error } = await supabase.auth.signInWithPassword({ email: e, password });
    return { error: error?.message ?? null };
  }, [supabase]);

  const signUp = useCallback(async (e: string, password: string, fullName: string) => {
    if (!supabase) return { error: 'Supabase не подключен. Войдите в демо-режим.' };
    const { data, error } = await supabase.auth.signUp({
      email: e,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    const uid = data.user?.id;
    if (uid) {
      await supabase
        .from('profiles')
        .upsert({ id: uid, email: e, full_name: fullName, locale: 'ru' });
    }
    return { error: null };
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    if (typeof window !== 'undefined') window.localStorage.removeItem(DEMO_KEY);
    setUserId(null);
    setEmail(null);
    setProfile(null);
  }, [supabase]);

  const refresh = useCallback(async () => {
    if (userId) await loadProfile(userId, email);
  }, [userId, email, loadProfile]);

  const loginDemo = useCallback((fullName = 'Демо-пользователь') => {
    const p = makeDemoProfile(fullName);
    setProfile(p);
    setUserId(p.id);
    setEmail(p.email);
    if (typeof window !== 'undefined') window.localStorage.setItem(DEMO_KEY, JSON.stringify(p));
  }, []);

  const value = useMemo<AuthState>(() => ({
    ready,
    userId,
    email,
    profile,
    isAuthenticated: Boolean(userId),
    hasSubscription: Boolean(profile?.has_subscription),
    configured,
    signIn,
    signUp,
    signOut,
    refresh,
    loginDemo,
  }), [ready, userId, email, profile, configured, signIn, signUp, signOut, refresh, loginDemo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
