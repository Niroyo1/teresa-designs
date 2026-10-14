import { FONTS, FORMATS } from './constants';
import type { FormatKey, PhotoLayer, TextLayer } from './types';

const cssColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const fontSpec = (layer: TextLayer) => {
  const weight = FONTS.find((font) => font.key === layer.font)?.weight ?? 400;
  return `${weight} ${layer.size}px "${layer.font}", sans-serif`;
};

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadFonts(texts: TextLayer[]) {
  await Promise.all(
    texts.map((layer) => document.fonts.load(fontSpec(layer), layer.text || 'A'))
  );
}

export function renderImage(
  canvas: HTMLCanvasElement,
  format: FormatKey,
  photo: PhotoLayer | null,
  texts: TextLayer[]
) {
  const { width, height } = FORMATS[format];
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = cssColor('--color-cream', '#f7f0e8');
  ctx.fillRect(0, 0, width, height);

  if (photo) {
    const drawWidth = (width * photo.scale) / 100;
    const drawHeight = (drawWidth * photo.image.naturalHeight) / photo.image.naturalWidth;
    const left = (width * photo.x) / 100 - drawWidth / 2;
    const top = (height * photo.y) / 100 - drawHeight / 2;
    const radius = (Math.min(drawWidth, drawHeight) / 2) * (photo.radius / 100);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(left, top, drawWidth, drawHeight, radius);
    ctx.clip();
    ctx.drawImage(photo.image, left, top, drawWidth, drawHeight);
    ctx.restore();
  }

  ctx.fillStyle = cssColor('--color-ink', '#14583a');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  texts.forEach((layer) => {
    ctx.font = fontSpec(layer);
    const lines = layer.text.split('\n');
    const lineHeight = layer.size * 1.15;
    const startY = (height * layer.y) / 100 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, (width * layer.x) / 100, startY + index * lineHeight);
    });
  });
}