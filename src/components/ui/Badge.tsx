import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: ReactNode;
  variant?: 'neutral' | 'free' | 'subscription' | 'success' | 'warning';
  className?: string;
}) {
  const styles: Record<string, string> = {
    neutral: 'bg-navy-50 text-navy-800 border-navy-100',
    free: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    subscription: 'bg-amber-50 text-amber-800 border-amber-100',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider', styles[variant], className)}>
      {children}
    </span>
  );
}
