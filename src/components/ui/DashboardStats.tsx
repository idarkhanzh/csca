import type { LucideIcon } from 'lucide-react';

export default function DashboardStats({
  items,
}: {
  items: { label: string; value: string | number; sub?: string; Icon: LucideIcon }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ label, value, sub, Icon }) => (
        <div key={label} className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-ink-muted">{label}</div>
              <div className="mt-2 text-2xl font-extrabold text-ink leading-none">{value}</div>
              {sub && <div className="mt-1 text-xs text-ink-subtle">{sub}</div>}
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-navy-50 text-navy-800">
              <Icon className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
