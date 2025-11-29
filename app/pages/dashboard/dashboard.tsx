import { MyRequestCard } from '@/components/my-request-card/my-request-card';
import { PetRequestCard } from '@/components/pet-request-card/pet-request-card';
import Button from '@/components/ui/button/button';
import { useAuth } from '@/contexts/auth-context';
import {
  getMyRequests,
  getPetRequests,
} from '@/services/adoption-request-services';
import { getMyPets, updatePet } from '@/services/pet-services';
import type { IAdoptionRequest } from '@/types/IAdoption';
import type { IPet, IPetWithRequests } from '@/types/IPet';
import { calculateAge, getPetImage } from '@/utils';
import React from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user } = useAuth();
  const [myRequests, setMyRequests] = React.useState<IAdoptionRequest[]>([]);
  const [petsWithRequests, setPetsWithRequests] = React.useState<
    IPetWithRequests[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPetsAndRequests = async () => {
      try {
        setIsLoading(true);
        const { pets } = await getMyPets();
        const { adoptions } = await getMyRequests();

        const petsWithRequestsData = await Promise.all(
          pets.map(async (pet: IPet) => {
            try {
              const { requests } = await getPetRequests(pet.externalId);
              return { pet, requests: requests || [] };
            } catch (error) {
              console.error(
                `Erro ao buscar requisições do pet ${pet.externalId}:`,
                error,
              );
              return { pet, requests: [] };
            }
          }),
        );

        setPetsWithRequests(petsWithRequestsData);
        setMyRequests(adoptions);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetsAndRequests();
  }, []);

  if (!user) {
    return null;
  }

  const totalRequests = petsWithRequests.reduce(
    (sum, item) => sum + item.requests.length,
    0,
  );

  const handleHasAdopted = async (pet: IPet) => {
    try {
      const response = await updatePet(pet.externalId, {
        ...pet,
        isAdote: true,
      });

      if (response.data) {
        toast.error('Erro ao atualizar o status do pet.');
        return;
      }

      toast.success('Status do pet atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-secondary mb-6'>Meu Painel</h1>

        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <h2 className='text-xl font-semibold text-secondary mb-2'>
            Bem-vindo, {user.name}!
          </h2>
          <p className='text-gray-600'>
            Gerencie seus pets e acompanhe as solicitações de adoção recebidas.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-secondary mb-2'>
              Meus Pets
            </h3>
            <p className='text-gray-600 mb-4'>
              Total de pets cadastrados para adoção.
            </p>
            <p className='text-4xl font-bold text-primary'>
              {petsWithRequests.length}
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-secondary mb-2'>
              Solicitações Recebidas
            </h3>
            <p className='text-gray-600 mb-4'>
              Total de solicitações de adoção.
            </p>
            <p className='text-4xl font-bold text-primary'>{totalRequests}</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-secondary mb-2'>
              Minhas Solicitações
            </h3>
            <p className='text-gray-600 mb-4'>
              Pedidos de adoção que você fez.
            </p>
            <p className='text-4xl font-bold text-primary'>
              {myRequests.length}
            </p>
          </div>
        </div>

        <div className='space-y-8'>
          <div>
            <h2 className='text-2xl font-semibold text-secondary mb-4'>
              Minhas Solicitações de Adoção
            </h2>

            {isLoading ? (
              <div className='bg-white rounded-lg shadow-md p-12'>
                <div className='text-center'>
                  <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
                  <p className='mt-4 text-gray-600'>Carregando...</p>
                </div>
              </div>
            ) : myRequests.length > 0 ? (
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='space-y-3'>
                  {myRequests.map((request) => (
                    <MyRequestCard key={request.externalId} request={request} />
                  ))}
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-lg shadow-md p-12'>
                <div className='text-center'>
                  <div className='text-gray-400 text-5xl mb-4'>🐾</div>
                  <p className='text-gray-500'>
                    Você ainda não fez nenhuma solicitação de adoção.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-secondary mb-4'>
              Meus Pets e Solicitações Recebidas
            </h2>

            {isLoading ? (
              <div className='bg-white rounded-lg shadow-md p-12'>
                <div className='text-center'>
                  <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
                  <p className='mt-4 text-gray-600'>Carregando seus pets...</p>
                </div>
              </div>
            ) : petsWithRequests.length > 0 ? (
              petsWithRequests.map((petWithRequests) => (
                <div
                  key={petWithRequests.pet.externalId}
                  className='bg-white rounded-lg shadow-md mb-6'
                >
                  <div className='flex flex-row justify-between p-6 border-b border-gray-200'>
                    <div className='flex gap-4 items-center'>
                      <img
                        src={getPetImage(petWithRequests.pet.files)}
                        alt={petWithRequests.pet.name}
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                      <div>
                        <h3 className='text-xl font-semibold text-secondary'>
                          {petWithRequests.pet.name}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {petWithRequests.pet.species} •{' '}
                          {calculateAge(petWithRequests.pet.birthDay)} anos
                        </p>
                      </div>
                    </div>
                    {!petWithRequests.pet.isAdote ? (
                      <div>
                        <Button
                          onClick={() => handleHasAdopted(petWithRequests.pet)}
                        >
                          Adoção Finalizada
                        </Button>
                      </div>
                    ) : (
                      <div className='bg-green-100 text-green-800 px-4 rounded-lg font-semibold flex items-center justify-center'>
                        ✓ Pet Adotado
                      </div>
                    )}
                  </div>
                  <div className='p-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <h4 className='font-semibold text-secondary'>
                        Solicitações de Adoção
                      </h4>
                      <span className='bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full'>
                        {petWithRequests.requests.length}
                      </span>
                    </div>
                    <PetRequestCard petWithRequests={petWithRequests} />
                  </div>
                </div>
              ))
            ) : (
              <div className='bg-white rounded-lg shadow-md p-12'>
                {' '}
                <div className='text-center'>
                  <div className='text-gray-400 text-5xl mb-4'>🐾</div>
                  <p className='text-gray-500'>
                    Você ainda não cadastrou nenhum pet para adoção.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
