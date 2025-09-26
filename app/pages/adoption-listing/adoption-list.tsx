import PetFilters from '~/components/filters/filters';
import DogProfileCard from '~/components/pet-profile-card/pet-profile-card';

const petsData = [
  {
    id: 1,
    name: 'Lola',
    location: 'Maranhão, Baías',
    gender: 'Fêmea',
    breed: 'Retriever',
    age: '14 meses',
    description:
      'Lola é um cão fêmea amigável, brincalhona e inteligente. Adotá...',
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces',
  },
  {
    id: 2,
    name: 'Max',
    location: 'São Paulo, SP',
    gender: 'Macho',
    breed: 'Labrador',
    age: '2 anos',
    description:
      'Max é um cão muito energético e carinhoso, perfeito para famílias ativas...',
    image:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=faces',
  },
  {
    id: 3,
    name: 'Bella',
    location: 'Rio de Janeiro, RJ',
    gender: 'Fêmea',
    breed: 'Poodle',
    age: '3 anos',
    description:
      'Bella é uma cadela muito dócil e carinhosa, ideal para apartamentos...',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=faces',
  },
  {
    id: 4,
    name: 'Thor',
    location: 'Minas Gerais, MG',
    gender: 'Macho',
    breed: 'Pastor Alemão',
    age: '5 anos',
    description:
      'Thor é um cão protetor e leal, excelente para guardar a casa...',
    image:
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=faces',
  },
  {
    id: 5,
    name: 'Luna',
    location: 'Bahia, BA',
    gender: 'Fêmea',
    breed: 'Husky Siberiano',
    age: '1 ano',
    description:
      'Luna é uma cadela muito ativa e brincalhona, adora correr e brincar...',
    image:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop&crop=faces',
  },
  {
    id: 6,
    name: 'Rocky',
    location: 'Paraná, PR',
    gender: 'Macho',
    breed: 'Bulldog',
    age: '4 anos',
    description:
      'Rocky é um cão calmo e companheiro, perfeito para quem busca tranquilidade...',
    image:
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=300&fit=crop&crop=faces',
  },
];

export function AdoptionList() {
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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {petsData.map((pet) => (
                <div key={pet.id} className='flex'>
                  <DogProfileCard petData={pet} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
