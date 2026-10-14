import type { InfoGroup as Group } from '../types';

type Props = { group: Group; spaceBefore: number };

export default function InfoGroup({ group, spaceBefore }: Props) {
  return (
    <section style={{ marginTop: `${spaceBefore}mm` }}>
      <header className="w-[90%] border-b-[1mm] border-ink pb-[1.5mm] pl-[8mm]">
        <h3 className="whitespace-nowrap font-display text-[32mm] font-normal uppercase leading-[0.95]">
          {group.title}
        </h3>
      </header>
      <div className="pl-[8mm] pt-[8mm]">
        {group.bullets && (
          <ul className="list-disc pl-[6mm] text-[18pt] italic leading-[1.5]">
            {group.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
        {group.rows && (
          <div className="w-[80%]">
            {group.rows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-[4mm] border-b border-ink/20 py-[4mm] text-[18pt] leading-[1.3] last:border-b-0"
              >
                <span className="font-bold uppercase">{row.label}</span>
                <span className="text-right">
                  {row.values.map((value) => (
                    <span key={value} className="block">
                      {value}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}