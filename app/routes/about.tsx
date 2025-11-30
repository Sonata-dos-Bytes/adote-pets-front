import { AboutPage } from '@/pages/about/about';
import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Sobre Nós - AdotePet' },
    {
      name: 'description',
      content:
        'Conheça a missão do AdotePet e saiba como trabalhamos para conectar animais resgatados com famílias amorosas.',
    },
  ];
}

export default function AdoptionRoute() {
  return <AboutPage />;
}
