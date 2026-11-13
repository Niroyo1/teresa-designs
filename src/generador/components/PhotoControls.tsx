import { PHOTO_ASPECTS } from '../constants';
import type { PhotoLayer } from '../types';
import Field from './Field';

type Props = {
  photo: PhotoLayer | null;
  onAdd: () => void;
  onChange: (patch: Partial<Omit<PhotoLayer, 'image'>>) => void;
  onRemove: () => void;
  onTestImage: (file: File) => void;
  onClearTestImage: () => void;
};

const buttonClass = 'cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream';

export default function PhotoSlotControls({
  photo,
  onAdd,
  onChange,
  onRemove,
  onTestImage,
  onClearTestImage,
}: Props) {
  if (!photo) {
    return (
      <button className={buttonClass} onClick={onAdd}>
        Agregar imagen al template
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-ink/20 bg-white p-3">
      <div className="flex items-center justify-between text-sm font-bold">
        <span>Imagen del template</span>
        <button className="cursor-pointer font-normal underline" onClick={onRemove}>
          Quitar
        </button>
      </div>
      <input
        type="text"
        className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
        value={photo.label ?? ''}
        placeholder="Etiqueta que verá la usuaria"
        onChange={(event) => onChange({ label: event.target.value })}
      />
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          className="size-4 accent-ink"
          checked={photo.required ?? true}
          onChange={(event) => onChange({ required: event.target.checked })}
        />
        Requerida
      </label>
      {!photo.circle && (
        <select
          className="rounded border border-ink/30 bg-white px-2 py-1 text-sm"
          value={String(photo.aspect)}
          onChange={(event) => onChange({ aspect: Number(event.target.value) })}
        >
          {PHOTO_ASPECTS.map((option) => (
            <option key={option.label} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      <Field label="Ancho" value={photo.scale} min={5} max={300} onChange={(scale) => onChange({ scale })} />
      <Field label="Posición X" value={photo.x} min={0} max={100} onChange={(x) => onChange({ x })} />
      <Field label="Posición Y" value={photo.y} min={0} max={100} onChange={(y) => onChange({ y })} />
      <Field label="Zoom" value={photo.zoom} min={-90} max={300} onChange={(zoom) => onChange({ zoom })} />
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          className="size-4 accent-ink"
          checked={photo.aboveLines}
          onChange={(event) => onChange({ aboveLines: event.target.checked })}
        />
        Por encima de las líneas
      </label>
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          className="size-4 accent-ink"
          checked={photo.circle}
          onChange={(event) => onChange({ circle: event.target.checked })}
        />
        Recorte circular
      </label>
      {!photo.circle && (
        <Field label="Redondeo" value={photo.radius} min={0} max={100} onChange={(radius) => onChange({ radius })} />
      )}
      <div className="flex items-center gap-3">
        <label className={buttonClass}>
          {photo.image ? 'Cambiar imagen de prueba' : 'Imagen de prueba'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onTestImage(file);
              event.target.value = '';
            }}
          />
        </label>
        {photo.image && (
          <button className="cursor-pointer text-sm underline" onClick={onClearTestImage}>
            Quitar
          </button>
        )}
      </div>
      <p className="text-xs">La imagen de prueba solo sirve para ver el recorte, no se guarda.</p>
    </div>
  );
}