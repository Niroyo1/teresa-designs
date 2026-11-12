import { useRef } from 'react';
import AppHeader from '../components/AppHeader';
import DownloadButton from '../components/DownloadButton';
import { FORMATS } from './constants';
import { downloadCanvas } from './downloadCanvas';
import { useGenerator } from './useGenerator';
import FormatPicker from './components/FormatPicker';
import IconControls from './components/IconControls';
import LineControls from './components/LineControls';
import LogoControls from './components/LogoControls';
import PhotoControls from './components/PhotoControls';
import PreviewCanvas from './components/PreviewCanvas';
import Section from './components/Section';
import TextControls from './components/TextControls';
import ThemePicker from './components/ThemePicker';

export default function GeneradorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generator = useGenerator();

  const download = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current, `teresa-${FORMATS[generator.format].file}.png`);
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
          <Section title="Formato">
            <FormatPicker value={generator.format} onChange={generator.setFormat} />
          </Section>
          <Section title="Tema">
            <ThemePicker value={generator.theme} onChange={generator.setTheme} />
          </Section>
          <Section title="Foto">
            <PhotoControls
              photo={generator.photo}
              onAdd={generator.addPhoto}
              onChange={generator.updatePhoto}
              onRemove={generator.removePhoto}
            />
          </Section>
          <Section title="Logo">
            <LogoControls
              logo={generator.logo}
              onAdd={generator.addLogo}
              onChange={generator.updateLogo}
              onRemove={generator.removeLogo}
            />
          </Section>
          <Section title="Iconos">
            <IconControls
              icons={generator.icons}
              onAdd={generator.addIcon}
              onChange={generator.updateIcon}
              onRemove={generator.removeIcon}
            />
          </Section>
          <Section title="Líneas">
            <LineControls
              lines={generator.lines}
              onAdd={generator.addLine}
              onChange={generator.updateLine}
              onRemove={generator.removeLine}
            />
          </Section>
          <Section title="Textos">
            <TextControls
              texts={generator.texts}
              onAdd={generator.addText}
              onChange={generator.updateText}
              onRemove={generator.removeText}
            />
          </Section>
          <DownloadButton onClick={download} />
        </div>
      </div>
    </div>
  );
}