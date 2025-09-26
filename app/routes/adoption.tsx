import { AdoptionList } from '../pages/adoption-listing/adoption-list';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Animais para Adoção' },
    {
      name: 'description',
      content:
        'Veja a lista de animais disponíveis para adoção e encontre um novo companheiro para sua família.',
    },
  ];
}

export default function AdoptionPage() {
  return <AdoptionList />;
}
