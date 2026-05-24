import { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import clsx from 'clsx';

export default function Timer({
  durationSeconds,
  paused = false,
  onElapsed,
}: {
  durationSeconds: number;
  paused?: boolean;
  onElapsed?: () => void;
}) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const elapsedFired = useRef(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          if (!elapsedFired.current) {
            elapsedFired.current = true;
            onElapsed?.();
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [paused, onElapsed]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const low = remaining <= 60;

  return (
    <div className={clsx('inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-mono font-semibold',
      low ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-navy-100 bg-white text-ink'
    )}>
      <Clock className="h-4 w-4" /> {mm}:{ss}
    </div>
  );
}
