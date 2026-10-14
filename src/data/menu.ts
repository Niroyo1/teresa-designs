import type { Menu } from '../types';
import { bebidas } from './bebidas';
import { comidas } from './comidas';
import { promos } from './promos';
import { info } from './info';

export const menu: Menu = {
  brand: {
    name: 'Teresa',
    address: [
      'María Vera S/N, Ent. Cayetano Gonzalez y Av. Artigas.',
      'San Jacinto, Canelones',
    ],
  },
  pages: [bebidas, comidas, promos, info],
};