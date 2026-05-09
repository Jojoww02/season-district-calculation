import { FIELD_ITEMS, HOSPITAL_ITEMS } from '../../lib/districtSeason';
import UnitIndividualsEditor, {
  type EditableIndividualRow,
} from './UnitIndividualsEditor';

type HospitalRow = EditableIndividualRow<
  (typeof HOSPITAL_ITEMS)[number]['key']
>;
type FieldRow = EditableIndividualRow<(typeof FIELD_ITEMS)[number]['key']>;

export type UnitState = {
  CGH: HospitalRow[];
  ASGH: HospitalRow[];
  FCH: HospitalRow[];
  FS60: FieldRow[];
  FS34: FieldRow[];
};

export default function UnitEditors({
  units,
  onChange,
}: {
  units: UnitState;
  onChange: (next: UnitState) => void;
}) {
  return (
    <div className="space-y-5">
      <UnitIndividualsEditor
        title="Hospital — CGH"
        subtitle="Isi jumlah item per individu (CGH)"
        items={HOSPITAL_ITEMS}
        individuals={units.CGH}
        onChange={(next) => onChange({ ...units, CGH: next })}
      />
      <UnitIndividualsEditor
        title="Hospital — ASGH"
        subtitle="Isi jumlah item per individu (ASGH)"
        items={HOSPITAL_ITEMS}
        individuals={units.ASGH}
        onChange={(next) => onChange({ ...units, ASGH: next })}
      />
      <UnitIndividualsEditor
        title="Hospital — FCH"
        subtitle="Isi jumlah item per individu (FCH)"
        items={HOSPITAL_ITEMS}
        individuals={units.FCH}
        onChange={(next) => onChange({ ...units, FCH: next })}
      />

      <UnitIndividualsEditor
        title="Field — FS60"
        subtitle="Isi jumlah item per individu (FS60)"
        items={FIELD_ITEMS}
        individuals={units.FS60}
        onChange={(next) => onChange({ ...units, FS60: next })}
      />
      <UnitIndividualsEditor
        title="Field — FS34"
        subtitle="Isi jumlah item per individu (FS34)"
        items={FIELD_ITEMS}
        individuals={units.FS34}
        onChange={(next) => onChange({ ...units, FS34: next })}
      />
    </div>
  );
}
