import { Link } from 'react-router-dom';

export default function Logo({ to = '/', size = 'md' as 'sm' | 'md' }) {
  const tile = size === 'sm' ? 'h-7 w-7 text-sm' : 'h-9 w-9 text-base';
  const label = size === 'sm' ? 'text-base' : 'text-lg';
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 group">
      <span className={`grid place-items-center rounded-xl bg-navy-800 text-white font-extrabold ${tile}`}>c</span>
      <span className={`font-extrabold tracking-tight text-ink ${label}`}>CSCA Prep</span>
    </Link>
  );
}
