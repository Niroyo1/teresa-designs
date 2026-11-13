import type { Template } from '../types';

type Props = {
  label: string;
  id: string;
  labels: string[];
  templates: Template[];
  isLocal: boolean;
  status: string;
  onLabelChange: (label: string) => void;
  onLoad: (id: string) => void;
  onSave: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onDelete: () => void;
};

const buttonClass = 'cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream';

export default function TemplateBuilderPanel({
  label,
  id,
  labels,
  templates,
  isLocal,
  status,
  onLabelChange,
  onLoad,
  onSave,
  onExport,
  onImport,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-bold">Nombre del template</span>
        <input
          type="text"
          className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
        />
        <span className="text-xs">Archivo: {id}.json</span>
      </label>
      <select
        className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
        value=""
        onChange={(event) => event.target.value && onLoad(event.target.value)}
      >
        <option value="">Cargar uno existente…</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.label}
          </option>
        ))}
      </select>
      <p className="text-sm">
        Campos: {labels.length ? labels.join(', ') : 'ninguno todavía'}
      </p>
      <div className="flex flex-wrap gap-2">
        <button className={buttonClass} onClick={onSave}>
          Guardar en este navegador
        </button>
        <button className={buttonClass} onClick={onExport}>
          Exportar JSON
        </button>
        <label className={buttonClass}>
          Importar JSON
          <input
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onImport(file);
              event.target.value = '';
            }}
          />
        </label>
      </div>
      {isLocal && (
        <button className="cursor-pointer self-start text-sm underline" onClick={onDelete}>
          Eliminar de este navegador
        </button>
      )}
      {status && <p className="text-sm font-bold">{status}</p>}
    </div>
  );
}