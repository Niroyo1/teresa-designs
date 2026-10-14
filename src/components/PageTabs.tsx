type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  selected: string;
  onSelect: (id: string) => void;
};

export default function PageTabs({ tabs, selected, onSelect }: Props) {
  return (
    <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 px-4 py-3 print:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`cursor-pointer border-b-2 pb-0.5 text-xs font-bold uppercase tracking-wide ${
            selected === tab.id ? 'border-ink text-ink' : 'border-transparent text-ink/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}