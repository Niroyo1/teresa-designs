import type { ReactNode } from 'react';
import type { Brand } from '../types';
import FooterBar from './FooterBar';

type Props = {
  brand: Brand;
  theme?: string;
  notice?: string;
  children: ReactNode;
  hideFooter?: boolean;
};

export default function Page({ brand, theme = 'default', notice, hideFooter, children }: Props) {
  return (
    <article
      data-theme={theme}
      className="mx-auto my-[10mm] flex h-[297mm] w-[210mm] break-after-page flex-col overflow-hidden bg-cream text-ink shadow-xl last:break-after-auto print:m-0 print:shadow-none"
    >
      <main className="flex-1 px-[6mm] pt-[18mm]">{children}</main>
      {notice && <p className="px-[7mm] text-[12pt] uppercase">{notice}</p>}
      {!hideFooter && <FooterBar brand={brand} />}
    </article>
  );
}
