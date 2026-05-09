export type SectorId = 'hospital' | 'field';

export type UnitId = 'CGH' | 'ASGH' | 'FCH' | 'FS60' | 'FS34';

export type HospitalItemKey =
  | 'prescriptionFiles'
  | 'surgeryReports'
  | 'specialistCaseFiles';

export type FieldItemKey = 'pcr' | 'pn' | 'incidentReport';

export type ItemKey = HospitalItemKey | FieldItemKey;

export type Targets = Record<ItemKey, number>;

export type IndividualInput = {
  id: string;
  name: string;
  unitId: UnitId;
  counts: Partial<Record<ItemKey, number>>;
};

export type QualityBonuses = Record<SectorId, number>;

export type IndividualScoreBreakdown = {
  rawPercent: number;
  cappedPercent: number;
  weight: number;
  weightedPoints: number;
};

export type IndividualScore = {
  id: string;
  name: string;
  unitId: UnitId;
  sectorId: SectorId;
  basePoints: number;
  overachieverBonus: number;
  fullCompletionBonus: number;
  totalPoints: number;
  averageRawPercent: number;
  fullCompletion: boolean;
  breakdown: Record<ItemKey, IndividualScoreBreakdown | undefined>;
};

export type UnitSummary = {
  unitId: UnitId;
  sectorId: SectorId;
  participants: number;
  averagePoints: number;
};

export type SeasonResults = {
  unitSummaries: Record<UnitId, UnitSummary>;
  hospitalAverage: number;
  fieldAverage: number;
  overallScore: number;
  qualityBonusHospital: number;
  qualityBonusField: number;
  hardCarry: {
    id: string;
    name: string;
    unitId: UnitId;
    sectorId: SectorId;
    totalPoints: number;
  } | null;
  individualScores: IndividualScore[];
};

export const UNITS: { id: UnitId; label: string; sectorId: SectorId }[] = [
  { id: 'CGH', label: 'CGH', sectorId: 'hospital' },
  { id: 'ASGH', label: 'ASGH', sectorId: 'hospital' },
  { id: 'FCH', label: 'FCH', sectorId: 'hospital' },
  { id: 'FS60', label: 'FS60', sectorId: 'field' },
  { id: 'FS34', label: 'FS34', sectorId: 'field' },
];

export const HOSPITAL_ITEMS: {
  key: HospitalItemKey;
  label: string;
  weight: number;
}[] = [
  { key: 'prescriptionFiles', label: 'Prescription Files', weight: 20 },
  { key: 'surgeryReports', label: 'Surgery Reports', weight: 20 },
  { key: 'specialistCaseFiles', label: 'Specialist Case Files', weight: 60 },
];

export const FIELD_ITEMS: {
  key: FieldItemKey;
  label: string;
  weight: number;
}[] = [
  { key: 'pcr', label: 'PCR', weight: 20 },
  { key: 'pn', label: 'PN', weight: 10 },
  { key: 'incidentReport', label: 'Incident Report', weight: 70 },
];

export const DEFAULT_TARGETS: Targets = {
  prescriptionFiles: 0,
  surgeryReports: 0,
  specialistCaseFiles: 0,
  pcr: 0,
  pn: 0,
  incidentReport: 0,
};

export const DEFAULT_QUALITY_BONUSES: QualityBonuses = {
  hospital: 0,
  field: 0,
};

export function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function getSectorForUnit(unitId: UnitId): SectorId {
  const unit = UNITS.find((u) => u.id === unitId);
  return unit?.sectorId ?? 'hospital';
}

export function computeItemPercent(count: number, target: number) {
  if (!Number.isFinite(count) || !Number.isFinite(target) || target <= 0) {
    return { raw: 0, capped: 0 };
  }
  const raw = (count / target) * 100;
  const capped = Math.min(raw, 200);
  return { raw, capped };
}

