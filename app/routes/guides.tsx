import { GuidesPage } from '@/pages/guides/guides';
import type { Route } from './+types/guides';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Guias de Adoção - AdotePet' },
    {
      name: 'description',
      content:
        'Aprenda tudo sobre adoção responsável de pets. Encontre dicas, informações e orientações para cuidar do seu novo animal de estimação.',
    },
  ];
}

export default function GuidesRoute() {
  return <GuidesPage />;
}
