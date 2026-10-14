import type { OfferGroup } from '../types';
import PromoGroup from './PromoGroup';

export default function PromoColumn({ groups }: { groups: OfferGroup[] }) {
  return (
    <div className="relative">
      <span className="absolute bottom-0 left-0 top-[10mm] w-[1mm] bg-ink" />
      {groups.map((group, index) => (
        <PromoGroup
          key={group.title}
          group={group}
          spaceBefore={index === 0 ? 0 : (group.spaceBefore ?? 12)}
        />
      ))}
    </div>
  );
}