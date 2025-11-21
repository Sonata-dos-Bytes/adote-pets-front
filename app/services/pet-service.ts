import type { IApiResponse } from '~/types/IApiResponse';
import type { IQuery } from '~/types/IQuery';
import type { IPet } from '~/types/IPet';
import type { IMeta } from '~/types/IMeta';
import { apiFetch } from '~/utils/api-fetch';
import { handleApiError } from '~/utils/handle-api-fetch-error';

export async function getPets(
  filters: IQuery
): Promise<IApiResponse<{ pets: IPet[]; meta: IMeta }>> {
  try {
    const response = (await apiFetch('GET', '/pets', filters)) as IApiResponse<{
      pets: IPet[];
      meta: IMeta;
    }>;

    return response;
  } catch (error) {
    handleApiError(error, 'Falha ao buscar pets.');
    throw error;
  }
}

export async function getPetByUuid(
  uuid: string
): Promise<IApiResponse<{ pet: IPet }>> {
  try {
    const response = (await apiFetch('GET', `/pets/${uuid}`)) as IApiResponse<{
      pet: IPet;
    }>;

    return response;
  } catch (error) {
    handleApiError(error, 'Falha ao buscar o pet.');
    throw error;
  }
}
