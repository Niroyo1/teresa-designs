import { useEffect } from 'react';
import type { RefObject } from 'react';
import { loadFonts, renderImage } from '../renderImage';
import type { FormatKey, PhotoLayer, TextLayer } from '../types';

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  format: FormatKey;
  photo: PhotoLayer | null;
  texts: TextLayer[];
};

export default function PreviewCanvas({ canvasRef, format, photo, texts }: Props) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    renderImage(canvas, format, photo, texts);
    loadFonts(texts).then(() => {
      if (!cancelled) renderImage(canvas, format, photo, texts);
    });
    return () => {
      cancelled = true;
    };
  }, [canvasRef, format, photo, texts]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto block h-auto max-h-[40vh] w-auto max-w-full shadow-xl lg:max-h-[78vh]"
    />
  );
}