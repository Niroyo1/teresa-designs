export type FormatKey = 'story' | 'post';

export type FontKey = 'Poppins' | 'Six Caps' | 'Roca Two';

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

