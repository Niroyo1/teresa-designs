import { useState } from 'react';
import { loadImage } from './renderImage';
import type { FormatKey, PhotoLayer, TextLayer } from './types';

let nextId = 1;

const newText = (): TextLayer => ({
  id: String(nextId++),
  text: 'Texto',
  font: 'Poppins',
  size: 80,
  x: 50,
  y: 50,
});

export function useGenerator() {
  const [format, setFormat] = useState<FormatKey>('story');
  const [photo, setPhoto] = useState<PhotoLayer | null>(null);
  const [texts, setTexts] = useState<TextLayer[]>(() => [newText()]);

  const addPhoto = async (file: File) => {
    const url = URL.createObjectURL(file);
    const image = await loadImage(url);
    URL.revokeObjectURL(url);
    setPhoto({ image, scale: 80, x: 50, y: 50, radius: 0, circle: false });
  };

  const updatePhoto = (patch: Partial<Omit<PhotoLayer, 'image'>>) =>
    setPhoto((current) => (current ? { ...current, ...patch } : current));

  const removePhoto = () => setPhoto(null);

  const addText = () => setTexts((current) => [...current, newText()]);

  const updateText = (id: string, patch: Partial<TextLayer>) =>
    setTexts((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer))
    );

  const removeText = (id: string) =>
    setTexts((current) => current.filter((layer) => layer.id !== id));

  return {
    format,
    setFormat,
    photo,
    addPhoto,
    updatePhoto,
    removePhoto,
    texts,
    addText,
    updateText,
    removeText,
  };
}