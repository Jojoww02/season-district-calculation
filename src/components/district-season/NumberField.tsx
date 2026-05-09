import { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

type Props = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  onChange: (next: number) => void;
  error?: string;
  compactLabel?: boolean;
  hideLabel?: boolean;
  inputClassName?: string;
};

export default function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  placeholder,
  onChange,
  error,
  compactLabel,
  hideLabel,
  inputClassName,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const safeValue = Number.isFinite(value) ? value : 0;
  const displayValue = draft ?? String(safeValue);

  function clampToBounds(n: number) {
    let next = n;
    if (typeof min === 'number') next = Math.max(min, next);
    if (typeof max === 'number') next = Math.min(max, next);
    return next;
  }

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className={cn(
          'block font-medium text-[var(--sea-ink)]',
          compactLabel ? 'text-xs' : 'text-sm',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        placeholder={placeholder}
        onFocus={() => {
          setDraft(String(safeValue));
          requestAnimationFrame(() => {
            if (!inputRef.current) return;
            if (inputRef.current.value === '0') {
              inputRef.current.select();
            }
          });
        }}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          if (raw === '') return;
          const next = Number(raw);
          if (!Number.isFinite(next)) return;
          onChange(clampToBounds(next));
        }}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          inputRef.current?.blur();
        }}
        onBlur={() => {
          const raw = draft ?? '';
          if (raw.trim() === '') {
            onChange(clampToBounds(0));
            setDraft(null);
            return;
          }
          const next = Number(raw);
          if (Number.isFinite(next)) {
            onChange(clampToBounds(next));
          }
          setDraft(null);
        }}
        className={cn(
          'mt-1 w-full rounded-xl border bg-[var(--surface-strong)] px-3 py-2 text-sm text-[var(--sea-ink)] shadow-sm outline-none transition',
          'placeholder:text-[var(--sea-ink-soft)] placeholder:opacity-70',
          'border-[var(--line)] focus:border-[var(--brand-red)] focus:ring-4 focus:ring-[rgba(211,47,47,0.18)]',
          error && 'border-[var(--brand-red)]',
          inputClassName,
        )}
      />
      {error ? (
        <p className="mt-1 text-xs font-medium text-[var(--brand-red)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}