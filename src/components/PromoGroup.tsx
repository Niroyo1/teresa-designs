import type { OfferGroup } from '../types';
import PromoOffer from './PromoOffer';

type Props = { group: OfferGroup; spaceBefore: number };

export default function PromoGroup({ group, spaceBefore }: Props) {
  return (
    <section style={{ marginTop: `${spaceBefore}mm` }}>
      <header className="w-[64%] border-b-[1mm] border-ink pb-[1mm] pl-[6mm]">
        <h3 className="font-display text-[20mm] font-normal uppercase leading-[0.95]">
          {group.title}
        </h3>
      </header>
      <div className="pl-[6mm] pt-[6mm]">
        {group.offers.map((offer) => (
          <PromoOffer key={offer.price} offer={offer}  />
        ))}
      </div>
    </section>
  );
}