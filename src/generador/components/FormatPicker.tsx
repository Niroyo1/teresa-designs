import { FORMATS } from '../constants';
import type { FormatKey } from '../types';

type Props = { value: FormatKey; onChange: (format: FormatKey) => void };

export default function FormatPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {(Object.keys(FORMATS) as FormatKey[]).map((key) => (
        <button
          key={key}
          className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-bold ${
            value === key ? 'bg-ink text-cream' : 'bg-neutral-200 text-ink'
          }`}
          onClick={() => onChange(key)}
        >
          {FORMATS[key].label}
          <span className="block text-xs font-normal">
            {FORMATS[key].width}×{FORMATS[key].height}
          </span>
        </button>
      ))}
    </div>
  );
}