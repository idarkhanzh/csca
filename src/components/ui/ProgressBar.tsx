import clsx from 'clsx';

export default function ProgressBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx('h-1.5 w-full rounded-full bg-navy-100 overflow-hidden', className)}>
      <div
        className="h-full rounded-full bg-navy-800 transition-all duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
