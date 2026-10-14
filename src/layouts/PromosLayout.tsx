import type { PromoPage } from '../types';
import PromoColumn from '../components/PromoColumn';

export default function PromosLayout({ page }: { page: PromoPage }) {
  return (
    <div className="flex flex-col pb-[8mm]">
      <h1 className="!-mt-[5mm] mb-[8mm] font-title !text-[26mm] font-bold uppercase leading-none">
        {page.title}
      </h1>
      <div className="grid flex-1 grid-cols-2 gap-[12mm]">
        {page.columns.map((groups, index) => (
          <PromoColumn key={index} groups={groups} />
        ))}
      </div>
    </div>
  );
}