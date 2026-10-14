import { NavLink } from 'react-router-dom';
import { menu } from '../data/menu';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-1 text-sm font-bold transition-colors ${
    isActive
      ? 'border-cream text-cream'
      : 'border-transparent text-cream/60 hover:text-cream'
  }`;

export default function AppHeader() {
  return (
    <header className="bg-ink text-cream shadow-lg print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <span className="font-display text-4xl uppercase leading-none">{menu.brand.name}</span>
        <nav className="flex gap-5">
          <NavLink to="/" end className={linkClass}>
            Menú
          </NavLink>
          <NavLink to="/generador" className={linkClass}>
            Generador
          </NavLink>
        </nav>
      </div>
    </header>
  );
}