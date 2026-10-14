export type Item = {
  name: string;
  suffix?: string;
  price: number | string;
  description?: string;
  options?: string[];
};

export type Section = { title: string; items: Item[] };

export type Offer = { title?: string; price: number | string; lines: string[] };

export type OfferGroup = { title: string; spaceBefore?: number; offers: Offer[] };

export type Brand = { name: string; address: string[] };

type PageBase = {
  id: string;
  label: string;
  theme?: string;
  notice?: string;
  hideFooter?: boolean;
};

export type ColumnsPage = PageBase & { layout: 'columns'; sections: Section[] };

export type PromoPage = PageBase & {
  layout: 'promos';
  title: string;
  columns: OfferGroup[][];
};

export type InfoRow = { label: string; values: string[] };

export type InfoGroup = {
  title: string;
  spaceBefore?: number;
  bullets?: string[];
  rows?: InfoRow[];
};

export type InfoPage = PageBase & {
  layout: 'info';
  panelText?: string;
  groups: InfoGroup[];
};

export type MenuPage = ColumnsPage | PromoPage | InfoPage;

export type Menu = { brand: Brand; pages: MenuPage[] };