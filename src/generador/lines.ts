import type { LineLayer } from './types';

export function drawLine(
  ctx: CanvasRenderingContext2D,
  layer: LineLayer,
  width: number,
  height: number,
  color: string
) {
  const length = (width * layer.length) / 100;
  const half = length / 2;
  const { thickness, size } = layer;

  ctx.save();
  ctx.translate((width * layer.x) / 100, (height * layer.y) / 100);
  ctx.rotate((layer.angle * Math.PI) / 180);
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();

  if (layer.style === 'block') {
    const radius = (Math.min(length, thickness) / 2) * (layer.radius / 100);
    ctx.fillStyle = color;
    ctx.roundRect(-half, -thickness / 2, length, thickness, radius);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (layer.style === 'solid') {
    ctx.moveTo(-half, 0);
    ctx.lineTo(half, 0);
  }

  if (layer.style === 'dashed') {
    ctx.setLineDash([size, size * 0.6 + thickness]);
    ctx.moveTo(-half, 0);
    ctx.lineTo(half, 0);
  }

  if (layer.style === 'dotted') {
    ctx.setLineDash([0.01, thickness + size * 0.4]);
    ctx.moveTo(-half, 0);
    ctx.lineTo(half, 0);
  }

  if (layer.style === 'wavy') {
    const waves = Math.max(1, Math.round(length / size));
    const step = length / waves;
    const amplitude = size * 0.25;
    ctx.moveTo(-half, 0);
    for (let index = 0; index < waves; index++) {
      const direction = index % 2 === 0 ? -1 : 1;
      ctx.quadraticCurveTo(
        -half + step * (index + 0.5),
        direction * amplitude * 2,
        -half + step * (index + 1),
        0
      );
    }
  }

  if (layer.style === 'zigzag') {
    const segments = Math.max(2, Math.round(length / (size / 2)));
    const step = length / segments;
    const amplitude = size * 0.25;
    ctx.moveTo(-half, 0);
    for (let index = 1; index < segments; index++) {
      ctx.lineTo(-half + step * index, index % 2 === 0 ? amplitude : -amplitude);
    }
    ctx.lineTo(half, 0);
  }

  if (layer.style === 'scallop') {
    const arcs = Math.max(1, Math.round(length / size));
    const radius = length / (arcs * 2);
    for (let index = 0; index < arcs; index++) {
      const centerX = -half + radius + index * radius * 2;
      ctx.moveTo(centerX + radius, 0);
      ctx.arc(centerX, 0, radius, 0, Math.PI);
    }
  }

  if (layer.style === 'double') {
    const offset = (thickness + size * 0.25) / 2;
    ctx.moveTo(-half, -offset);
    ctx.lineTo(half, -offset);
    ctx.moveTo(-half, offset);
    ctx.lineTo(half, offset);
  }

  ctx.stroke();
  ctx.restore();
}