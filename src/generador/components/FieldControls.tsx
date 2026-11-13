import { FIELD_TYPES } from '../constants';
import { slugify } from '../templateModel';
import type { FieldType, TextField, TextLayer } from '../types';

type Props = {
  layer: TextLayer;
  onChange: (patch: Partial<TextLayer>) => void;
};

const withId = (layer: TextLayer, field: Omit<TextField, 'id'>): TextField => ({
  ...field,
  id: slugify(field.label) || `campo-${layer.id}`,
});

export default function FieldControls({ layer, onChange }: Props) {
  const field = layer.field;

  const update = (patch: Partial<Omit<TextField, 'id'>>) => {
    if (field) onChange({ field: withId(layer, { ...field, ...patch }) });
  };

  return (
    <div className="flex flex-col gap-3 rounded-md bg-neutral-100 p-2">
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          className="size-4 accent-ink"
          checked={Boolean(field)}
          onChange={(event) =>
            onChange({
              field: event.target.checked
                ? withId(layer, { label: `Campo ${layer.id}`, type: 'text', required: true })
                : undefined,
            })
          }
        />
        Campo editable en el template
      </label>
      {field && (
        <>
          <input
            type="text"
            className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
            value={field.label}
            placeholder="Etiqueta que verá la usuaria"
            onChange={(event) => update({ label: event.target.value })}
          />
          <select
            className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
            value={field.type}
            onChange={(event) => update({ type: event.target.value as FieldType })}
          >
            {FIELD_TYPES.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              className="size-4 accent-ink"
              checked={field.required}
              onChange={(event) => update({ required: event.target.checked })}
            />
            Requerido
          </label>
          <p className="text-xs">
            El texto de arriba es el ejemplo de la vista previa. Dos textos con la misma etiqueta
            comparten el valor.
          </p>
        </>
      )}
    </div>
  );
}