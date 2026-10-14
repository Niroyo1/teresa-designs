import type { Offer } from '../types';
import { formatPrice } from '../utils/formatPrice';

export default function PromoOffer({ offer }: { offer: Offer }) {
  const list = (
    <ul className="list-disc pl-[5mm] text-[11pt] italic leading-[1.35]">
      {offer.lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );

  if (!offer.title) {
    return (
      <div className="mb-[5mm] flex justify-between gap-[4mm]">
        {list}
        <span className="text-[12pt] font-bold leading-[1.3]">{formatPrice(offer.price)}</span>
      </div>
    );
  }

  return (
    <div className="mb-[5mm]">
      <div className="flex justify-between gap-[4mm] text-[12pt] font-bold uppercase leading-[1.3]">
        <span>{offer.title}</span>
        <span>{formatPrice(offer.price)}</span>
      </div>
      <div className="mt-[1mm]">{list}</div>
    </div>
  );
}