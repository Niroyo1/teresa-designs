import { useEffect } from 'react';
import type { RefObject } from 'react';
import { loadFonts, renderImage } from '../renderImage';
import type {
  FormatKey,
  IconLayer,
  LineLayer,
  LogoLayer,
  PhotoLayer,
  TextLayer,
  ThemeKey,
} from '../types';

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  format: FormatKey;
  photo: PhotoLayer | null;
  texts: TextLayer[];
  icons: IconLayer[];
  logo: LogoLayer | null;
  theme: ThemeKey;
  lines: LineLayer[];
};

export default function PreviewCanvas({
  canvasRef,
  format,
  photo,
  texts,
  icons,
  logo,
  theme,
  lines,
}: Props) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    renderImage(canvas, format, photo, texts, icons, logo, theme, lines);
    loadFonts(texts, logo).then(() => {
      if (!cancelled) renderImage(canvas, format, photo, texts, icons, logo, theme, lines);
    });
    return () => {
      cancelled = true;
    };
  }, [canvasRef, format, photo, texts, icons, logo, theme, lines]);

  return (
    <div className="relative mx-auto w-fit max-w-full">
      <canvas
        ref={canvasRef}
        className="block h-auto max-h-[40vh] w-auto max-w-full shadow-xl lg:max-h-[78vh]"
      />
      {format === 'avatar' && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2 rounded-full border-2 border-dashed border-ink/40" />
      )}
    </div>
  );
}