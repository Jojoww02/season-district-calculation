import { useMemo, useState } from 'react';
import CalculatorParametersCard from '../components/district-season/CalculatorParametersCard';
import IndividualDetailsTable from '../components/district-season/IndividualDetailsTable';
import ResultsPanel from '../components/district-season/ResultsPanel';
import UnitEditors, {
  type UnitState,
} from '../components/district-season/UnitEditors';
import {
  computeSeasonResults,
  DEFAULT_QUALITY_BONUSES,
  DEFAULT_TARGETS,
  type QualityBonuses,
  type Targets,
} from '../lib/districtSeason';

function createDefaultUnitState(): UnitState {
  return {
    CGH: [],
    ASGH: [],
    FCH: [],
    FS60: [],
    FS34: [],
  };
}

function normalizeTargets(raw: Targets): Targets {
  const next = { ...raw };
  for (const key of Object.keys(next) as Array<keyof Targets>) {
    const v = Number(next[key]);
    next[key] = Number.isFinite(v) && v > 0 ? v : 0;
  }
  return next;
}

export default function DistrictSeasonCalculatorPage() {
  const [targets, setTargets] = useState<Targets>({ ...DEFAULT_TARGETS });
  const [qualityBonuses, setQualityBonuses] = useState<QualityBonuses>({
    ...DEFAULT_QUALITY_BONUSES,
  });
  const [units, setUnits] = useState<UnitState>(() => createDefaultUnitState());
  const [results, setResults] = useState<ReturnType<
    typeof computeSeasonResults
  > | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const normalizedTargets = useMemo(() => normalizeTargets(targets), [targets]);

  function validate(): string | null {
    const values = Object.values(normalizedTargets);
    if (values.some((v) => !Number.isFinite(v) || v <= 0)) {
      return 'Semua target harus diisi dan > 0.';
    }

    const qbHospital = Number(qualityBonuses.hospital);
    const qbField = Number(qualityBonuses.field);
    if (!Number.isFinite(qbHospital) || qbHospital < 0 || qbHospital > 10) {
      return 'Bonus kualitas Hospital harus 0–10.';
    }
    if (!Number.isFinite(qbField) || qbField < 0 || qbField > 10) {
      return 'Bonus kualitas Field harus 0–10.';
    }

    return null;
  }

  function buildIndividuals() {
    const individuals = [] as Parameters<
      typeof computeSeasonResults
    >[0]['individuals'];
    for (const unitId of Object.keys(units) as Array<keyof UnitState>) {
      for (const row of units[unitId]) {
        individuals.push({
          id: row.id,
          name: row.name,
          unitId,
          counts: row.counts,
        });
      }
    }
    return individuals;
  }

  function onCalculate() {
    const err = validate();
    setFormError(err);
    if (err) {
      setResults(null);
      return;
    }

    setResults(
      computeSeasonResults({
        individuals: buildIndividuals(),
        targets: normalizedTargets,
        qualityBonuses,
      }),
    );
  }

  function onReset() {
    setTargets({ ...DEFAULT_TARGETS });
    setQualityBonuses({ ...DEFAULT_QUALITY_BONUSES });
    setUnits(createDefaultUnitState());
    setResults(null);
    setFormError(null);
  }

  return (
    <main
      id="calculator"
      className="page-wrap px-4 pb-10 pt-10 text-[var(--sea-ink)] sm:pt-14"
    >
      <header className="rise-in">
        <p className="island-kicker mb-2 text-[var(--brand-red)]">
          DISTRICT SEASONS
        </p>
        <h1 className="display-title mb-2 text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          District Season Calculation
        </h1>
        <p className="mt-0 mb-6 max-w-3xl text-sm leading-7 text-[var(--sea-ink)] sm:text-base">
          Input data individu per unit, target, dan bonus kualitas untuk
          menghitung Hospital Average, Field Average, Overall Score, serta Hard
          Carry.
        </p>
        <div className="h-px w-full bg-[var(--brand-red)] opacity-30 mb-5" />
      </header>

      <div className="grid gap-5 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="space-y-5">
            <CalculatorParametersCard
              targets={targets}
              qualityBonuses={qualityBonuses}
              formError={formError}
              onChangeTargets={setTargets}
              onChangeQualityBonus={setQualityBonuses}
              onCalculate={onCalculate}
              onReset={onReset}
            />

            <UnitEditors units={units} onChange={setUnits} />
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ResultsPanel results={results} />
            <IndividualDetailsTable results={results} />
          </div>
        </aside>
      </div>
    </main>
  );
}
