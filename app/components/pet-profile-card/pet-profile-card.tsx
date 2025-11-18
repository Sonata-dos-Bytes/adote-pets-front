import type { IPet } from '~/types/IPet';
import { Card } from '../card/card';
import Badge from '../ui/badge/badge';
import Button from '../ui/button/button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';

const PetProfileCard = ({ petData }: { petData: IPet }) => {
  const navigate = useNavigate();
  const pet = petData;

  const image = pet.files && pet.files.length > 0 ? pet.files[0].path : '';
  const location = pet.city ? `${pet.city}, ${pet.uf || pet.state || ''}` : '';

  function calculateAge(birth: string | undefined): string {
    if (!birth) return 'Idade desconhecida';
    try {
      const b = new Date(birth);
      const now = new Date();
      let years = now.getFullYear() - b.getFullYear();
      const m = now.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < b.getDate())) {
        years--;
      }
      if (years <= 0) {
        const months = (now.getFullYear() - b.getFullYear()) * 12 + m;
        if (months <= 1) return `${months} mês`;
        return `${months} meses`;
      }
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } catch {
      return 'Idade desconhecida';
    }
  }

  const ageLabel = calculateAge(pet.birthDay);
  const genderLabel = pet.gender === 'male' ? 'Macho' : pet.gender === 'female' ? 'Fêmea' : pet.gender;

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
        <p className='text-gray-600 text-sm leading-relaxed mb-6'>
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
