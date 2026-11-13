import { FORMATS } from './constants';
import type {
  FormatKey,
  IconLayer,
  LineLayer,
  LogoLayer,
  PhotoLayer,
  PhotoSlot,
  Template,
  TextField,
  TextLayer,
} from './types';

export type StoryView = {
  format: FormatKey;
  photo: PhotoLayer | null;
  texts: TextLayer[];
  icons: IconLayer[];
  lines: LineLayer[];
  logo: LogoLayer | null;
};

export const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function fieldsOf(template: Pick<Template, 'texts'>): TextField[] {
  const fields = new Map<string, TextField>();
  template.texts.forEach((layer) => {
    const field = layer.field;
    if (!field) return;
    const current = fields.get(field.id);
    fields.set(
      field.id,
      current ? { ...current, required: current.required || field.required } : field
    );
  });
  return [...fields.values()];
}

export function formatFieldValue(field: TextField, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (field.type === 'price') return trimmed.startsWith('$') ? trimmed : `$${trimmed}`;
  return trimmed;
}

export function missingFields(template: Template, values: Record<string, string>) {
  return fieldsOf(template).filter((field) => field.required && !values[field.id]?.trim());
}

export const toSlot = (photo: PhotoLayer): PhotoSlot => ({
  label: photo.label ?? 'Imagen',
  required: photo.required ?? true,
  scale: photo.scale,
  x: photo.x,
  y: photo.y,
  radius: photo.radius,
  circle: photo.circle,
  aspect: photo.aspect,
  zoom: photo.zoom,
  aboveLines: photo.aboveLines,
});

export function resolveTemplate(
  template: Template,
  values: Record<string, string>,
  image: HTMLImageElement | null = null
): StoryView {
  const slot = template.photo;
  return {
    format: template.format,
    photo: slot ? (image ? { ...slot, image } : slot.required ? { ...slot, image: null } : null) : null,
    texts: template.texts.map((layer) => {
      if (!layer.field) return layer;
      const formatted = formatFieldValue(layer.field, values[layer.field.id] ?? '');
      return { ...layer, text: formatted || (layer.field.required ? layer.text : '') };
    }),
    icons: template.icons,
    lines: template.lines,
    logo: template.logo,
  };
}

const TEXT_DEFAULTS: Omit<TextLayer, 'id'> = {
  text: '',
  font: 'Poppins',
  size: 80,
  bold: 0,
  inverted: false,
  align: 'center',
  isBold: false,
  italic: false,
  underline: false,
  strike: false,
  uppercase: false,
  maxWidth: 0,
  x: 50,
  y: 50,
};

const ICON_DEFAULTS: Omit<IconLayer, 'id'> = {
  icon: 'taza',
  size: 40,
  x: 50,
  y: 50,
  stroke: 1.5,
  inverted: false,
};

const LINE_DEFAULTS: Omit<LineLayer, 'id'> = {
  style: 'solid',
  length: 60,
  thickness: 8,
  size: 40,
  radius: 0,
  inverted: false,
  angle: 0,
  x: 50,
  y: 50,
};

const PHOTO_DEFAULTS: PhotoSlot = {
  label: 'Imagen',
  required: true,
  scale: 80,
  x: 50,
  y: 50,
  radius: 0,
  circle: false,
  aspect: 1,
  zoom: 0,
  aboveLines: false,
};

const LOGO_DEFAULTS: LogoLayer = {
  font: 'Roca Two',
  size: 220,
  x: 50,
  y: 50,
  spacing: 4,
  detail: 'none',
  stroke: 3,
};

type RawTemplate = {
  id?: unknown;
  label?: unknown;
  format?: unknown;
  texts?: Partial<TextLayer>[];
  icons?: Partial<IconLayer>[];
  lines?: Partial<LineLayer>[];
  logo?: Partial<LogoLayer> | null;
  photo?: Partial<PhotoSlot> | null;
};

export function normalizeTemplate(raw: unknown): Template | null {
  const data = raw as RawTemplate | null;
  if (!data || typeof data.id !== 'string' || typeof data.label !== 'string') return null;

  const format: FormatKey =
    typeof data.format === 'string' && data.format in FORMATS ? (data.format as FormatKey) : 'story';
  const list = <T,>(value: T[] | undefined) => (Array.isArray(value) ? value : []);

  return {
    id: data.id,
    label: data.label,
    format,
    texts: list(data.texts).map((layer, index) => ({
      ...TEXT_DEFAULTS,
      ...layer,
      id: String(layer.id ?? `t${index}`),
    })),
    icons: list(data.icons).map((layer, index) => ({
      ...ICON_DEFAULTS,
      ...layer,
      id: String(layer.id ?? `i${index}`),
    })),
    lines: list(data.lines).map((layer, index) => ({
      ...LINE_DEFAULTS,
      ...layer,
      id: String(layer.id ?? `l${index}`),
    })),
    logo: data.logo ? { ...LOGO_DEFAULTS, ...data.logo } : null,
    photo: data.photo ? { ...PHOTO_DEFAULTS, ...data.photo } : null,
  };
}