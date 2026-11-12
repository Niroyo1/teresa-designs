import { FONTS } from './constants';
import { drawIcon } from './icons';
import type { FontKey, IconKey, LogoLayer } from './types';

export const LOGO_TEXT = 'Teresa';

export const logoFont = (size: number, font: FontKey) => {
  const weight = FONTS.find((option) => option.key === font)?.weight ?? 400;
  return `${weight} ${size}px "${font}", serif`;
};

export function drawLogo(
  ctx: CanvasRenderingContext2D,
  layer: LogoLayer,
  width: number,
  height: number,
  color: string
) {
  const centerX = (width * layer.x) / 100;
  const centerY = (height * layer.y) / 100;

  ctx.save();
  ctx.font = logoFont(layer.size, layer.font);
  ctx.letterSpacing = `${layer.spacing}px`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  const total = ctx.measureText(LOGO_TEXT).width - layer.spacing;
  const firstLetter = ctx.measureText(LOGO_TEXT[0]);
  const capHeight = firstLetter.actualBoundingBoxAscent;
  const left = centerX - total / 2;
  const baseline = centerY + capHeight / 2;
  const top = baseline - capHeight;

  ctx.fillText(LOGO_TEXT, left, baseline);

  const lineWidth = (layer.size * layer.stroke) / 100;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (layer.detail === 'steam') {
    const letterCenter = left + (firstLetter.width - layer.spacing) / 2;
    const gap = layer.size * 0.08;
    const rise = layer.size * 0.32;
    const sway = layer.size * 0.06;
    const spread = layer.size * 0.09;
    [-spread, spread].forEach((offset) => {
      const x = letterCenter + offset;
      const y = top - gap;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - sway, y - rise * 0.35, x + sway, y - rise * 0.65, x, y - rise);
      ctx.stroke();
    });
  }

  if (layer.detail === 'awning') {
    const scallops = 6;
    const radius = total / (scallops * 2);
    const y = top - layer.size * 0.12 - radius;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(left + total, y);
    for (let index = 0; index < scallops; index++) {
      const arcX = left + radius + index * radius * 2;
      ctx.moveTo(arcX + radius, y);
      ctx.arc(arcX, y, radius, 0, Math.PI);
    }
    ctx.stroke();
  }

  const accent = (icon: IconKey, iconSize: number, x: number, y: number) =>
    drawIcon(
      ctx,
      {
        id: 'logo',
        icon,
        size: (iconSize / width) * 100,
        x: (x / width) * 100,
        y: (y / height) * 100,
        stroke: (lineWidth * 24) / iconSize,
      },
      width,
      height,
      color
    );

  if (layer.detail === 'underline') {
    const waves = 6;
    const step = total / waves;
    const amplitude = layer.size * 0.04;
    const y = baseline + layer.size * 0.16;
    ctx.beginPath();
    ctx.moveTo(left, y);
    for (let index = 0; index < waves; index++) {
      const direction = index % 2 === 0 ? -1 : 1;
      ctx.quadraticCurveTo(
        left + step * (index + 0.5),
        y + direction * amplitude * 2,
        left + step * (index + 1),
        y
      );
    }
    ctx.stroke();
  }

  if (layer.detail === 'arch') {
    const halfWidth = total / 2 + layer.size * 0.3;
    const radiusY = layer.size * 0.8;
    const crownY = top - layer.size * 0.1;
    const bottom = baseline + layer.size * 0.3;
    ctx.beginPath();
    ctx.moveTo(centerX - halfWidth, bottom);
    ctx.lineTo(centerX - halfWidth, crownY);
    ctx.ellipse(centerX, crownY, halfWidth, radiusY, 0, Math.PI, Math.PI * 2);
    ctx.lineTo(centerX + halfWidth, bottom);
    ctx.closePath();
    ctx.stroke();
  }

  if (layer.detail === 'flower' || layer.detail === 'cup') {
    const iconSize = layer.size * 0.55;
    accent(
      layer.detail === 'flower' ? 'flor' : 'taza',
      iconSize,
      centerX,
      top - layer.size * 0.15 - iconSize / 2
    );
  }

  if (layer.detail === 'sparkle') {
    const iconSize = layer.size * 0.35;
    const xHeight = ctx.measureText('x').actualBoundingBoxAscent;
    accent(
      'novedades',
      iconSize,
      left + total - layer.size * 0.12,
      baseline - xHeight - layer.size * 0.08 - iconSize / 2
    );
  }

  if (layer.detail === 'tagline') {
    const tagSize = layer.size * 0.3;
    const tagSpacing = layer.size * 0.1;
    ctx.font = `400 ${tagSize}px "Six Caps", sans-serif`;
    ctx.letterSpacing = `${tagSpacing}px`;
    const tag = ctx.measureText('CAFÉ');
    const tagWidth = tag.width - tagSpacing;
    const tagLeft = centerX - tagWidth / 2;
    const tagBaseline = baseline + layer.size * 0.16 + tag.actualBoundingBoxAscent;
    const lineY = tagBaseline - tag.actualBoundingBoxAscent / 2;
    const gap = layer.size * 0.08;
    ctx.fillText('CAFÉ', tagLeft, tagBaseline);
    ctx.beginPath();
    ctx.moveTo(left, lineY);
    ctx.lineTo(tagLeft - gap, lineY);
    ctx.moveTo(tagLeft + tagWidth + gap, lineY);
    ctx.lineTo(left + total, lineY);
    ctx.stroke();
  }

  ctx.restore();
}