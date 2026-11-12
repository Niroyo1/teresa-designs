import { THEMES } from '../constants';
import type { ThemeKey } from '../types';

type Props = { value: ThemeKey; onChange: (theme: ThemeKey) => void };

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {THEMES.map((theme) => (
        <button
          key={theme.key}
          className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-bold ${
            value === theme.key ? 'bg-ink text-cream' : 'bg-neutral-200 text-ink'
          }`}
          onClick={() => onChange(theme.key)}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}