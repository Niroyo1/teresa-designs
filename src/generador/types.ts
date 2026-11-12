export type FormatKey = 'story' | 'post' | 'highlight' | 'avatar';

export type FontKey = 'Poppins' | 'Six Caps' | 'Roca Two' | 'Gala';

export type ThemeKey = 'default' | 'inverted';

export type IconKey =
  | 'taza'
  | 'cafeFrio'
  | 'te'
  | 'jugo'
  | 'botella'
  | 'lata'
  | 'granos'
  | 'medialuna'
  | 'sandwich'
  | 'empanada'
  | 'pan'
  | 'queso'
  | 'torta'
  | 'cupcake'
  | 'cookie'
  | 'alfajor'
  | 'postre'
  | 'roll'
  | 'frutilla'
  | 'etiqueta'
  | 'regalo'
  | 'porcentaje'
  | 'combo'
  | 'menu'
  | 'reloj'
  | 'calendario'
  | 'ubicacion'
  | 'llegar'
  | 'llevar'
  | 'tarjeta'
  | 'efectivo'
  | 'transferencia'
  | 'telefono'
  | 'redes'
  | 'wifi'
  | 'flor'
  | 'novedades'
  | 'estrella'
  | 'corazon'
  | 'hoja'
  | 'sol';

export type LogoDetail =
  | 'none'
  | 'steam'
  | 'awning'
  | 'underline'
  | 'arch'
  | 'flower'
  | 'cup'
  | 'sparkle'
  | 'tagline';

export type TextLayer = {
  id: string;
  text: string;
  font: FontKey;
  size: number;
  x: number;
  y: number;
};

export type PhotoLayer = {
  image: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
  radius: number;
  circle: boolean;
}

export type IconLayer = {
  id: string;
  icon: IconKey;
  size: number;
  x: number;
  y: number;
  stroke: number;
};

export type LineStyle = 'solid' | 'dashed' | 'dotted' | 'wavy' | 'zigzag' | 'scallop' | 'double';

export type LogoLayer = {
  font: FontKey;
  size: number;
  x: number;
  y: number;
  spacing: number;
  detail: LogoDetail;
  stroke: number;
};

export type LineLayer = {
  id: string;
  style: LineStyle;
  length: number;
  thickness: number;
  size: number;
  angle: number;
  x: number;
  y: number;
};