import AdoptionSpecific from '@/pages/adoption-listing/[uuid]/page';
import type { Route } from '../+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Detalhes da Adoção' },
    {
      name: 'description',
      content:
        'Veja informações detalhadas sobre o animal disponível para adoção.',
    },
  ];
}

export default function AdoptionSpecificPage() {
  return <AdoptionSpecific />;
}
