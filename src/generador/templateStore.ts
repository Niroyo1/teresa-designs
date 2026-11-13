import { normalizeTemplate } from './templateModel';
import type { Template } from './types';

const STORAGE_KEY = 'teresa-templates';

const isTemplate = (value: Template | null): value is Template => value !== null;

const fileTemplates: Template[] = Object.values(
  import.meta.glob('./templates/*.json', { eager: true, import: 'default' })
)
  .map(normalizeTemplate)
  .filter(isTemplate);

export function loadLocalTemplates(): Template[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const list: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(list) ? list.map(normalizeTemplate).filter(isTemplate) : [];
  } catch {
    return [];
  }
}

function writeLocalTemplates(templates: Template[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch {
    return;
  }
}

export function saveLocalTemplate(template: Template) {
  const others = loadLocalTemplates().filter((item) => item.id !== template.id);
  writeLocalTemplates([...others, template]);
}

export function deleteLocalTemplate(id: string) {
  writeLocalTemplates(loadLocalTemplates().filter((item) => item.id !== id));
}

export function isLocalTemplate(id: string) {
  return loadLocalTemplates().some((item) => item.id === id);
}

export function allTemplates(): Template[] {
  const local = loadLocalTemplates();
  const localIds = new Set(local.map((item) => item.id));
  return [...fileTemplates.filter((item) => !localIds.has(item.id)), ...local].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}

export function exportTemplateFile(template: Template) {
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${template.id}.json`;
  link.click();
  URL.revokeObjectURL(url);
}