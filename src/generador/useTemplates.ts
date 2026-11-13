import { useState } from 'react';
import { allTemplates, deleteLocalTemplate, saveLocalTemplate } from './templateStore';
import type { Template } from './types';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>(() => allTemplates());

  const save = (template: Template) => {
    saveLocalTemplate(template);
    setTemplates(allTemplates());
  };

  const remove = (id: string) => {
    deleteLocalTemplate(id);
    setTemplates(allTemplates());
  };

  return { templates, save, remove };
}