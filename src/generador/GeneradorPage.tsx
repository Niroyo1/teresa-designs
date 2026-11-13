import { useMemo, useRef } from 'react';
import AppHeader from '../components/AppHeader';
import DownloadButton from '../components/DownloadButton';
import { FORMATS, NO_TEMPLATE } from './constants';
import { downloadCanvas } from './downloadCanvas';
import { useGenerator } from './useGenerator';
import { useTemplates } from './useTemplates';
import { useTemplateSession } from './useTemplateSession';
import FormatPicker from './components/FormatPicker';
import FreeControls from './components/FreeControls';
import PreviewCanvas from './components/PreviewCanvas';
import Section from './components/Section';
import TemplateFields from './components/TemplateFields';
import TemplatePhotoField from './components/TemplatePhotoField';
import TemplatePicker from './components/TemplatePicker';
import ThemePicker from './components/ThemePicker';
import type { StoryView } from './templateModel';
import type { FormatKey } from './types';

const EMPTY_VIEW: StoryView = {
  format: 'story',
  photo: null,
  texts: [],
  icons: [],
  lines: [],
  logo: null,
};

export default function GeneradorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generator = useGenerator();
  const { templates } = useTemplates();
  const formatTemplates = useMemo(
    () => templates.filter((template) => template.format === generator.format),
    [templates, generator.format]
  );
  const session = useTemplateSession(formatTemplates);

  const hasTemplates = formatTemplates.length > 0;
  const mode =
    !hasTemplates || session.selectedId === NO_TEMPLATE
      ? 'free'
      : session.template
        ? 'template'
        : 'empty';
  const view: StoryView =
    mode === 'template' && session.view
      ? session.view
      : mode === 'free'
        ? generator
        : { ...EMPTY_VIEW, format: generator.format };

  const changeFormat = (format: FormatKey) => {
    generator.setFormat(format);
    session.select('');
  };

  const download = () => {
    if (!canvasRef.current || session.missing.length > 0) return;
    const name =
      mode === 'template' && session.template ? session.template.id : FORMATS[view.format].file;
    downloadCanvas(canvasRef.current, `teresa-${name}.png`);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-ink">
      <AppHeader />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="sticky top-0 z-10 bg-neutral-100 py-2 lg:top-4 lg:self-start">
          <PreviewCanvas
            canvasRef={canvasRef}
            format={view.format}
            photo={view.photo}
            texts={view.texts}
            icons={view.icons}
            logo={view.logo}
            theme={generator.theme}
            lines={view.lines}
          />
        </div>
        <div className="flex flex-col gap-8 pb-8">
          <Section title="Modo">
            <FormatPicker value={generator.format} onChange={changeFormat} />
          </Section>
          {hasTemplates && (
            <Section title="Template">
              <TemplatePicker
                templates={formatTemplates}
                value={session.selectedId}
                onChange={session.select}
              />
            </Section>
          )}
          <Section title="Tema">
            <ThemePicker value={generator.theme} onChange={generator.setTheme} />
          </Section>
          {mode === 'empty' && (
            <p className="text-sm">Elegí un template, o "Sin template" para armar desde cero.</p>
          )}
          {mode === 'template' && (
            <Section title="Datos">
              <div className="flex flex-col gap-4">
                {session.template?.photo && (
                  <TemplatePhotoField
                    label={session.template.photo.label}
                    required={session.template.photo.required}
                    hasImage={session.hasImage}
                    onFile={session.setPhotoFile}
                    onClear={session.clearPhoto}
                  />
                )}
                <TemplateFields
                  fields={session.fields}
                  values={session.values}
                  onChange={session.setValue}
                />
              </div>
            </Section>
          )}
          {mode === 'free' && <FreeControls generator={generator} />}
          {mode === 'template' && session.missing.length > 0 && (
            <p className="text-sm font-bold">
              Falta completar: {session.missing.join(', ')}
            </p>
          )}
          {mode !== 'empty' && <DownloadButton onClick={download} />}
        </div>
      </div>
    </div>
  );
}