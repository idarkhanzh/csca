import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { useAuth } from '../../lib/auth';
import { useEffect, useState } from 'react';
import { computeReadiness } from '../../lib/progress';

export default function AppLayout() {
  const { profile } = useAuth();
  const [readiness, setReadiness] = useState(45);

  useEffect(() => {
    setReadiness(computeReadiness());
  }, []);

  const greeting = profile?.full_name?.split(' ')[0];

  return (
    <div className="flex min-h-screen bg-surface-alt">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AppHeader greetingName={greeting} readiness={readiness} />
        <main className="flex-1 px-6 lg:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
