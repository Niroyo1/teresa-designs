import type { ReactNode } from 'react';

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  );
}