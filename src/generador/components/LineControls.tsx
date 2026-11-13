import { LINE_STYLES } from '../constants';
import type { LineLayer, LineStyle } from '../types';
import Field from './Field';
import InvertToggle from './InvertToggle';

type Props = {
  lines: LineLayer[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<LineLayer>) => void;
  onRemove: (id: string) => void;
};

export default function LineControls({ lines, onAdd, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {lines.map((layer, index) => (
        <div
          key={layer.id}
          className="flex flex-col gap-3 rounded-lg border border-ink/20 bg-white p-3"
        >
          <div className="flex items-center justify-between text-sm font-bold">
            <span>Línea {index + 1}</span>
            <button
              className="cursor-pointer font-normal underline"
              onClick={() => onRemove(layer.id)}
            >
              Quitar
            </button>
          </div>
          <select
            className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
            value={layer.style}
            onChange={(event) => onChange(layer.id, { style: event.target.value as LineStyle })}
          >
            {LINE_STYLES.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <Field label="Largo" value={layer.length} min={2} max={150} onChange={(length) => onChange(layer.id, { length })} />
          <Field
            label={layer.style === 'block' ? 'Alto' : 'Grosor'}
            value={layer.thickness}
            min={1}
            max={layer.style === 'block' ? 2000 : 80}
            onChange={(thickness) => onChange(layer.id, { thickness })}
          />
          {layer.style === 'block' && (
            <Field label="Redondeo" value={layer.radius} min={0} max={100} onChange={(radius) => onChange(layer.id, { radius })} />
          )}
          {layer.style !== 'solid' && layer.style !== 'block' && (
            <Field label="Patrón" value={layer.size} min={8} max={200} onChange={(size) => onChange(layer.id, { size })} />
          )}
          <Field label="Ángulo" value={layer.angle} min={-180} max={180} onChange={(angle) => onChange(layer.id, { angle })} />
          <InvertToggle checked={layer.inverted} onChange={(inverted) => onChange(layer.id, { inverted })} />
          <Field label="Posición X" value={layer.x} min={0} max={100} onChange={(x) => onChange(layer.id, { x })} />
          <Field label="Posición Y" value={layer.y} min={0} max={100} onChange={(y) => onChange(layer.id, { y })} />
        </div>
      ))}
      <button
        className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream"
        onClick={onAdd}
      >
        Agregar línea
      </button>
    </div>
  );
}