type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function Field({ label, value, min, max, step = 1, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-24 shrink-0 font-bold">{label}</span>
      <input
        type="range"
        className="min-w-0 flex-1 accent-ink"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <input
        type="number"
        className="w-16 rounded border border-ink/30 bg-white px-1 py-0.5 text-right"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}