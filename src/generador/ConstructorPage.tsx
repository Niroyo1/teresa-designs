import { useRef, useState } from 'react';
import AppHeader from '../components/AppHeader';
import { useGenerator } from './useGenerator';
import { useTemplates } from './useTemplates';
import { exportTemplateFile, isLocalTemplate } from './templateStore';
import { fieldsOf, normalizeTemplate, slugify, toSlot } from './templateModel';
import FieldControls from './components/FieldControls';
import FormatPicker from './components/FormatPicker';
import FreeControls from './components/FreeControls';
import PhotoSlotControls from './components/PhotoSlotControls';
import PreviewCanvas from './components/PreviewCanvas';
import Section from './components/Section';
import TemplateBuilderPanel from './components/TemplateBuilderPanel';
import ThemePicker from './components/ThemePicker';
import type { Template } from './types';

export default function ConstructorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generator = useGenerator();
  const store = useTemplates();
  const [label, setLabel] = useState('Nuevo template');
  const [status, setStatus] = useState('');

  const id = slugify(label) || 'template';

  const snapshot = (): Template => ({
    id,
    label: label.trim() || id,
    format: generator.format,
    texts: generator.texts,
    icons: generator.icons,
    lines: generator.lines,
    logo: generator.logo,
    photo: generator.photo ? toSlot(generator.photo) : null,
  });

  const load = (template: Template) => {
    generator.loadTemplate(template);
    setLabel(template.label);
    setStatus('');
  };

  const importFile = async (file: File) => {
    try {
      const template = normalizeTemplate(JSON.parse(await file.text()));
      if (template) load(template);
      else setStatus('El archivo no es un template válido');
    } catch {
      setStatus('No se pudo leer el archivo');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-ink">
      <AppHeader />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="sticky top-0 z-10 bg-neutral-100 py-2 lg:top-4 lg:self-start">
          <PreviewCanvas
            canvasRef={canvasRef}
            format={generator.format}
            photo={generator.photo}
            texts={generator.texts}
            icons={generator.icons}
            logo={generator.logo}
            theme={generator.theme}
            lines={generator.lines}
          />
        </div>
        <div className="flex flex-col gap-8 pb-8">
          <Section title="Modo">
            <FormatPicker value={generator.format} onChange={generator.setFormat} />
          </Section>
          <Section title="Template">
            <TemplateBuilderPanel
              label={label}
              id={id}
              labels={[
                ...(generator.photo ? [generator.photo.label ?? 'Imagen'] : []),
                ...fieldsOf({ texts: generator.texts }).map((field) => field.label),
              ]}
              templates={store.templates}
              isLocal={isLocalTemplate(id)}
              status={status}
              onLabelChange={setLabel}
              onLoad={(templateId) => {
                const template = store.templates.find((item) => item.id === templateId);
                if (template) load(template);
              }}
              onSave={() => {
                store.save(snapshot());
                setStatus('Guardado en este navegador');
              }}
              onExport={() => exportTemplateFile(snapshot())}
              onImport={importFile}
              onDelete={() => {
                store.remove(id);
                setStatus('Eliminado de este navegador');
              }}
            />
          </Section>
          <Section title="Tema">
            <ThemePicker value={generator.theme} onChange={generator.setTheme} />
          </Section>
          <Section title="Imagen">
            <PhotoSlotControls
              photo={generator.photo}
              onAdd={generator.addPhotoSlot}
              onChange={generator.updatePhoto}
              onRemove={generator.removePhoto}
              onTestImage={generator.setPhotoImage}
              onClearTestImage={generator.clearPhotoImage}
            />
          </Section>
          <FreeControls
            generator={generator}
            hidePhoto
            renderTextExtra={(layer) => (
              <FieldControls
                layer={layer}
                onChange={(patch) => generator.updateText(layer.id, patch)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}