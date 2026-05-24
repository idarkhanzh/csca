import clsx from 'clsx';
import { SUBJECTS } from '../../data/subjects';
import type { SubjectSlug } from '../../types/database';

export default function SubjectFilter({
  value,
  onChange,
}: {
  value: SubjectSlug | 'all';
  onChange: (v: SubjectSlug | 'all') => void;
}) {
  const options: { key: SubjectSlug | 'all'; label: string }[] = [
    { key: 'all', label: 'Все предметы' },
    ...SUBJECTS.map((s) => ({ key: s.slug, label: s.shortEn })),
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={clsx(
            'rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors',
            value === opt.key
              ? 'bg-navy-800 text-white border-navy-800'
              : 'bg-white text-ink-muted border-navy-100 hover:text-ink hover:border-navy-200',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
