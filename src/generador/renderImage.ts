import { FONTS, FORMATS } from './constants';
import { drawIcon } from './icons';
import { drawLine } from './lines';
import { drawLogo, LOGO_TEXT, logoFont } from './logo';
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

    if (photo) {
    const centerX = (width * photo.x) / 100;
    const centerY = (height * photo.y) / 100;
    const size = (width * photo.scale) / 100;
    const { naturalWidth, naturalHeight } = photo.image;

    ctx.save();
    ctx.beginPath();
    if (photo.circle) {
      const ratio = size / Math.min(naturalWidth, naturalHeight);
      const drawWidth = naturalWidth * ratio;
      const drawHeight = naturalHeight * ratio;
      ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(
        photo.image,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } else {
      const drawWidth = size;
      const drawHeight = (size * naturalHeight) / naturalWidth;
      const left = centerX - drawWidth / 2;
      const top = centerY - drawHeight / 2;
      const radius = (Math.min(drawWidth, drawHeight) / 2) * (photo.radius / 100);
      ctx.roundRect(left, top, drawWidth, drawHeight, radius);
      ctx.clip();
      ctx.drawImage(photo.image, left, top, drawWidth, drawHeight);
    }
    ctx.restore();
  }

  if (logo) drawLogo(ctx, logo, width, height, foreground);
  lines.forEach((layer) => drawLine(ctx, layer, width, height, foreground));
  icons.forEach((layer) => drawIcon(ctx, layer, width, height, foreground));

  ctx.fillStyle = foreground;
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

  if (format === 'highlight') {
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
}