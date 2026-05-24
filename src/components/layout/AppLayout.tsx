import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { useAuth } from '../../lib/auth';
import { computeReadiness } from '../../lib/progress';

export default function AppLayout() {
  const { profile } = useAuth();
  const location = useLocation();
  // Recompute on every render so the header stays in sync after each
  // navigation (e.g. submitting an exam → returning to dashboard).
  // Reading `location.pathname` here keeps the dependency explicit.
  void location.pathname;
  const readiness = computeReadiness();

  const greeting = profile?.full_name?.split(' ')[0];

  return (
    <div className="min-h-screen bg-surface-alt">
      <Sidebar />
      <div className="lg:pl-[260px] min-h-screen flex flex-col">
        <AppHeader greetingName={greeting} readiness={readiness} />
        <main className="flex-1 px-6 lg:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
