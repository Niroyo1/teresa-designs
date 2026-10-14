import type { PhotoLayer } from '../types';
import Field from './Field';

type Props = {
  photo: PhotoLayer | null;
  onAdd: (file: File) => void;
  onChange: (patch: Partial<Omit<PhotoLayer, 'image'>>) => void;
  onRemove: () => void;
};

export default function PhotoControls({ photo, onAdd, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream">
          {photo ? 'Cambiar foto' : 'Agregar foto'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onAdd(file);
              event.target.value = '';
            }}
          />
        </label>
        {photo && (
          <button className="cursor-pointer text-sm underline" onClick={onRemove}>
            Quitar
          </button>
        )}
      </div>
      {photo && (
        <>
          <Field label="Tamaño" value={photo.scale} min={5} max={300} onChange={(scale) => onChange({ scale })} />
          <Field label="Posición X" value={photo.x} min={0} max={100} onChange={(x) => onChange({ x })} />
          <Field label="Posición Y" value={photo.y} min={0} max={100} onChange={(y) => onChange({ y })} />
          <Field label="Redondeo" value={photo.radius} min={0} max={100} onChange={(radius) => onChange({ radius })} />
        </>
      )}
    </div>
  );
}