import { useEffect, useState } from 'react';
import PetFilters from '~/components/filters/filters';
import PetProfileCard from '~/components/pet-profile-card/pet-profile-card';
import type { IPet } from '~/types/IPet';
import { getPets } from '~/services/pet-service';
import type { IQuery } from '~/types/IQuery';
import type { IMeta } from '~/types/IMeta';

export function AdoptionList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<IPet[]>([]);
  const [meta, setMeta] = useState<IMeta>({});

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      const query: IQuery = { page: 1, perPage: 12 };

      try {
        const response = await getPets(query);

        if (!mounted) return;

        if (response && (response as any).status) {
          // resposta esperada: { status, message, data: { pets: [], meta: {} } }
          const data = (response as any).data;
          setPets(data?.pets || []);
          setMeta(data?.meta || {});
        } else {
          setError((response as any)?.message || 'Resposta inválida da API');
        }
      } catch (err: any) {
        setError(err?.message || 'Erro ao buscar pets');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-10'>
        <h1 className='text-4xl font-bold mb-4'>
          Animais Disponíveis para Adoção
        </h1>
        <div className='flex flex-col lg:flex-row gap-8 w-full'>
          <div className='w-full lg:w-2/5 mb-8 lg:mb-0'>
            <PetFilters />
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
