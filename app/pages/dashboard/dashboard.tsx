import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Meu Painel</h1>
        
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Bem-vindo, {user.name}!
          </h2>
          <p className='text-gray-600'>
            Este é o seu painel de controle onde você poderá gerenciar suas adoções,
            favoritos e outras informações.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Minhas Adoções
            </h3>
            <p className='text-gray-600 mb-4'>
              Acompanhe o status das suas solicitações de adoção.
            </p>
            <p className='text-2xl font-bold text-primary'>0</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Pets Favoritos
            </h3>
            <p className='text-gray-600 mb-4'>
              Veja os pets que você salvou como favoritos.
            </p>
            <p className='text-2xl font-bold text-primary'>0</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Mensagens
            </h3>
            <p className='text-gray-600 mb-4'>
              Confira suas mensagens e notificações.
            </p>
            <p className='text-2xl font-bold text-primary'>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
