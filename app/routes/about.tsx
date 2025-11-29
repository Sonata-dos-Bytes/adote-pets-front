import { AboutPage } from '@/pages/about/about';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Sobre Nós' },
    {
      name: 'description',
      content:
        'Saiba mais sobre nosso compromisso com a adoção responsável de pets. Descubra como ajudamos você a encontrar um novo amigo e como tornar esse processo seguro, transparente e acolhedor.',
    },
  ];
}

export default function AdoptionPage() {
  return <AboutPage />;
}
