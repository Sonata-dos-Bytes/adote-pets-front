import AdoptionSpecificPage from '@/pages/adoption-list/[uuid]/page';
import type { Route } from './+types/[uuid]';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Detalhes da Adoção - AdotePet' },
    {
      name: 'description',
      content:
        'Veja os detalhes completos do pet disponível para adoção, incluindo informações sobre temperamento, saúde e requisitos.',
    },
  ];
}

export default function AdoptionSpecificRoute() {
  return <AdoptionSpecificPage />;
}
