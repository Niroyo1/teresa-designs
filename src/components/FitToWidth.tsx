import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const PAGE_WIDTH_PX = (210 * 96) / 25.4;
const SIDE_SPACE_PX = 16;

export default function FitToWidth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () =>
      setScale(Math.min(1, (element.clientWidth - SIDE_SPACE_PX) / PAGE_WIDTH_PX));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-x-hidden print:overflow-visible">
      <div
        className="[zoom:var(--fit)] print:[zoom:1]"
        style={{ '--fit': scale } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}