import type { IAdoptionRequest } from '@/types/IAdoption';
import { calculateAge, formatDate, getPetImage } from '@/utils';
import { Link } from 'react-router';

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
            <div className='flex-1'>
              <h4 className='font-semibold text-secondary text-lg'>
                {request.pet.name}
              </h4>
              <p className='text-sm text-gray-600'>
                {speciesLabel} • {genderLabel} • {petAge} anos
              </p>
              <p className='text-sm text-gray-600'>
                {request.pet.city}, {request.pet.uf}
              </p>
              {request.pet.isAdote && (
                <span className='inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded'>
                  ✓ Adotado
                </span>
              )}
            </div>
            <div className='flex flex-col items-end h-full'>
              <span className='text-xs text-gray-500 whitespace-nowrap'>
                {formatDate(request.createdAt)}
              </span>
              {!request.pet.isAdote && (
                <Link
                  to={`/adoption/${request.pet.externalId}`}
                  className='text-secondary text-sm underline hover:text-secondary/90 transition-colors mt-auto'
                >
                  Ver Pet
                </Link>
              )}
            </div>
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
