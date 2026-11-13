import { ICON_GROUPS } from '../constants';
import type { IconLayer } from '../types';
import Field from './Field';
import IconGlyph from './IconGlyph';
import IconPicker from './IconPicker';
import InvertToggle from './InvertToggle';

type Props = {
  icons: IconLayer[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<IconLayer>) => void;
  onRemove: (id: string) => void;
};

const iconLabel = (key: IconLayer['icon']) =>
  ICON_GROUPS.flatMap((group) => group.icons).find((option) => option.key === key)?.label ?? key;

export default function IconControls({ icons, onAdd, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {icons.map((layer, index) => (
        <div
          key={layer.id}
          className="flex flex-col gap-3 rounded-lg border border-ink/20 bg-white p-3"
        >
          <div className="flex items-center justify-between text-sm font-bold">
            <span>Icono {index + 1}</span>
            <button
              className="cursor-pointer font-normal underline"
              onClick={() => onRemove(layer.id)}
            >
              Quitar
            </button>
          </div>
          <details className="rounded border border-ink/30 bg-white">
            <summary className="flex cursor-pointer items-center gap-2 px-2 py-1 text-sm">
              <IconGlyph icon={layer.icon} className="size-5" />
              {iconLabel(layer.icon)}
            </summary>
            <div className="border-t border-ink/20 p-2">
              <IconPicker value={layer.icon} onChange={(icon) => onChange(layer.id, { icon })} />
            </div>
          </details>
          <Field label="Tamaño" value={layer.size} min={5} max={150} onChange={(size) => onChange(layer.id, { size })} />
          <Field label="Grosor" value={layer.stroke} min={0.5} max={4} step={0.1} onChange={(stroke) => onChange(layer.id, { stroke })} />
          <InvertToggle checked={layer.inverted} onChange={(inverted) => onChange(layer.id, { inverted })} />
          <Field label="Posición X" value={layer.x} min={0} max={100} onChange={(x) => onChange(layer.id, { x })} />
          <Field label="Posición Y" value={layer.y} min={0} max={100} onChange={(y) => onChange(layer.id, { y })} />
        </div>
      ))}
      <button
        className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream"
        onClick={onAdd}
      >
        Agregar icono
      </button>
    </div>
  );
}