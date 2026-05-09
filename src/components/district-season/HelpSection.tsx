import { Info, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function isHelpOpen() {
  if (typeof window === 'undefined') return false;
  return window.location.hash === '#bantuan';
}

function clearHelpHash() {
  const { pathname, search } = window.location;
  window.history.replaceState(null, '', `${pathname}${search}`);
}

export default function HelpSection() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sync = () => setOpen(isHelpOpen());
    sync();

    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      if (window.location.hash === '#bantuan') clearHelpHash();
      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function onClose() {
    if (typeof window !== 'undefined' && window.location.hash === '#bantuan') {
      clearHelpHash();
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bantuan District Season Calculation"
          className="w-full max-w-2xl rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="m-0 flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
                <Info
                  className="h-4 w-4 text-[var(--brand-red)]"
                  aria-hidden="true"
                />
                Bantuan
              </h2>
              <p className="mt-1 mb-0 text-xs text-[var(--sea-ink-soft)]">
                Tekan Esc atau klik tanda silang untuk menutup.
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup bantuan"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sea-ink)] transition hover:border-[rgba(211,47,47,0.35)] hover:bg-[rgba(211,47,47,0.06)] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 space-y-5 text-sm leading-6 text-[var(--sea-ink)]">
            <div className="space-y-1">
              <p className="m-0 font-semibold">Ringkasannya</p>
              <p className="m-0 text-[var(--sea-ink-soft)]">
                Isi data individu per unit, lalu sistem menghitung skor individu dan
                merangkum ke level unit hingga total district.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--line)] bg-[var(--link-bg-hover)] p-4">
              <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
                RUMUS DASAR
              </p>
              <p className="mt-2 mb-0">
                <code>Point% = (Jumlah / Target) × 100</code>
              </p>
              <ul className="mt-3 mb-0 list-disc space-y-1 pl-5 text-[var(--sea-ink-soft)]">
                <li>
                  Soft cap untuk bobot: <span className="font-semibold text-[var(--sea-ink)]">maksimal 200%</span>.
                </li>
                <li>Bonus kualitas per sektor: <span className="font-semibold text-[var(--sea-ink)]">0–10</span>.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
                BOBOT SEKTOR
              </p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--sea-ink-soft)]">
                <li>
                  Hospital: <span className="font-semibold text-[var(--sea-ink)]">20 / 20 / 60</span>
                </li>
                <li>
                  Field: <span className="font-semibold text-[var(--sea-ink)]">20 / 10 / 70</span>
                </li>
              </ul>
              <p className="m-0 text-[var(--sea-ink-soft)]">
                Nilai individu = <code>Σ((Point% capped / 100) × bobot)</code>
              </p>
            </div>

            <div className="space-y-2">
              <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
                BONUS INDIVIDU
              </p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--sea-ink-soft)]">
                <li>
                  <span className="font-semibold text-[var(--sea-ink)]">Overachiever</span>: +5 jika rata-rata &gt;150%, +10 jika &gt;200%.
                </li>
                <li>
                  <span className="font-semibold text-[var(--sea-ink)]">Full Completion</span>: +5 jika semua item mencapai ≥100%.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
                AGREGASI DISTRICT
              </p>
              <div className="space-y-1 text-[var(--sea-ink-soft)]">
                <div>
                  <code>Hospital Average = (CGH + ASGH + FCH) / 3</code>
                </div>
                <div>
                  <code>Field Average = (FS60 + FS34) / 2</code>
                </div>
                <div>
                  <code>Overall = (Hospital × 40%) + (Field × 60%) + bonus kualitas</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
