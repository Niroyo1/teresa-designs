export type FormatKey = 'story' | 'post' | 'highlight' | 'avatar';

export type FontKey = 'Poppins' | 'Six Caps' | 'Roca Two' | 'Gala';

export type ThemeKey = 'default' | 'inverted';

export type TextAlign = 'left' | 'center' | 'right';

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
  | 'whatsapp'
  | 'wifi'
  | 'flor'
  | 'novedades'
  | 'estrella'
  | 'corazon'
  | 'hoja'
  | 'sol'
  | 'solNube'
  | 'nube'
  | 'lluvia'
  | 'viento'
  | 'donut'
  | 'helado'
  | 'pizza'
  | 'cubiertos';

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

export type FieldType = 'text' | 'multiline' | 'price';

export type TextField = {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
};

export type TextLayer = {
  id: string;
  text: string;
  font: FontKey;
  size: number;
  bold: number;
  inverted: boolean;
  align: TextAlign;
  isBold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  uppercase: boolean;
  maxWidth: number;
  field?: TextField;
  x: number;
  y: number;
};

export type PhotoLayer = {
  image: HTMLImageElement | null;
  scale: number;
  x: number;
  y: number;
  radius: number;
  circle: boolean;
  aspect: number;
  zoom: number;
  aboveLines: boolean;
  label?: string;
  required?: boolean;
};

export type PhotoSlot = {
  label: string;
  required: boolean;
  scale: number;
  x: number;
  y: number;
  radius: number;
  circle: boolean;
  aspect: number;
  zoom: number;
  aboveLines: boolean;
}

export type IconLayer = {
  id: string;
  icon: IconKey;
  size: number;
  x: number;
  y: number;
  stroke: number;
  inverted: boolean;
};

export type LineStyle = 'solid' | 'block' | 'dashed' | 'dotted' | 'wavy' | 'zigzag' | 'scallop' | 'double';

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
  radius: number;
  inverted: boolean;
  angle: number;
  x: number;
  y: number;
};

export type Template = {
  id: string;
  label: string;
  format: FormatKey;
  texts: TextLayer[];
  icons: IconLayer[];
  lines: LineLayer[];
  logo: LogoLayer | null;
  photo: PhotoSlot | null;
};