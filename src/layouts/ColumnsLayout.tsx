import type { ColumnsPage } from '../types';
import MenuColumn from '../components/MenuColumn';

export default function ColumnsLayout({ page }: { page: ColumnsPage }) {
  return (
    <div
      className="grid gap-[12mm]"
      style={{ gridTemplateColumns: `repeat(${page.sections.length}, 1fr)` }}
    >
      {page.sections.map((section) => (
        <MenuColumn key={section.title} section={section} />
      ))}
    </div>
  );
}
