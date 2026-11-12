import type { FontKey, FormatKey, IconKey, LineStyle, LogoDetail, ThemeKey } from './types';

export const FORMATS: Record<
  FormatKey,
  { label: string; width: number; height: number; file: string }
> = {
  story: { label: 'Historia de Instagram', width: 1080, height: 1920, file: 'historia' },
  post: { label: 'Publicación', width: 1080, height: 1350, file: 'publicacion' },
  highlight: { label: 'Destacada', width: 1080, height: 1920, file: 'destacada' },
  avatar: { label: 'Avatar', width: 1080, height: 1080, file: 'avatar' },
};

export const FONTS: { key: FontKey; weight: number }[] = [
  { key: 'Poppins', weight: 400 },
  { key: 'Six Caps', weight: 400 },
  { key: 'Roca Two', weight: 700 },
  { key: 'Gala', weight: 400 },
];

export const THEMES: { key: ThemeKey; label: string }[] = [
  { key: 'default', label: 'Crema' },
  { key: 'inverted', label: 'Verde' },
];

export const ICON_GROUPS: {
  label: string;
  icons: { key: IconKey; label: string }[];
}[] = [
  {
    label: 'Bebidas',
    icons: [
      { key: 'taza', label: 'Taza' },
      { key: 'cafeFrio', label: 'Café frío' },
      { key: 'te', label: 'Té' },
      { key: 'jugo', label: 'Jugo de naranja' },
      { key: 'botella', label: 'Agua' },
      { key: 'lata', label: 'Gaseosa' },
      { key: 'granos', label: 'Grano de café' },
    ],
  },
  {
    label: 'Salados',
    icons: [
      { key: 'medialuna', label: 'Medialuna' },
      { key: 'sandwich', label: 'Sándwich' },
      { key: 'empanada', label: 'Empanada' },
      { key: 'pan', label: 'Pan' },
      { key: 'queso', label: 'Queso' },
    ],
  },
  {
    label: 'Dulces',
    icons: [
      { key: 'torta', label: 'Torta' },
      { key: 'cupcake', label: 'Cupcake' },
      { key: 'cookie', label: 'Cookie' },
      { key: 'alfajor', label: 'Alfajor' },
      { key: 'postre', label: 'Copa de postre' },
      { key: 'roll', label: 'Roll de canela' },
      { key: 'frutilla', label: 'Frutilla' },
    ],
  },
  {
    label: 'Promos',
    icons: [
      { key: 'etiqueta', label: 'Etiqueta' },
      { key: 'regalo', label: 'Regalo' },
      { key: 'porcentaje', label: 'Descuento' },
      { key: 'combo', label: 'Combo' },
    ],
  },
  {
    label: 'Info y servicios',
    icons: [
      { key: 'menu', label: 'Menú' },
      { key: 'reloj', label: 'Horario' },
      { key: 'calendario', label: 'Calendario' },
      { key: 'ubicacion', label: 'Ubicación' },
      { key: 'llegar', label: 'Cómo llegar' },
      { key: 'llevar', label: 'Para llevar' },
      { key: 'tarjeta', label: 'Tarjeta' },
      { key: 'efectivo', label: 'Efectivo' },
      { key: 'transferencia', label: 'Transferencia' },
      { key: 'telefono', label: 'Teléfono' },
      { key: 'redes', label: 'Redes' },
      { key: 'wifi', label: 'Wifi' },
    ],
  },
  {
    label: 'Marca',
    icons: [
      { key: 'flor', label: 'Flor' },
      { key: 'novedades', label: 'Novedades' },
      { key: 'estrella', label: 'Estrella' },
      { key: 'corazon', label: 'Corazón' },
      { key: 'hoja', label: 'Hoja' },
      { key: 'sol', label: 'Sol' },
    ],
  },
];

export const LOGO_DETAILS: { key: LogoDetail; label: string }[] = [
  { key: 'none', label: 'Sin detalle' },
  { key: 'steam', label: 'Vapor sobre la T' },
  { key: 'awning', label: 'Toldo' },
  { key: 'underline', label: 'Subrayado ondulado' },
  { key: 'arch', label: 'Arco' },
  { key: 'flower', label: 'Flor arriba' },
  { key: 'cup', label: 'Taza arriba' },
  { key: 'sparkle', label: 'Destello' },
  { key: 'tagline', label: 'Leyenda Café' },
];

export const LINE_STYLES: { key: LineStyle; label: string }[] = [
  { key: 'solid', label: 'Continua' },
  { key: 'dashed', label: 'Guiones' },
  { key: 'dotted', label: 'Puntos' },
  { key: 'wavy', label: 'Ondulada' },
  { key: 'zigzag', label: 'Zigzag' },
  { key: 'scallop', label: 'Festón' },
  { key: 'double', label: 'Doble' },
];