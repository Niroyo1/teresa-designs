import type { InfoPage } from '../types';
import InfoGroup from '../components/InfoGroup';

export default function InfoLayout({ page }: { page: InfoPage }) {
  return (
    <div className="relative h-full pb-[12mm] pt-[14mm]">
      <span className="absolute bottom-[12mm] left-0 top-[30mm] w-[1mm] bg-ink" />
      {page.groups.map((group, index) => (
        <InfoGroup
          key={group.title}
          group={group}
          spaceBefore={index === 0 ? 0 : (group.spaceBefore ?? 12)}
        />
      ))}
    </div>
  );
}