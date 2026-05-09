import type { SeasonResults } from '../../lib/districtSeason';

export default function IndividualDetailsTable({
  results,
}: {
  results: SeasonResults | null;
}) {
  if (!results) return null;

  return (
    <section className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
      <h2 className="m-0 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
        Detail Individu
      </h2>
      <div className="mt-3 max-h-[420px] overflow-auto rounded-xl border border-[var(--line)]">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface-strong)]">
            <tr className="text-left text-xs font-semibold tracking-wide text-[var(--sea-ink-soft)]">
              <th className="border-b border-[var(--line)] px-3 py-2">Nama</th>
              <th className="border-b border-[var(--line)] px-3 py-2">Unit</th>
              <th className="border-b border-[var(--line)] px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {results.individualScores
              .slice()
              .sort((a, b) => b.totalPoints - a.totalPoints)
              .map((s) => (
                <tr key={s.id} className="text-sm text-[var(--sea-ink)]">
                  <td className="border-b border-[var(--line)] px-3 py-2">
                    {s.name?.trim() || 'Tanpa nama'}
                  </td>
                  <td className="border-b border-[var(--line)] px-3 py-2">
                    {s.unitId}
                  </td>
                  <td className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                    {s.totalPoints.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
