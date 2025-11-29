import { useEffect, useState } from 'react';
import PetFilters from '@/components/filters/filters';
import PetProfileCard from '@/components/pet-profile-card/pet-profile-card';
import type { IPet } from '@/types/IPet';
import type { IQuery } from '@/types/IQuery';
import type { IMeta } from '@/types/IMeta';
import type { IApiResponse } from '@/types/IApiResponse';
import { getPets } from '@/services/pet-services';

export function AdoptionList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<IPet[]>([]);
  const [meta, setMeta] = useState<IMeta>({});
  const [query, setQuery] = useState<IQuery>({ page: 1, perPage: 9 });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response: IApiResponse<{
          pets: IPet[];
          meta: IMeta;
        }> = await getPets(query);

        if (response.data) {
          setPets(response.data?.pets || []);
          setMeta(response.data?.meta || {});
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
  }, [query]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-10'>
        <h1 className='text-4xl font-bold mb-4 text-secondary'>
          Animais Disponíveis para Adoção
        </h1>
        <div className='flex flex-col lg:flex-row gap-8 w-full'>
            <div className='w-full lg:w-2/5 mb-8 lg:mb-0'>
            <PetFilters
              setFilteredQuery={setQuery}
            />
          </div>

          <div className='w-full'>
            {loading && <div>Carregando pets...</div>}
            {error && <div className='text-red-600'>Erro: {error}</div>}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {pets.map((pet) => (
                <div key={pet.externalId} className='flex'>
                  <PetProfileCard petData={pet} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
