import { useEffect, useState } from 'react';
import PetFilters from '@/components/filters/filters';
import PetProfileCard from '@/components/pet-profile-card/pet-profile-card';
import type { IPet } from '@/types/IPet';
import type { IQuery } from '@/types/IQuery';
import type { IMeta } from '@/types/IMeta';
import type { IApiResponse } from '@/types/IApiResponse';
import { getPets } from '@/services/pet-services';

export function AdoptionListPage() {
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

            {!loading && !error && pets.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 px-4'>
                <img
                  src='/assets/images/sad.jpg'
                  alt='Nenhum pet disponível'
                  className='w-64 h-64 object-contain mb-6'
                />
                <h2 className='text-2xl font-bold text-gray-700 mb-2'>
                  Nenhum pet disponível no momento
                </h2>
                <p className='text-gray-500 text-center max-w-md'>
                  Ainda não há animais cadastrados para adoção. Volte em breve para conhecer nossos pets que estão procurando um lar cheio de amor!
                </p>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {pets.map((pet) => (
                    <div key={pet.externalId} className='flex'>
                      <PetProfileCard petData={pet} />
                    </div>
                  ))}
                </div>

                {meta.lastPage && meta.lastPage > 1 && (
                  <div className='flex flex-col items-center gap-4 mt-8'>
                    <div className='flex items-center gap-2 flex-wrap justify-center'>
                      <button
                        onClick={() => setQuery((prev) => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))}
                        disabled={query.page === 1}
                        className='px-2 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 15l-3-3l3-3"/></svg>
                      </button>

                      {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setQuery((prev) => ({ ...prev, page }))}
                          className={`px-4 py-2 rounded-lg font-bold transition-colors ${query.page === page
                              ? 'bg-primary text-white border-2 border-primary'
                              : 'bg-white border border-gray-300 text-primary hover:bg-gray-50'
                            }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setQuery((prev) => ({ ...prev, page: Math.min(meta.lastPage!, (prev.page || 1) + 1) }))}
                        disabled={query.page === meta.lastPage}
                        className='px-2 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11 9l3 3l-3 3"/></svg>
                      </button>
                    </div>

                    {meta.total !== undefined && (
                      <p className='text-sm text-gray-600'>
                        Mostrando {(query.page! - 1) * query.perPage! + 1} - {Math.min(query.page! * query.perPage!, meta.total)} de {meta.total} pets
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
