import type { Offer } from '../types';
import { formatPrice } from '../utils/formatPrice';

export default function PromoOffer({ offer }: { offer: Offer }) {
  return (
    <div className="mb-[5mm] flex justify-between gap-[4mm]">
      <ul className="list-disc pl-[5mm] text-[12pt] uppercase leading-[1.5]">
        {offer.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <span className="text-[12pt] font-bold leading-[1.5]">{formatPrice(offer.price)}</span>
    </div>
  );
}