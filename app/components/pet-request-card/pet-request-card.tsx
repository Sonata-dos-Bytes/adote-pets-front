import type { IAdoptionRequest } from '@/types/IAdoption';
import type { IPetWithRequests } from '@/types/IPet';
import { formatDate } from '@/utils';

export const PetRequestCard: React.FC<{ petWithRequests: IPetWithRequests }> = ({
  petWithRequests,
}) => {
  const { requests } = petWithRequests;

  return (
    <>
      {requests.length > 0 ? (
        <div className='space-y-3'>
          {requests.map((request: IAdoptionRequest) => (
            <div className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
              <div className='flex gap-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2 mb-2'>
                    <div>
                      <h4 className='font-semibold text-secondary'>
                        {request.user.name}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {request.user.email}
                      </p>
                    </div>
                    <span className='text-xs text-gray-500 whitespace-nowrap'>
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                  <p className='text-sm text-gray-700 mb-2'>{request.reason}</p>
                  <p className='text-xs text-gray-500'>
                    Telefone: {request.user.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='text-gray-400 text-5xl mb-4'>🐾</div>
          <p className='text-gray-500'>
            Nenhuma solicitação de adoção recebida ainda.
          </p>
        </div>
      )}
    </>
  );
};
