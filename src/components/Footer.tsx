export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--line)] px-4 pb-12 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">&copy; {year} District Season Calculation</p>
        <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink-soft)]">
          Created by <a target="_blank" href="https://fire.san-andreas.net/memberlist.php?mode=viewprofile&u=26309" className="text-[var(--brand-red)] no-underline hover:underline">Mike Clovis</a> A.K.A <a target="_blank" href="https://www.instagram.com/jontn__/" className="text-[var(--brand-red)] no-underline hover:underline">Jojo</a>
        </p>
      </div>
    </footer>
  );
}
