import type { MenuPage } from '../types';

export const bebidas: MenuPage = {
  id: 'bebidas',
  label: 'Bebidas',
  layout: 'columns',
  notice: 'Consultar stock en mostrador',
  sections: [
    {
      title: 'Café',
      items: [
        { name: 'Espresso', price: 85, description: '1 medida café' },
        { name: 'Doble Espresso', price: 125, description: '2 medidas café' },
        { name: 'Americano', price: 130, description: '2 medidas café y agua' },
        { name: 'Cortado', price: 140, description: '2 medidas café y 1 medida leche' },
        { name: 'Lágrima', price: 130, description: 'Leche y un toque de café' },
        { name: 'Latte', price: 150, description: '2 medidas café y 2 medidas leche' },
        { name: 'Capuchino', price: 165, description: '1 medida café, leche y espuma' },
        { name: 'Moka', price: 190, description: '2 medidas café, 2 medidas leche y chocolate' },
        { name: 'Americano Frío', price: 150, description: '2 medidas café, agua y hielo' },
        { name: 'Latte Frío', price: 170, description: '2 medidas café, 2 medidas leche y hielo' },
      ],
    },
    {
      title: 'Otros',
      items: [
        { name: 'Orange espresso', price: 180 },
        { name: 'Caramel macchiato', price: 185 },
        { name: 'Moka iced', price: 185 },
        { name: 'Té Twinings', price: 110 },
        { name: 'Té con leche', price: 150 },
        { name: 'Submarino', price: 185, description: 'Chocolate con leche' },
        { name: 'Jugo de naranja', price: 110 },
        {
          name: 'Frappé/Licuado',
          price: 170,
          description: 'De naranja, agua o leche',
          options: [
            'Frutilla',
            'Frutos rojos',
            'Detox (verdes)',
            'Durazno',
            'Banana y arándanos',
          ],
        },
        { name: 'Agua Vitale 600ml', price: 60 },
        { name: 'Cepita/Powerade', price: 60 },
        { name: 'Colet 250ml', price: 48 },
        { name: 'Colet 1L', price: 117 },
        { name: 'Jugos 200ml', price: 40 },
        { name: 'Jugos Conaprole 1L', price: 110 },
        { name: 'Línea Coca-Cola 250ml', price: 36 },
        { name: 'Línea Coca-Cola 600ml', price: 70 },
        { name: 'Monster', price: 115 },
      ],
    },
  ],
};