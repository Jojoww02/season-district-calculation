import { Trophy } from 'lucide-react';
import type { SeasonResults, UnitId } from '../../lib/districtSeason';

function fmt(n: number) {
  if (!Number.isFinite(n)) return '-';
  return n.toFixed(2);
}

function unitOrder(a: UnitId) {
  const order: UnitId[] = ['CGH', 'ASGH', 'FCH', 'FS60', 'FS34'];
  return order.indexOf(a);
}

export default function ResultsPanel({
  results,
}: {
  results: SeasonResults | null;
}) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
      <h2 className="m-0 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
        Hasil
      </h2>

      {!results ? (
        <div className="mt-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--link-bg-hover)] p-4 text-sm text-[var(--sea-ink-soft)]">
          Isi data lalu tekan <span className="font-semibold">Hitung</span>.
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[rgba(211,47,47,0.22)] bg-[rgba(211,47,47,0.06)] p-4">
              <p className="m-0 text-xs font-semibold tracking-wide text-[var(--brand-red)]">
                OVERALL SCORE
              </p>
              <p className="mt-2 mb-0 text-3xl font-extrabold tracking-tight text-[var(--sea-ink)]">
                {fmt(results.overallScore)}
              </p>
              <p className="mt-1 mb-0 text-xs text-[var(--sea-ink-soft)]">
                (Hospital 40% + Field 60%) + bonus kualitas
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink-soft)]">
                  Hospital Average
                </p>
                <p className="mt-2 mb-0 text-xl font-bold text-[var(--sea-ink)]">
                  {fmt(results.hospitalAverage)}
                </p>
                <p className="mt-1 mb-0 text-xs text-[var(--sea-ink-soft)]">
                  Bonus kualitas: +{fmt(results.qualityBonusHospital)}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink-soft)]">
                  Field Average
                </p>
                <p className="mt-2 mb-0 text-xl font-bold text-[var(--sea-ink)]">
                  {fmt(results.fieldAverage)}
                </p>
                <p className="mt-1 mb-0 text-xs text-[var(--sea-ink-soft)]">
                  Bonus kualitas: +{fmt(results.qualityBonusField)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
            <h3 className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
              Rangkuman Per Unit
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs font-semibold tracking-wide text-[var(--sea-ink-soft)]">
                    <th className="border-b border-[var(--line)] px-3 py-2">
                      Unit
                    </th>
                    <th className="border-b border-[var(--line)] px-3 py-2">
                      Sektor
                    </th>
                    <th className="border-b border-[var(--line)] px-3 py-2">
                      Peserta
                    </th>
                    <th className="border-b border-[var(--line)] px-3 py-2">
                      Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(results.unitSummaries)
                    .sort((a, b) => unitOrder(a.unitId) - unitOrder(b.unitId))
                    .map((u) => (
                      <tr
                        key={u.unitId}
                        className="text-sm text-[var(--sea-ink)]"
                      >
                        <td className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                          {u.unitId}
                        </td>
                        <td className="border-b border-[var(--line)] px-3 py-2 capitalize">
                          {u.sectorId}
                        </td>
                        <td className="border-b border-[var(--line)] px-3 py-2">
                          {u.participants}
                        </td>
                        <td className="border-b border-[var(--line)] px-3 py-2">
                          {fmt(u.averagePoints)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
            <h3 className="m-0 flex items-center gap-2 text-sm font-semibold text-[var(--sea-ink)]">
              <Trophy
                className="h-4 w-4 text-[var(--brand-red)]"
                aria-hidden="true"
              />
              District Season Hard Carry
            </h3>
            {results.hardCarry ? (
              <p className="mt-3 mb-0 text-sm text-[var(--sea-ink)]">
                <span className="font-semibold">
                  {results.hardCarry.name?.trim() || 'Tanpa nama'}
                </span>{' '}
                ({results.hardCarry.unitId}, {results.hardCarry.sectorId}) —{' '}
                <span className="font-semibold">
                  {fmt(results.hardCarry.totalPoints)}
                </span>
              </p>
            ) : (
              <p className="mt-3 mb-0 text-sm text-[var(--sea-ink-soft)]">
                Belum ada data individu.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
