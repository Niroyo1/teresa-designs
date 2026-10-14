import { FONTS } from '../constants';
import type { FontKey, TextLayer } from '../types';
import Field from './Field';

type Props = {
  texts: TextLayer[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<TextLayer>) => void;
  onRemove: (id: string) => void;
};

export default function TextControls({ texts, onAdd, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {texts.map((layer, index) => (
        <div
          key={layer.id}
          className="flex flex-col gap-3 rounded-lg border border-ink/20 bg-white p-3"
        >
          <div className="flex items-center justify-between text-sm font-bold">
            <span>Texto {index + 1}</span>
            <button
              className="cursor-pointer font-normal underline"
              onClick={() => onRemove(layer.id)}
            >
              Quitar
            </button>
          </div>
          <textarea
            className="min-h-16 w-full rounded border border-ink/30 px-2 py-1 text-sm"
            value={layer.text}
            onChange={(event) => onChange(layer.id, { text: event.target.value })}
          />
          <select
            className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
            value={layer.font}
            onChange={(event) => onChange(layer.id, { font: event.target.value as FontKey })}
          >
            {FONTS.map((font) => (
              <option key={font.key} value={font.key}>
                {font.key}
              </option>
            ))}
          </select>
          <Field label="Tamaño" value={layer.size} min={10} max={800} onChange={(size) => onChange(layer.id, { size })} />
          <Field label="Posición X" value={layer.x} min={0} max={100} onChange={(x) => onChange(layer.id, { x })} />
          <Field label="Posición Y" value={layer.y} min={0} max={100} onChange={(y) => onChange(layer.id, { y })} />
        </div>
      ))}
      <button
        className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream"
        onClick={onAdd}
      >
        Agregar texto
      </button>
    </div>
  );
}