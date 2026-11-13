import { useMemo, useState } from 'react';
import { loadImage } from './renderImage';
import { fieldsOf, missingFields, resolveTemplate } from './templateModel';
import type { Template } from './types';

export function useTemplateSession(templates: Template[]) {
  const [selectedId, setSelectedId] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const template = templates.find((item) => item.id === selectedId) ?? null;
  const fields = useMemo(() => (template ? fieldsOf(template) : []), [template]);
  const view = useMemo(
    () => (template ? resolveTemplate(template, values, image) : null),
    [template, values, image]
  );
  const missing = useMemo(() => {
    if (!template) return [];
    const labels = missingFields(template, values).map((field) => field.label);
    if (template.photo?.required && !image) labels.push(template.photo.label);
    return labels;
  }, [template, values, image]);

  const select = (id: string) => {
    setSelectedId(id);
    setValues({});
    setImage(null);
  };

  const setValue = (fieldId: string, value: string) =>
    setValues((current) => ({ ...current, [fieldId]: value }));

  const setPhotoFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    const loaded = await loadImage(url);
    URL.revokeObjectURL(url);
    setImage(loaded);
  };

  const clearPhoto = () => setImage(null);

  return {
    selectedId,
    select,
    template,
    fields,
    values,
    setValue,
    hasImage: image !== null,
    setPhotoFile,
    clearPhoto,
    view,
    missing,
  };
}