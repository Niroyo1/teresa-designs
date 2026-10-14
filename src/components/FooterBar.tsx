import type { Brand } from '../types';

export default function FooterBar({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-[20mm] items-center justify-between bg-ink px-[7mm] font-display text-cream">
      <span className="text-[16mm] uppercase leading-none">{brand.name}</span>
      <address className="flex flex-col text-right text-[6mm] uppercase not-italic">
        {brand.address.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </address>
    </div>
  );
}
