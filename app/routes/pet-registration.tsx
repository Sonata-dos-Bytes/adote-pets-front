import PetRegistration from '../pages/pet-registration/pet-registration';

export function meta() {
    return [{ title: 'Cadastro de Pet' }];
}

export default function PetRegistrationRoute() {
    return <PetRegistration />;
}
