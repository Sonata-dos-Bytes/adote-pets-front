import CardWithButton from '@/components/card-with-button/card-with-button';
import Gallery from '@/components/gallery/gallery';
import HistoryCard from '@/components/history-card/history-card';
import LocationInfo from '@/components/location-info/location-info';
import PetAttributeCard from '@/components/pet-attribute-card/pet-attribute-card';
import PetInfo from '@/components/pet-info/pet-info';
import { getPetByUuid } from '@/services/pet-services';

import type { IApiResponse } from '@/types/IApiResponse';
import type { IPet } from '@/types/IPet';
import { calculateAge, formatGender } from '@/utils/formatted-data';
import { Clock, PawPrint, Venus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function AdoptionSpecific() {
  const { uuid } = useParams<{ uuid: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<IPet | null>(null);

  useEffect(() => {
    async function load() {
      if (!uuid) {
        setError('UUID inválido');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response: IApiResponse<{
          pet: IPet;
        }> = await getPetByUuid(uuid);

        if (response.data) {
          setPet(response.data?.pet || null);
        } else {
          setError((response as any)?.message || 'Resposta inválida da API');
        }
      } catch (err: any) {
        setError(err?.message || 'Erro ao buscar pets');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [uuid]);

  if (!pet) {
    return (
      <main className='main-content'>
        <h1>Pet não encontrado</h1>
      </main>
    );
  }

  const ageLabel = calculateAge(pet.birthDay);
  const genderLabel = formatGender(pet.gender);

  return (
    <main className='max-w-full md:max-w-[1350px] mx-auto main-content p-4 md:p-0 my-6'>
      <h1 className='text-2xl font-bold'>Olá, humano!</h1>

      <PetInfo pet={pet} />
      <LocationInfo state={pet.state} />

      <div className='flex flex-col md:flex-row mt-6'>
        <div className='w-full md:w-2/3'>
          <Gallery images={pet.files} />
        </div>

        <div className='w-full md:w-1/3 flex flex-col items-center gap-6 p-0 md:p-4'>
          <HistoryCard title={`História de ${pet.name}`} story={pet.lore} />
          <CardWithButton />

          <div className='flex w-full justify-between items-center mt-6 mb-10'>
            <PetAttributeCard
              title='Gênero'
              value={genderLabel}
              icon={<Venus size={22} color='#D77445' />}
            />
            <PetAttributeCard
              title='Raça'
              value={pet.breed}
              icon={<PawPrint size={22} color='#D77445' />}
            />
            <PetAttributeCard
              title='Idade'
              value={ageLabel}
              icon={<Clock size={22} color='#D77445' />}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
