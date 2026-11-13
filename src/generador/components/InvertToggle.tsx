type Props = { checked: boolean; onChange: (checked: boolean) => void };

export default function InvertToggle({ checked, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 text-sm font-bold">
      <input
        type="checkbox"
        className="size-4 accent-ink"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      Color invertido
    </label>
  );
}