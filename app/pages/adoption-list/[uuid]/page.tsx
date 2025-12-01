import CreateAdoptionRequestSection from '@/components/create-adoption-request-section/create-adoption-request-section';
import Gallery from '@/components/gallery/gallery';
import HistoryCard from '@/components/history-card/history-card';
import LocationInfo from '@/components/location-info/location-info';
import PetAttributeCard from '@/components/pet-attribute-card/pet-attribute-card';
import PetInfo from '@/components/pet-info/pet-info';
import { useAuth } from '@/contexts/auth-context';
import { getPetByUuid } from '@/services/pet-services';

import type { IApiResponse } from '@/types/IApiResponse';
import type { IPet } from '@/types/IPet';
import { calculateAge, formatGender } from '@/utils/formatted-data';
import { Clock, PawPrint, Venus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function AdoptionSpecificPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<IPet | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response: IApiResponse<{ pet: IPet }> = await getPetByUuid(uuid!);

        if (response.data) {
          setPet(response.data.pet);
        } else {
          setError((response as any)?.message || 'Resposta inválida da API');
        }
      } catch (err: any) {
        setError(err?.message || 'Erro ao buscar pet');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [uuid]);

  return (
    <div className='max-w-full md:max-w-[1350px] mx-auto p-4 md:p-0 my-6'>
      {loading && (
        <div className='flex justify-center items-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      )}

      {!loading && !error && !pet && (
        <div className='flex flex-col items-center justify-center py-12 px-4'>
          <img
            src='/assets/images/sad.jpg'
            alt='Pet não encontrado'
            className='w-64 h-64 object-contain mb-6'
          />
          <h2 className='text-2xl font-bold text-gray-700 mb-2'>
            Pet não encontrado
          </h2>
          <p className='text-gray-500 text-center max-w-md'>
            O pet que você está procurando não está disponível para adoção ou
            foi removido.
          </p>
        </div>
      )}

      {!loading && !error && pet && (
        <>
          <h1 className='text-2xl font-bold'>Olá, humano!</h1>

          <PetInfo pet={pet} />
          <LocationInfo state={pet.state} />

          <div className='flex flex-col md:flex-row mt-6'>
            <div className='w-full md:w-2/3'>
              <Gallery images={pet.files} />
            </div>

            <div className='w-full md:w-1/3 flex flex-col items-center gap-6 p-0 md:p-4'>
              <HistoryCard title={`História de ${pet.name}`} story={pet.lore} />

              {user.externalId !== pet.owner.externalId && (
                <CreateAdoptionRequestSection pet={pet} />
              )}

              <div className='flex w-full justify-between items-center mt-6 mb-10'>
                <PetAttributeCard
                  title='Gênero'
                  value={formatGender(pet.gender)}
                  icon={<Venus size={22} color='#D77445' />}
                />
                <PetAttributeCard
                  title='Raça'
                  value={pet.breed}
                  icon={<PawPrint size={22} color='#D77445' />}
                />
                <PetAttributeCard
                  title='Idade'
                  value={calculateAge(pet.birthDay)}
                  icon={<Clock size={22} color='#D77445' />}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
