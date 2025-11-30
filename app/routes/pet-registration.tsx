import PetRegistrationPage from '../pages/pet-registration/pet-registration';
import type { Route } from './+types/pet-registration';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Cadastrar Pet - AdotePet' },
    {
      name: 'description',
      content:
        'Cadastre um pet para adoção. Preencha as informações completas do animal para ajudá-lo a encontrar um lar amoroso.',
    },
  ];
}

export default function PetRegistrationRoute() {
    return <PetRegistrationPage />;
}
