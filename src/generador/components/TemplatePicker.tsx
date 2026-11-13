import { NO_TEMPLATE } from '../constants';
import type { Template } from '../types';

type Props = {
  templates: Template[];
  value: string;
  onChange: (id: string) => void;
};

export default function TemplatePicker({ templates, value, onChange }: Props) {
  return (
    <select
      className="w-full rounded border border-ink/30 bg-white px-2 py-2 text-sm"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">Seleccionar…</option>
      {templates.map((template) => (
        <option key={template.id} value={template.id}>
          {template.label}
        </option>
      ))}
      <option value={NO_TEMPLATE}>Sin template</option>
    </select>
  );
}