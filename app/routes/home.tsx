import type { Route } from './+types/home';
import { Welcome } from '../pages/welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Adote Pets' },
    {
      name: 'description',
      content:
        'Descubra animais para adoção perto de você. Encontre cães e gatos esperando por um lar amoroso na Adote Pets.',
    },
  ];
}

export default function HomePage() {
  return <Welcome />;
}
