import { AdoptionListPage } from '../pages/adoption-list/adoption-list';
import type { Route } from './+types/adoption';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Animais para Adoção - AdotePet' },
    {
      name: 'description',
      content:
        'Navegue por todos os animais disponíveis para adoção. Filtre por espécie, idade, tamanho e localização para encontrar seu novo companheiro.',
    },
  ];
}

export default function AdoptionRoute() {
  return <AdoptionListPage />;
}
