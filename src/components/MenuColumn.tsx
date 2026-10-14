import type { Section } from '../types';
import MenuItem from './MenuItem';

export default function MenuColumn({ section }: { section: Section }) {
  return (
    <section className="relative">
      <span className="absolute bottom-0 left-0 top-[8mm] w-[1mm] bg-ink" />
      <header className="w-[64%] border-b-[1mm] border-ink pb-[1mm] pl-[6mm]">
        <h2 className="font-display text-[20mm] font-normal uppercase leading-[0.95]">
          {section.title}
        </h2>
      </header>
      <div className="pl-[6mm] pt-[6mm]">
        {section.items.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
