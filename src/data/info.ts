import type { InfoPage } from '../types';

export const info: InfoPage = {
  id: 'info',
  label: 'Info',
  layout: 'info',
  theme: 'inverted',
  hideFooter: true,
  panelText: 'Teresa',
  groups: [
    {
      title: 'Medios de pago',
      bullets: ['Transferencia bancaria', 'Efectivo'],
    },
    {
      title: 'Horario',
      spaceBefore: 30,
      rows: [
        { label: 'Lunes', values: ['Cerrado'] },
        { label: 'Martes', values: ['8:00 - 20:30'] },
        { label: 'Miércoles', values: ['8:00 - 20:30'] },
        { label: 'Jueves', values: ['8:00 - 20:30'] },
        { label: 'Viernes', values: ['8:00 - 20:30'] },
        { label: 'Sábado', values: ['8:00 - 20:30'] },
        { label: 'Domingo', values: ['8:00 - 13:30', '15:30 - 20:30'] },
      ],
    },
  ],
};