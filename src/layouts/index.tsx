import type { MenuPage } from '../types';
import ColumnsLayout from './ColumnsLayout';
import PromosLayout from './PromosLayout';
import InfoLayout from './InfoLayout';

export function renderLayout(page: MenuPage) {
  switch (page.layout) {
    case 'columns':
      return <ColumnsLayout page={page} />;
    case 'promos':
      return <PromosLayout page={page} />;
    case 'info':
      return <InfoLayout page={page} />;
  }
}