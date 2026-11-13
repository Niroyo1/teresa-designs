import type { TextLayer } from '../types';

type Props = {
  layer: TextLayer;
  onChange: (patch: Partial<TextLayer>) => void;
};

const STYLES: {
  key: 'isBold' | 'italic' | 'underline' | 'strike' | 'uppercase';
  label: string;
  symbol: string;
  className: string;
}[] = [
  { key: 'isBold', label: 'Negrita', symbol: 'N', className: 'font-bold' },
  { key: 'italic', label: 'Itálica', symbol: 'I', className: 'italic' },
  { key: 'underline', label: 'Subrayado', symbol: 'S', className: 'underline' },
  { key: 'strike', label: 'Tachado', symbol: 'T', className: 'line-through' },
  { key: 'uppercase', label: 'Mayúsculas', symbol: 'AA', className: '' },
];

export default function TextStylePicker({ layer, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {STYLES.map((style) => (
        <button
          key={style.key}
          type="button"
          title={style.label}
          aria-label={style.label}
          aria-pressed={layer[style.key]}
          className={`flex-1 cursor-pointer rounded-md px-2 py-1 text-sm ${style.className} ${
            layer[style.key] ? 'bg-ink text-cream' : 'bg-neutral-200 text-ink'
          }`}
          onClick={() => onChange({ [style.key]: !layer[style.key] })}
        >
          {style.symbol}
        </button>
      ))}
    </div>
  );
}