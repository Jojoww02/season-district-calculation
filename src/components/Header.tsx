import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-3 py-3 sm:py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] no-underline shadow-sm sm:px-4 sm:py-2"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
          District Season
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <a href="#calculator" className="nav-link text-sm font-semibold">
            Kalkulator
          </a>
          <a href="#bantuan" className="nav-link text-sm font-semibold">
            Bantuan
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
