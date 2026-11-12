import { ICONS } from '../icons';
import type { IconKey } from '../types';

type Props = { icon: IconKey; className?: string };

export default function IconGlyph({ icon, className = 'size-6' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[icon].map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}