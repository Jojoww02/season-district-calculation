import { Plus, Trash2 } from 'lucide-react';
import NumberField from './NumberField';

type ItemDef<K extends string> = {
  key: K;
  label: string;
};

export type EditableIndividualRow<K extends string> = {
  id: string;
  name: string;
  counts: Record<K, number>;
};

type Props<K extends string> = {
  title: string;
  subtitle?: string;
  items: ItemDef<K>[];
  individuals: EditableIndividualRow<K>[];
  onChange: (next: EditableIndividualRow<K>[]) => void;
};

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function UnitIndividualsEditor<K extends string>({
  title,
  subtitle,
  items,
  individuals,
  onChange,
}: Props<K>) {
  function addRow() {
    const counts = Object.fromEntries(items.map((i) => [i.key, 0])) as Record<
      K,
      number
    >;
    onChange([...individuals, { id: createId(), name: '', counts }]);
  }

  function updateRow(id: string, patch: Partial<EditableIndividualRow<K>>) {
    onChange(individuals.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function updateCount(id: string, key: K, next: number) {
    onChange(
      individuals.map((r) =>
        r.id === id ? { ...r, counts: { ...r.counts, [key]: next } } : r,
      ),
    );
  }

  function removeRow(id: string) {
    onChange(individuals.filter((r) => r.id !== id));
  }

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
              {subtitle}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-2 rounded-xl border border-[rgba(211,47,47,0.25)] bg-[rgba(211,47,47,0.06)] px-3 py-2 text-sm font-semibold text-[var(--brand-red)] transition hover:bg-[rgba(211,47,47,0.1)] cursor-pointer"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {individuals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--link-bg-hover)] p-4 text-sm text-[var(--sea-ink-soft)]">
            Belum ada data individu.
          </div>
        ) : null}

        {individuals.length > 0 ? (
          <div className="hidden md:grid md:grid-cols-[minmax(180px,1.2fr)_repeat(3,minmax(96px,1fr))_48px] md:gap-3 md:px-3 md:text-xs md:font-semibold md:tracking-wide md:text-[var(--sea-ink)] md:opacity-70">
            <div className="whitespace-nowrap">Nama</div>
            {items.map((item) => (
              <div
                key={item.key}
                title={item.label}
                className="truncate whitespace-nowrap"
              >
                {item.label}
              </div>
            ))}
            <div className="sr-only">Aksi</div>
          </div>
        ) : null}

        {individuals.map((row, idx) => (
          <div
            key={row.id}
            className="grid grid-cols-1 gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] p-3 sm:p-4 md:grid-cols-[minmax(180px,1.2fr)_repeat(3,minmax(96px,1fr))_48px]"
          >
            <div className="min-w-0">
              <label
                htmlFor={`${row.id}-name`}
                className="block text-xs font-medium text-[var(--sea-ink)] md:sr-only"
              >
                Nama
              </label>
              <input
                id={`${row.id}-name`}
                value={row.name}
                onChange={(e) => updateRow(row.id, { name: e.target.value })}
                placeholder={`Individu ${idx + 1}`}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-sm text-[var(--sea-ink)] shadow-sm outline-none transition placeholder:text-[var(--sea-ink-soft)] placeholder:opacity-70 focus:border-[var(--brand-red)] focus:ring-4 focus:ring-[rgba(211,47,47,0.18)]"
              />
            </div>

            {items.map((item) => (
              <div key={item.key} className="min-w-0">
                <div className="md:hidden">
                  <NumberField
                    id={`${row.id}-${item.key}`}
                    label={item.label}
                    value={row.counts[item.key]}
                    min={0}
                    step={1}
                    onChange={(next) => updateCount(row.id, item.key, next)}
                    compactLabel
                  />
                </div>
                <div className="hidden md:block">
                  <NumberField
                    id={`${row.id}-${item.key}`}
                    label={item.label}
                    value={row.counts[item.key]}
                    min={0}
                    step={1}
                    onChange={(next) => updateCount(row.id, item.key, next)}
                    hideLabel
                    inputClassName="mt-0"
                  />
                </div>
              </div>
            ))}

            <div className="flex items-start justify-end md:justify-center">
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                aria-label="Hapus baris"
                title="Hapus"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sea-ink-soft)] transition hover:border-[rgba(211,47,47,0.35)] hover:bg-[rgba(211,47,47,0.06)] hover:text-[var(--brand-red)] cursor-pointer"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
