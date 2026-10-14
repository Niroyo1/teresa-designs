import type { PromoPage } from '../types';

export const promos: PromoPage = {
  id: 'promos',
  label: 'Promos',
  layout: 'promos',
  title: 'Promos',
  columns: [
    [
      {
        title: 'Merienda p/1',
        offers: [
          {
            price: 320,
            lines: ['Capuchino', 'Medialuna de manteca', 'Cuadrado brownie c/nuez'],
          },
        ],
      },
      {
        title: 'Merienda p/2',
        spaceBefore: 14,
        offers: [
          {
            price: 950,
            lines: [
              '2 bebidas calientes',
              '2 jugos de naranja',
              '2 medialunas rellenas',
              '2 scons de queso',
              '1 sándwich tostado',
              '1 alfajor clásico',
              '1 porción de postre',
              '2 trufas',
            ],
          },
        ],
      },
    ],
    [
      {
        title: 'Tostados',
        offers: [
          { title: 'Combo 1', price: 250, lines: ['Sándwich tostado', 'Capuchino'] },
          { title: 'Combo 2', price: 285, lines: ['Sándwich tostado', 'Capuchino', 'Cookie'] },
          {
            title: 'Combo 3',
            price: 340,
            lines: ['Sándwich tostado', 'Capuchino', 'Porción de torta/budín'],
          },
        ],
      },
      {
        title: 'Empanadas',
        spaceBefore: 25,
        offers: [
          { title: 'Combo 1', price: 325, lines: ['3 empanadas', 'Refresco 600ml'] },
          { title: 'Combo 2', price: 475, lines: ['5 empanadas + 1 de regalo'] },
        ],
      },
    ],
  ],
};