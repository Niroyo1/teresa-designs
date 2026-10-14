export default function DownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded-full bg-ink px-6 py-3 text-base font-bold text-cream shadow transition-opacity hover:opacity-90 active:opacity-80 print:hidden"
    >
      Descargar
    </button>
  );
}