import type { ReactNode } from 'react';
import { SHOW_LOGO } from '../constants';
import type { useGenerator } from '../useGenerator';
import type { TextLayer } from '../types';
import IconControls from './IconControls';
import LineControls from './LineControls';
import LogoControls from './LogoControls';
import PhotoControls from './PhotoControls';
import Section from './Section';
import TextControls from './TextControls';

type Props = {
  generator: ReturnType<typeof useGenerator>;
  hidePhoto?: boolean;
  renderTextExtra?: (layer: TextLayer) => ReactNode;
};

export default function FreeControls({ generator, hidePhoto = false, renderTextExtra }: Props) {
  return (
    <>
      {!hidePhoto && (
        <Section title="Foto">
          <PhotoControls
            photo={generator.photo}
            onAdd={generator.addPhoto}
            onChange={generator.updatePhoto}
            onRemove={generator.removePhoto}
          />
        </Section>
      )}
      {SHOW_LOGO && (
        <Section title="Logo">
          <LogoControls
            logo={generator.logo}
            onAdd={generator.addLogo}
            onChange={generator.updateLogo}
            onRemove={generator.removeLogo}
          />
        </Section>
      )}
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
          renderExtra={renderTextExtra}
        />
      </Section>
    </>
  );
}