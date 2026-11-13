import { FONTS } from './constants';
import type { TextLayer } from './types';

export const fontSpec = (layer: TextLayer, size: number = layer.size) => {
  const base = FONTS.find((font) => font.key === layer.font)?.weight ?? 400;
  const weight = layer.isBold ? Math.max(base, 700) : base;
  return `${layer.italic ? 'italic ' : ''}${weight} ${size}px "${layer.font}", sans-serif`;
};

export function layoutText(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  canvasWidth: number
) {
  const source = layer.uppercase ? layer.text.toUpperCase() : layer.text;
  const paragraphs = source.split('\n');
  if (layer.maxWidth <= 0) return { lines: paragraphs, size: layer.size };

  const maxPixels = (canvasWidth * layer.maxWidth) / 100;
  let size = layer.size;
  ctx.font = fontSpec(layer, size);

  const widest = Math.max(
    0,
    ...source
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ctx.measureText(word).width)
  );
  if (widest > maxPixels) {
    size = Math.max(layer.size * 0.4, (layer.size * maxPixels) / widest);
    ctx.font = fontSpec(layer, size);
  }

  const lines: string[] = [];
  paragraphs.forEach((paragraph) => {
    let current = '';
    paragraph
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        const candidate = current ? `${current} ${word}` : word;
        if (current && ctx.measureText(candidate).width > maxPixels) {
          lines.push(current);
          current = word;
        } else {
          current = candidate;
        }
      });
    lines.push(current);
  });

  return { lines, size };
}

export function drawTextDecorations(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  line: string,
  x: number,
  y: number,
  size: number,
  color: string
) {
  if (!line || (!layer.underline && !layer.strike)) return;

  const textWidth = ctx.measureText(line).width;
  const left = layer.align === 'center' ? x - textWidth / 2 : layer.align === 'right' ? x - textWidth : x;
  const baseline = y + ctx.measureText('H').actualBoundingBoxDescent;
  const thickness = Math.max(1, size * 0.06 + (size * layer.bold) / 100);

  ctx.fillStyle = color;
  if (layer.underline) {
    ctx.fillRect(left, baseline + size * 0.1, textWidth, thickness);
  }
  if (layer.strike) {
    const xHeight = ctx.measureText('x');
    const middle = baseline - (xHeight.actualBoundingBoxAscent + xHeight.actualBoundingBoxDescent) / 2;
    ctx.fillRect(left, middle - thickness / 2, textWidth, thickness);
  }
}