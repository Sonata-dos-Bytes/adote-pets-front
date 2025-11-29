import { apiFetch } from '@/utils/api-fetch';
import { handleApiError } from '@/utils/handle-api-fetch-error';

export const getMyRequests = async () => {
  try {
    const response: any = await apiFetch(
      'GET',
      `/adoptions/adoption-requests`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
};

export const getPetRequests = async (petExternalId: string) => {
  try {
    const response: any = await apiFetch(
      'GET',
      `/pets/${petExternalId}/adoptions/requests`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
};
