import { GuidesPage } from '@/pages/guides/guides';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Guias para Adoção de Pets' },
    {
      name: 'description',
      content:
        'Confira nossos guias completos sobre adoção de pets e tire suas dúvidas para encontrar o companheiro ideal.',
    },
  ];
}


export default function AdoptionPage() {
  return <GuidesPage />;
}
