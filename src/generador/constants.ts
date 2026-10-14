import type { FontKey, FormatKey } from './types';

export const FORMATS: Record<
  FormatKey,
  { label: string; width: number; height: number; file: string }
> = {
  story: { label: 'Historia de Instagram', width: 1080, height: 1920, file: 'historia' },
  post: { label: 'Publicación', width: 1080, height: 1350, file: 'publicacion' },
};

export const FONTS: { key: FontKey; weight: number }[] = [
  { key: 'Poppins', weight: 400 },
  { key: 'Six Caps', weight: 400 },
  { key: 'Roca Two', weight: 700 },
];