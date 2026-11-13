type Props = {
  label: string;
  required: boolean;
  hasImage: boolean;
  onFile: (file: File) => void;
  onClear: () => void;
};

export default function TemplatePhotoField({ label, required, hasImage, onFile, onClear }: Props) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="font-bold">
        {label}
        {required && ' *'}
      </span>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-md bg-ink px-3 py-2 text-sm font-bold text-cream">
          {hasImage ? 'Cambiar imagen' : 'Cargar imagen'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onFile(file);
              event.target.value = '';
            }}
          />
        </label>
        {hasImage && (
          <button className="cursor-pointer text-sm underline" onClick={onClear}>
            Quitar
          </button>
        )}
      </div>
    </div>
  );
}