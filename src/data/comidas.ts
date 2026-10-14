import type { MenuPage } from '../types';

export const comidas: MenuPage = {
  id: 'comidas',
  label: 'Comidas',
  layout: 'columns',
  notice: 'Consultar stock y disponibilidad de postres enteros en mostrador',
  sections: [
    {
      title: 'Salados',
      items: [
        { name: 'Scon de queso', price: 40 },
        {
          name: 'Scon ciboulette relleno',
          price: 125,
          description: 'Queso de untar, queso de sándwich, bondiola o lomito y rúcula.',
        },
        { name: 'Medialuna de manteca', price: 100 },
        {
          name: 'Medialuna rellena',
          price: 150,
          description: 'Queso crema, jamón y queso de sándwich.',
        },
        {
          name: 'Focaccia rellena',
          price: 125,
          description:
            'Pan focaccia, queso crema, queso de sándwich, bondiola o lomito y rúcula.',
        },
        {
          name: 'Chipá prensado',
          price: 130,
          options: [
            'Pan de queso, queso de untar, jamón y queso de sándwich. A la plancha.',
            'Pan de queso, queso de untar, queso sándwich y cherrys. A la plancha.',
          ],
        },
        {
          name: 'Sándwich tostado',
          price: 100,
          description: 'Pan blanco, queso crema, jamón y queso de sándwich.',
        },
        {
          name: 'Sándwich tostado especial',
          price: 130,
          description: 'Pan blanco, queso crema, lomito y cheddar.',
        },
        { name: 'Pan de nuez', suffix: 'ENTERO/MEDIO', price: '$400/$210' },
        {
          name: 'Fainá relleno',
          price: 85,
          description: 'Fainá de queso, relleno de jamón y queso sándwich.',
        },
        {
          name: 'Sándwich pan de nuez',
          price: 85,
          description: 'Queso de untar, lomito y cheddar.',
        },
        { name: 'Empanadas', price: 95, description: 'Consultar variedades' },
      ],
    },
    {
      title: 'Pastelería',
      items: [
        {
          name: 'Cookie',
          suffix: 'x1/x2',
          price: '$45/$80',
          options: [
            'Vainilla c/chips de chocolate',
            'Chocolate c/chips blancas',
            'Red Velvet',
            'Limón y chocolate blanco',
          ],
        },
        {
          name: 'Alfajor clásico',
          price: 85,
          options: [
            'Chocolate blanco o semiamargo',
            'Masa de nuez y DDL',
            'Fécula (maicena)',
          ],
        },
        {
          name: 'Alfajor especial',
          price: 95,
          options: [
            'Limón y frutos rojos',
            'Alfacookie vainilla y DDL',
            'Alfacookie crema de maní',
            'Chocotorta',
            'Consultar opciones de la semana',
          ],
        },
        { name: 'Cuadrado brownie c/nuez', price: 75 },
        {
          name: 'Porción torta/budín',
          price: 110,
          options: [
            'Naranja c/glaseado limón',
            'Limón y frutos rojos',
            'Chocolate c/ganache',
            'Manzana y caramelo',
            'Vasca',
          ],
        },
        { name: 'Roll de canela', price: 125 },
        {
          name: 'Porción de postre',
          price: 200,
          options: [
            'Cheesecake de frutos rojos',
            'Mousse de chocolate',
            'Oreo',
            'Carrot cake',
            'Red Velvet',
            'Choco bruce',
          ],
        },
        { name: 'Trufa/Ojito', price: 30 },
        { name: 'Mini postre', price: 500 },
        { name: 'Postre 20cm', price: 1100 },
      ],
    },
  ],
};