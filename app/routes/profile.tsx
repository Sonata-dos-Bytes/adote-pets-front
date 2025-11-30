import ProfilePage from "@/pages/profile/profile";
import type { Route } from './+types/profile';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Meu Perfil - AdotePet' },
    {
      name: 'description',
      content:
        'Visualize e edite suas informações pessoais, gerencie suas preferências e acompanhe seu histórico de adoções.',
    },
  ];
}

export default function ProfileRoute() {
    return <ProfilePage />;
}