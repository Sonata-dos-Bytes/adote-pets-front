import type { IPet } from '@/types/IPet';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { Card } from '../card/card';
import Badge from '../ui/badge/badge';
import Button from '../ui/button/button';

const PetProfileCard = ({ petData }: { petData: IPet }) => {
  let navigate = useNavigate();

  const pet = petData;

  return (
    <Card className='w-full h-full'>
      <Card.Image src={pet.image} alt={`${pet.name} - ${pet.breed}`} />

      <Card.Content>
        {/* Nome e localização */}
        <div className='mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-1'>{pet.name}</h2>
          <div className='flex items-center text-gray-500 text-sm'>
            <Icon icon='mingcute:location-fill' className='mr-1 w-4 h-4' />
            {pet.location}
          </div>
        </div>

        {/* Informações em badges */}
        <div className='flex flex-wrap gap-2 mb-4'>
          <div>
            <span className='font-sans font-bold mr-1'>Gênero:</span>
            <Badge variant='primary'>
              <span className='font-sans font-bold'>{pet.gender}</span>
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
              <span className=' font-bold'>{pet.age}</span>
            </Badge>
          </div>
        </div>

        {/* Descrição */}
        <p className='text-gray-600 text-sm leading-relaxed mb-6'>
          {pet.description}
        </p>
      </Card.Content>

      <Card.Footer>
        <Button onClick={() => navigate(`/adoption/1`)}>
          Mais informações
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PetProfileCard;
