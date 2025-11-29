import type { IAdoptionRequest } from '@/types/IAdoption';
import { calculateAge, formatDate, getPetImage } from '@/utils';

export const MyRequestCard: React.FC<{ request: IAdoptionRequest }> = ({
  request,
}) => {
  const petAge = calculateAge(request.pet.birthDay);
  const petImage = getPetImage(request.pet.files);
  const speciesLabel = request.pet.species;
  const genderLabel = request.pet.gender;

  return (
    <div className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
      <div className='flex gap-4'>
        <img
          src={petImage}
          alt={request.pet.name}
          className='w-24 h-24 object-cover rounded-lg'
        />
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2 mb-2'>
            <div>
              <h4 className='font-semibold text-secondary text-lg'>
                {request.pet.name}
              </h4>
              <p className='text-sm text-gray-600'>
                {speciesLabel} • {genderLabel} • {petAge} anos
              </p>
              <p className='text-sm text-gray-600'>
                {request.pet.city}, {request.pet.uf}
              </p>
            </div>
            <span className='text-xs text-gray-500 whitespace-nowrap'>
              {formatDate(request.createdAt)}
            </span>
          </div>
          <div className='mt-2'>
            <p className='text-xs text-gray-500 mb-1'>Sua mensagem:</p>
            <p className='text-sm text-gray-700'>{request.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
