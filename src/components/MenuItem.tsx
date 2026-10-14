import type { Item } from '../types';

const formatPrice = (price: number | string) =>
  typeof price === 'number' ? `$${price}` : price;

export default function MenuItem({ item }: { item: Item }) {
  return (
    <div className="mb-[3.6mm]">
      <div className="flex justify-between gap-[4mm] text-[12pt] font-bold uppercase leading-[1.3]">
        <span>
        {item.name}
        {item.suffix && (
          <span className="ml-[1.5mm] font-normal normal-case">{item.suffix}</span>
        )}
      </span>
        <span>{formatPrice(item.price)}</span>
      </div>
      {item.description && (
        <p className="max-w-[75%] text-[11pt] italic leading-[1.3]">{item.description}</p>
      )}
      {item.options && (
        <ul className="ml-[5mm] mt-[1mm] list-disc text-[11pt] italic leading-[1.35]">
          {item.options.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
