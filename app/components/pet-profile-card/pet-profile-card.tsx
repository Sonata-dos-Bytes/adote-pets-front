import type { IPet } from '@/types/IPet';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { Card } from '../card/card';
import Badge from '../ui/badge/badge';
import Button from '../ui/button/button';
import { calculateAge, formatGender } from '@/utils/formatted-data';

const PetProfileCard = ({ petData }: { petData: IPet }) => {
  const navigate = useNavigate();
  const pet = petData;

  const image = pet.files && pet.files.length > 0 ? pet.files[0].path : '';
  const location = pet.city ? `${pet.city}, ${pet.uf || pet.state || ''}` : '';
  const ageLabel = calculateAge(pet.birthDay);
  const genderLabel = formatGender(pet.gender);

  return (
    <Card className='w-full h-full'>
      <Card.Image src={image} alt={`${pet.name} - ${pet.breed}`} />

      <Card.Content>
        {/* Nome e localização */}
        <div className='mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-1'>{pet.name}</h2>
          <div className='flex items-center text-gray-500 text-sm'>
            <Icon icon='mingcute:location-fill' className='mr-1 w-4 h-4' />
            {location}
          </div>
        </div>

        {/* Informações em badges */}
        <div className='flex flex-wrap gap-2 mb-4'>
          <div>
            <span className='font-sans font-bold mr-1'>Gênero:</span>
            <Badge variant='primary'>
              <span className='font-sans font-bold'>{genderLabel}</span>
            </Badge>
          </div>

          <div>
            <span className='font-sans font-bold mr-1'>Raça:</span>
            <Badge variant='primary'>
              <span className=' font-bold'>{pet.breed}</span>
            </Badge>
          </div>

          <div>
            <span className='font-sans font-bold mr-1'>Idade:</span>
            <Badge variant='primary'>
              <span className=' font-bold'>{ageLabel}</span>
            </Badge>
          </div>
        </div>

        {/* Descrição */}
        <p className='text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3'>
          {pet.lore}
        </p>
      </Card.Content>

      <Card.Footer>
        <Button onClick={() => navigate(`/adoption/${pet.externalId}`)}>
          Mais informações
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PetProfileCard;
