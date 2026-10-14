import { useState } from 'react';
import { menu } from './data/menu';
import { renderLayout } from './layouts';
import AppHeader from './components/AppHeader';
import DownloadButton from './components/DownloadButton';
import FitToWidth from './components/FitToWidth';
import Page from './components/Page';
import PageTabs from './components/PageTabs';

const ALL = 'all';

const tabs = [
  ...menu.pages.map(({ id, label }) => ({ id, label })),
  { id: ALL, label: 'Todas' },
];

export default function App() {
  const [selected, setSelected] = useState<string>(menu.pages[0].id);
  const visiblePages =
    selected === ALL ? menu.pages : menu.pages.filter((page) => page.id === selected);

  return (
    <div className="min-h-screen bg-neutral-300 print:bg-transparent">
      <AppHeader />
      <PageTabs tabs={tabs} selected={selected} onSelect={setSelected} />
      <FitToWidth>
        {visiblePages.map((page) => (
          <Page
            key={page.id}
            brand={menu.brand}
            theme={page.theme}
            notice={page.notice}
            hideFooter={page.hideFooter}
          >
            {renderLayout(page)}
          </Page>
        ))}
      </FitToWidth>
      <div className="mx-auto max-w-sm px-4 pb-8 pt-2 print:hidden">
        <DownloadButton onClick={() => window.print()} />
      </div>
    </div>
  );
}