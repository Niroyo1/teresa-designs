import { ICON_GROUPS } from '../constants';
import type { IconKey } from '../types';
import IconGlyph from './IconGlyph';

type Props = { value: IconKey; onChange: (icon: IconKey) => void };

export default function IconPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {ICON_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wide">{group.label}</h3>
          <div className="grid grid-cols-6 gap-1.5">
            {group.icons.map((option) => (
              <button
                key={option.key}
                type="button"
                title={option.label}
                aria-label={option.label}
                aria-pressed={value === option.key}
                className={`flex cursor-pointer items-center justify-center rounded-md p-1.5 ${
                  value === option.key ? 'bg-ink text-cream' : 'bg-neutral-200 text-ink'
                }`}
                onClick={() => onChange(option.key)}
              >
                <IconGlyph icon={option.key} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}