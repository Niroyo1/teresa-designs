import { useState } from 'react';
import { loadImage } from './renderImage';
import type {
  FormatKey,
  IconLayer,
  LineLayer,
  LogoLayer,
  PhotoLayer,
  Template,
  TextLayer,
  ThemeKey,
} from './types';

let nextId = 1;

const newText = (): TextLayer => ({
  id: String(nextId++),
  text: 'Texto',
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
});

const newIcon = (): IconLayer => ({
  id: String(nextId++),
  icon: 'taza',
  size: 40,
  x: 50,
  y: 50,
  stroke: 1.5,
  inverted: false,
});

const newLine = (): LineLayer => ({
  id: String(nextId++),
  style: 'solid',
  length: 60,
  thickness: 8,
  size: 40,
  radius: 0,
  inverted: false,
  angle: 0,
  x: 50,
  y: 50,
});

const newPhotoSlot = (): PhotoLayer => ({
  image: null,
  scale: 80,
  x: 50,
  y: 50,
  radius: 0,
  circle: false,
  aspect: 1,
  zoom: 0,
  aboveLines: false,
  label: 'Imagen',
  required: true,
});

const newLogo = (): LogoLayer => ({
  font: 'Roca Two',
  size: 220,
  x: 50,
  y: 50,
  spacing: 4,
  detail: 'none',
  stroke: 3,
});

export function useGenerator() {
  const [format, setFormat] = useState<FormatKey>('story');
  const [theme, setTheme] = useState<ThemeKey>('default');
  const [photo, setPhoto] = useState<PhotoLayer | null>(null);
  const [texts, setTexts] = useState<TextLayer[]>(() => [newText()]);
  const [icons, setIcons] = useState<IconLayer[]>([]);
  const [logo, setLogo] = useState<LogoLayer | null>(null);
  const [lines, setLines] = useState<LineLayer[]>([]);

  const addPhoto = async (file: File) => {
    const url = URL.createObjectURL(file);
    const image = await loadImage(url);
    URL.revokeObjectURL(url);
    setPhoto({ image, scale: 80, x: 50, y: 50, radius: 0, circle: false, aspect: 0, zoom: 0, aboveLines: false });
  };

  const updatePhoto = (patch: Partial<Omit<PhotoLayer, 'image'>>) =>
    setPhoto((current) => (current ? { ...current, ...patch } : current));

  const removePhoto = () => setPhoto(null);

  const addPhotoSlot = () => setPhoto(newPhotoSlot());

  const setPhotoImage = async (file: File) => {
    const url = URL.createObjectURL(file);
    const image = await loadImage(url);
    URL.revokeObjectURL(url);
    setPhoto((current) => (current ? { ...current, image } : current));
  };

  const clearPhotoImage = () =>
    setPhoto((current) => (current ? { ...current, image: null } : current));

  const addText = () => setTexts((current) => [...current, newText()]);

  const updateText = (id: string, patch: Partial<TextLayer>) =>
    setTexts((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer))
    );

  const removeText = (id: string) =>
    setTexts((current) => current.filter((layer) => layer.id !== id));

  const addIcon = () => setIcons((current) => [...current, newIcon()]);

  const updateIcon = (id: string, patch: Partial<IconLayer>) =>
    setIcons((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer))
    );

  const removeIcon = (id: string) =>
    setIcons((current) => current.filter((layer) => layer.id !== id));

  const addLine = () => setLines((current) => [...current, newLine()]);

  const updateLine = (id: string, patch: Partial<LineLayer>) =>
    setLines((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer))
    );

  const removeLine = (id: string) =>
    setLines((current) => current.filter((layer) => layer.id !== id));

  const addLogo = () => setLogo(newLogo());

  const updateLogo = (patch: Partial<LogoLayer>) =>
    setLogo((current) => (current ? { ...current, ...patch } : current));

  const removeLogo = () => setLogo(null);

  const loadTemplate = (template: Template) => {
    setFormat(template.format);
    setPhoto(template.photo ? { ...template.photo, image: null } : null);
    setTexts(template.texts.map((layer) => ({ ...layer, id: String(nextId++) })));
    setIcons(template.icons.map((layer) => ({ ...layer, id: String(nextId++) })));
    setLines(template.lines.map((layer) => ({ ...layer, id: String(nextId++) })));
    setLogo(template.logo);
  };

  return {
    format,
    setFormat,
    theme,
    setTheme,
    photo,
    addPhoto,
    updatePhoto,
    removePhoto,
    addPhotoSlot,
    setPhotoImage,
    clearPhotoImage,
    texts,
    addText,
    updateText,
    removeText,
    icons,
    addIcon,
    updateIcon,
    removeIcon,
    lines,
    addLine,
    updateLine,
    removeLine,
    logo,
    addLogo,
    updateLogo,
    removeLogo,
    loadTemplate,
  };
}