import { WelcomePage } from '../pages/welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bem-Vindo ao AdotePet' },
    {
      name: 'description',
      content:
        'Veja a lista de animais disponíveis para adoção e encontre um novo companheiro para sua família.',
    },
  ];
}

export default function HomeRoute() {
  return <WelcomePage />;
}
