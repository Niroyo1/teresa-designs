import { FONTS, LOGO_DETAILS } from '../constants';
import type { FontKey, LogoDetail, LogoLayer } from '../types';
import Field from './Field';

type Props = {
  logo: LogoLayer | null;
  onAdd: () => void;
  onChange: (patch: Partial<LogoLayer>) => void;
  onRemove: () => void;
};

export default function LogoControls({ logo, onAdd, onChange, onRemove }: Props) {
  if (!logo) {
    return (
      <button
        className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream"
        onClick={onAdd}
      >
        Agregar logo
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-ink/20 bg-white p-3">
      <div className="flex items-center justify-between text-sm font-bold">
        <span>Logo Teresa</span>
        <button className="cursor-pointer font-normal underline" onClick={onRemove}>
          Quitar
        </button>
      </div>
      <select
        className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
        value={logo.font}
        onChange={(event) => onChange({ font: event.target.value as FontKey })}
      >
        {FONTS.map((font) => (
          <option key={font.key} value={font.key}>
            {font.key}
          </option>
        ))}
      </select>
      <select
        className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
        value={logo.detail}
        onChange={(event) => onChange({ detail: event.target.value as LogoDetail })}
      >
        {LOGO_DETAILS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      <Field label="Tamaño" value={logo.size} min={40} max={600} onChange={(size) => onChange({ size })} />
      <Field label="Interletrado" value={logo.spacing} min={-10} max={60} onChange={(spacing) => onChange({ spacing })} />
      {logo.detail !== 'none' && (
        <Field label="Grosor" value={logo.stroke} min={1} max={8} step={0.5} onChange={(stroke) => onChange({ stroke })} />
      )}
      <Field label="Posición X" value={logo.x} min={0} max={100} onChange={(x) => onChange({ x })} />
      <Field label="Posición Y" value={logo.y} min={0} max={100} onChange={(y) => onChange({ y })} />
    </div>
  );
}