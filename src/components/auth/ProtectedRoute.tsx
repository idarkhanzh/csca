import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../lib/auth';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { ready, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-muted text-sm">
        Загрузка…
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