export function computeIndividualScore(
  input: IndividualInput,
  targets: Targets,
): IndividualScore {
  const sectorId = getSectorForUnit(input.unitId);
  const items = sectorId === 'hospital' ? HOSPITAL_ITEMS : FIELD_ITEMS;

  const breakdown: Record<ItemKey, IndividualScoreBreakdown | undefined> = {
    prescriptionFiles: undefined,
    surgeryReports: undefined,
    specialistCaseFiles: undefined,
    pcr: undefined,
    pn: undefined,
    incidentReport: undefined,
  };

  let basePoints = 0;
  let rawSum = 0;
  let rawCount = 0;
  let fullCompletion = true;

  for (const item of items) {
    const count = clampNumber(
      input.counts[item.key] ?? 0,
      0,
      Number.MAX_SAFE_INTEGER,
    );
    const target = clampNumber(
      targets[item.key] ?? 0,
      0,
      Number.MAX_SAFE_INTEGER,
    );
    const { raw, capped } = computeItemPercent(count, target);
    const weightedPoints = (capped / 100) * item.weight;
    breakdown[item.key] = {
      rawPercent: raw,
      cappedPercent: capped,
      weight: item.weight,
      weightedPoints,
    };
    basePoints += weightedPoints;
    rawSum += raw;
    rawCount += 1;
    if (raw < 100) {
      fullCompletion = false;
    }
  }

  const averageRawPercent = rawCount === 0 ? 0 : rawSum / rawCount;
  const overachieverBonus =
    averageRawPercent > 200 ? 10 : averageRawPercent > 150 ? 5 : 0;
  const fullCompletionBonus = fullCompletion ? 5 : 0;
  const totalPoints = basePoints + overachieverBonus + fullCompletionBonus;

  return {
    id: input.id,
    name: input.name,
    unitId: input.unitId,
    sectorId,
    basePoints,
    overachieverBonus,
    fullCompletionBonus,
    totalPoints,
    averageRawPercent,
    fullCompletion,
    breakdown,
  };
}

export function computeUnitSummary(
  scores: IndividualScore[],
  unitId: UnitId,
): UnitSummary {
  const sectorId = getSectorForUnit(unitId);
  const unitScores = scores.filter((s) => s.unitId === unitId);
  const participants = unitScores.length;
  const averagePoints =
    participants === 0
      ? 0
      : unitScores.reduce((sum, s) => sum + s.totalPoints, 0) / participants;

  return {
    unitId,
    sectorId,
    participants,
    averagePoints,
  };
}

export function computeSeasonResults(params: {
  individuals: IndividualInput[];
  targets: Targets;
  qualityBonuses: QualityBonuses;
}): SeasonResults {
  const qualityBonusHospital = clampNumber(
    params.qualityBonuses.hospital ?? 0,
    0,
    10,
  );
  const qualityBonusField = clampNumber(
    params.qualityBonuses.field ?? 0,
    0,
    10,
  );

  const individualScores = params.individuals.map((i) =>
    computeIndividualScore(i, params.targets),
  );

  const unitSummaries = {
    CGH: computeUnitSummary(individualScores, 'CGH'),
    ASGH: computeUnitSummary(individualScores, 'ASGH'),
    FCH: computeUnitSummary(individualScores, 'FCH'),
    FS60: computeUnitSummary(individualScores, 'FS60'),
    FS34: computeUnitSummary(individualScores, 'FS34'),
  };

  const hospitalAverage =
    (unitSummaries.CGH.averagePoints +
      unitSummaries.ASGH.averagePoints +
      unitSummaries.FCH.averagePoints) /
    3;

  const fieldAverage =
    (unitSummaries.FS60.averagePoints + unitSummaries.FS34.averagePoints) / 2;

  const overallScore =
    hospitalAverage * 0.4 +
    fieldAverage * 0.6 +
    qualityBonusHospital +
    qualityBonusField;

  let hardCarry: SeasonResults['hardCarry'] = null;
  for (const score of individualScores) {
    if (!hardCarry || score.totalPoints > hardCarry.totalPoints) {
      hardCarry = {
        id: score.id,
        name: score.name,
        unitId: score.unitId,
        sectorId: score.sectorId,
        totalPoints: score.totalPoints,
      };
    }
  }

  return {
    unitSummaries,
    hospitalAverage,
    fieldAverage,
    overallScore,
    qualityBonusHospital,
    qualityBonusField,
    hardCarry,
    individualScores,
  };
}
