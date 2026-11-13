import type { PhotoLayer } from './types';

export function drawPhoto(
  ctx: CanvasRenderingContext2D,
  photo: PhotoLayer,
  width: number,
  height: number,
  placeholderColor: string
) {
  const centerX = (width * photo.x) / 100;
  const centerY = (height * photo.y) / 100;
  const size = (width * photo.scale) / 100;
  const image = photo.image;
  const aspect = photo.aspect ?? 0;
  const zoom = photo.zoom ?? 0;
  const frameWidth = size;
  const frameHeight = photo.circle
    ? size
    : aspect > 0
      ? size / aspect
      : image
        ? (size * image.naturalHeight) / image.naturalWidth
        : size;
  const left = centerX - frameWidth / 2;
  const top = centerY - frameHeight / 2;

  ctx.save();
  ctx.beginPath();
  if (photo.circle) {
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
  } else {
    const radius = (Math.min(frameWidth, frameHeight) / 2) * ((photo.radius ?? 0) / 100);
    ctx.roundRect(left, top, frameWidth, frameHeight, radius);
  }
  ctx.clip();
  if (image) {
    const fit = Math.max(frameWidth / image.naturalWidth, frameHeight / image.naturalHeight);
    const ratio = fit * Math.max(0.05, 1 + zoom / 100);
    const drawWidth = image.naturalWidth * ratio;
    const drawHeight = image.naturalHeight * ratio;
    ctx.drawImage(
      image,
      centerX - drawWidth / 2,
      centerY - drawHeight / 2,
      drawWidth,
      drawHeight
    );
  } else {
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = placeholderColor;
    ctx.fillRect(left, top, frameWidth, frameHeight);
  }
  ctx.restore();
}