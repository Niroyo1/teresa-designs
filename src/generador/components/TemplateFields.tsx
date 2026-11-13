import type { TextField } from '../types';

type Props = {
  fields: TextField[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
};

const inputClass = 'w-full rounded border border-ink/30 bg-white px-2 py-1 text-sm';

export default function TemplateFields({ fields, values, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => (
        <label key={field.id} className="flex flex-col gap-1 text-sm">
          <span className="font-bold">
            {field.label}
            {field.required && ' *'}
          </span>
          {field.type !== 'price' ? (
            <textarea
              className={`${inputClass} ${field.type === 'multiline' ? 'min-h-24' : 'min-h-12'}`}
              value={values[field.id] ?? ''}
              onChange={(event) => onChange(field.id, event.target.value)}
            />
          ) : (
            <input
              type="text"
              inputMode={field.type === 'price' ? 'numeric' : 'text'}
              placeholder={field.type === 'price' ? 'Ej: 390' : undefined}
              className={inputClass}
              value={values[field.id] ?? ''}
              onChange={(event) => onChange(field.id, event.target.value)}
            />
          )}
        </label>
      ))}
    </div>
  );
}