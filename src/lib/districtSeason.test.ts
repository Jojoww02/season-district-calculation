import { describe, expect, it } from 'vitest';
import {
  computeIndividualScore,
  computeSeasonResults,
  DEFAULT_QUALITY_BONUSES,
  DEFAULT_TARGETS,
} from './districtSeason';

describe('districtSeason', () => {
  it('computes weighted points with soft cap at 200%', () => {
    const score = computeIndividualScore(
      {
        id: 'i1',
        name: 'A',
        unitId: 'CGH',
        counts: {
          prescriptionFiles: 30,
          surgeryReports: 30,
          specialistCaseFiles: 30,
        },
      },
      {
        ...DEFAULT_TARGETS,
        prescriptionFiles: 10,
        surgeryReports: 10,
        specialistCaseFiles: 10,
      },
    );

    expect(score.basePoints).toBeCloseTo(200, 6);
  });

  it('applies overachiever and full completion bonus', () => {
    const score = computeIndividualScore(
      {
        id: 'i1',
        name: 'A',
        unitId: 'FS60',
        counts: {
          pcr: 21,
          pn: 21,
          incidentReport: 21,
        },
      },
      {
        ...DEFAULT_TARGETS,
        pcr: 10,
        pn: 10,
        incidentReport: 10,
      },
    );

    expect(score.fullCompletion).toBe(true);
    expect(score.fullCompletionBonus).toBe(5);
    expect(score.overachieverBonus).toBe(10);
  });

  it('computes season overall score including quality bonuses', () => {
    const results = computeSeasonResults({
      individuals: [
        {
          id: 'h1',
          name: 'H',
          unitId: 'CGH',
          counts: {
            prescriptionFiles: 10,
            surgeryReports: 10,
            specialistCaseFiles: 10,
          },
        },
        {
          id: 'f1',
          name: 'F',
          unitId: 'FS60',
          counts: { pcr: 10, pn: 10, incidentReport: 10 },
        },
      ],
      targets: {
        ...DEFAULT_TARGETS,
        prescriptionFiles: 10,
        surgeryReports: 10,
        specialistCaseFiles: 10,
        pcr: 10,
        pn: 10,
        incidentReport: 10,
      },
      qualityBonuses: { ...DEFAULT_QUALITY_BONUSES, hospital: 7, field: 3 },
    });

    expect(results.qualityBonusHospital).toBe(7);
    expect(results.qualityBonusField).toBe(3);
    expect(results.overallScore).toBeCloseTo(
      results.hospitalAverage * 0.4 + results.fieldAverage * 0.6 + 10,
      6,
    );
    expect(results.hardCarry?.id).toBeTruthy();
  });
});
