import { FORMATS } from './constants';
import { drawIcon } from './icons';
import { drawPhoto } from './photo';
import { drawLine } from './lines';
import { drawLogo, LOGO_TEXT, logoFont } from './logo';
import { drawTextDecorations, fontSpec, layoutText } from './textLayout';
import type {
  FormatKey,
  IconLayer,
  LineLayer,
  LogoLayer,
  PhotoLayer,
  TextLayer,
  ThemeKey,
} from './types';

const cssColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadFonts(texts: TextLayer[], logo: LogoLayer | null = null) {
  await Promise.all([
    ...texts.map((layer) => document.fonts.load(fontSpec(layer), layer.text || 'A')),
    ...(logo ? [document.fonts.load(logoFont(logo.size, logo.font), LOGO_TEXT)] : []),
    ...(logo?.detail === 'tagline' ? [document.fonts.load('400 40px "Six Caps"', 'CAFÉ')] : []),
  ]);
}

export function renderImage(
  canvas: HTMLCanvasElement,
  format: FormatKey,
  photo: PhotoLayer | null,
  texts: TextLayer[],
  icons: IconLayer[] = [],
  logo: LogoLayer | null = null,
  theme: ThemeKey = 'default',
  lines: LineLayer[] = []
) {
  const { width, height } = FORMATS[format];
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cream = cssColor('--color-cream', '#f7f0e8');
  const ink = cssColor('--color-ink', '#14583a');
  const background = theme === 'inverted' ? ink : cream;
  const foreground = theme === 'inverted' ? cream : ink;

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  if (photo && !photo.aboveLines) drawPhoto(ctx, photo, width, height, foreground);

  if (logo) drawLogo(ctx, logo, width, height, foreground);
  lines.forEach((layer) =>
    drawLine(ctx, layer, width, height, layer.inverted ? background : foreground)
  );
  if (photo && photo.aboveLines) drawPhoto(ctx, photo, width, height, foreground);
  icons.forEach((layer) =>
    drawIcon(ctx, layer, width, height, layer.inverted ? background : foreground)
  );

  ctx.fillStyle = foreground;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  texts.forEach((layer) => {
    const { lines, size } = layoutText(ctx, layer, width);
    ctx.font = fontSpec(layer, size);
    const lineHeight = size * 1.15;
    const startY = (height * layer.y) / 100 - ((lines.length - 1) * lineHeight) / 2;
    ctx.lineWidth = (size * layer.bold) / 100;
    ctx.lineJoin = 'round';
    const textColor = layer.inverted ? background : foreground;
    ctx.fillStyle = textColor;
    ctx.strokeStyle = textColor;
    ctx.textAlign = layer.align;
    lines.forEach((line, index) => {
      const lineX = (width * layer.x) / 100;
      const lineY = startY + index * lineHeight;
      ctx.fillText(line, lineX, lineY);
      if (layer.bold > 0) ctx.strokeText(line, lineX, lineY);
      drawTextDecorations(ctx, layer, line, lineX, lineY, size, textColor);
    });
  });

  if (format === 'highlight') {
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
}