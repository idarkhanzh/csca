import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

export default function MarketingFooter() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center gap-4">
        <Logo size="sm" />
        <div className="text-xs text-ink-muted md:ml-6">© 2026 CSCA Prep. Все права защищены.</div>
        <div className="md:ml-auto flex items-center gap-6 text-xs text-ink-muted">
          <Link to="/policy" className="hover:text-ink">Политика</Link>
          <Link to="/terms" className="hover:text-ink">Условия</Link>
          <Link to="/help" className="hover:text-ink">Помощь</Link>
        </div>
      </div>
    </footer>
  );
}
