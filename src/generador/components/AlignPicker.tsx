import { TEXT_ALIGNS } from '../constants';
import type { TextAlign } from '../types';

type Props = { value: TextAlign; onChange: (align: TextAlign) => void };

export default function AlignPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {TEXT_ALIGNS.map((align) => (
        <button
          key={align.key}
          type="button"
          className={`flex-1 cursor-pointer rounded-md px-2 py-1 text-sm font-bold ${
            value === align.key ? 'bg-ink text-cream' : 'bg-neutral-200 text-ink'
          }`}
          onClick={() => onChange(align.key)}
        >
          {align.label}
        </button>
      ))}
    </div>
  );
}