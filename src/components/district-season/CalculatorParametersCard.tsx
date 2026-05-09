import {
  FIELD_ITEMS,
  HOSPITAL_ITEMS,
  type ItemKey,
  type QualityBonuses,
  type Targets,
} from '../../lib/districtSeason';
import NumberField from './NumberField';

export default function CalculatorParametersCard({
  targets,
  qualityBonuses,
  formError,
  onChangeTargets,
  onChangeQualityBonus,
  onCalculate,
  onReset,
}: {
  targets: Targets;
  qualityBonuses: QualityBonuses;
  formError: string | null;
  onChangeTargets: (next: Targets) => void;
  onChangeQualityBonus: (next: QualityBonuses) => void;
  onCalculate: () => void;
  onReset: () => void;
}) {
  function setTarget(key: ItemKey, next: number) {
    onChangeTargets({ ...targets, [key]: next });
  }

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="m-0 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
          Input Parameter
        </h2>
        <p className="m-0 text-xs font-semibold text-[var(--sea-ink)] opacity-70">
          Target harus &gt; 0 • Bonus 0–10
        </p>
      </div>

      {formError ? (
        <div className="mt-4 rounded-xl border border-[rgba(211,47,47,0.28)] bg-[rgba(211,47,47,0.06)] p-3 text-sm text-[var(--sea-ink)]">
          <span className="font-semibold text-[var(--brand-red)]">Error:</span>{' '}
          {formError}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--link-bg-hover)] p-4">
          <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
            TARGET (HOSPITAL)
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {HOSPITAL_ITEMS.map((i) => (
              <NumberField
                key={i.key}
                id={`target-${i.key}`}
                label={i.label}
                value={targets[i.key]}
                min={0}
                step={1}
                onChange={(next) => setTarget(i.key, next)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--link-bg-hover)] p-4">
          <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
            TARGET (FIELD)
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {FIELD_ITEMS.map((i) => (
              <NumberField
                key={i.key}
                id={`target-${i.key}`}
                label={i.label}
                value={targets[i.key]}
                min={0}
                step={1}
                onChange={(next) => setTarget(i.key, next)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--link-bg-hover)] p-4">
          <p className="m-0 text-xs font-semibold tracking-wide text-[var(--sea-ink)] opacity-80">
            BONUS KUALITAS
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              id="quality-hospital"
              label="Hospital (maks +10)"
              value={qualityBonuses.hospital}
              min={0}
              max={10}
              step={1}
              onChange={(next) =>
                onChangeQualityBonus({ ...qualityBonuses, hospital: next })
              }
              placeholder="0–10"
            />
            <NumberField
              id="quality-field"
              label="Field (maks +10)"
              value={qualityBonuses.field}
              min={0}
              max={10}
              step={1}
              onChange={(next) =>
                onChangeQualityBonus({ ...qualityBonuses, field: next })
              }
              placeholder="0–10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onCalculate}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand-red)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-red-deep)] focus:outline-none focus:ring-4 focus:ring-[rgba(211,47,47,0.2)] sm:w-auto cursor-pointer"
          >
            Hitung
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--sea-ink)] transition hover:border-[rgba(211,47,47,0.35)] hover:bg-[rgba(211,47,47,0.06)] sm:w-auto cursor-pointer"
          >
            Reset
          </button>
          <a
            href="#bantuan"
            className="text-sm font-semibold text-[var(--brand-red)] no-underline hover:underline"
          >
            Lihat bantuan
          </a>
        </div>
      </div>
    </section>
  );
}
