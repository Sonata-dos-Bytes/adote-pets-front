import type { IApiResponse } from '@/types/IApiResponse';
import type { IMeta } from '@/types/IMeta';
import type { IPet } from '@/types/IPet';
import type { IQuery } from '@/types/IQuery';
import { apiFetch } from '@/utils/api-fetch';
import { handleApiError } from '@/utils/handle-api-fetch-error';

export async function getPets(
  filters: IQuery,
): Promise<IApiResponse<{ pets: IPet[]; meta: IMeta }>> {
  try {
    const response = (await apiFetch('GET', '/pets', null, filters, {}, false)) as IApiResponse<{
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
  uuid: string,
): Promise<IApiResponse<{ pet: IPet }>> {
  try {
    const response = (await apiFetch('GET', `/pets/${uuid}`, null, {}, {}, false)) as IApiResponse<{
      pet: IPet;
    }>;

    return response;
  } catch (error) {
    handleApiError(error, 'Falha ao buscar o pet.');
    throw error;
  }
}

export async function registerPet(token: string, payload: IPet): Promise<any> {
  try {
    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('species', payload.species);
    formData.append('breed', payload.breed);
    formData.append('gender', payload.gender);
    formData.append('city', payload.city);
    formData.append('state', payload.state);
    formData.append('uf', payload.uf);
    formData.append('birthDay', payload.birthDay);
    formData.append('isCastrated', String(payload.isCastrated));
    formData.append('isAdote', String(payload.isAdote));

    if (payload.color) formData.append('color', payload.color);
    if (payload.lore) formData.append('lore', payload.lore);

    payload.files.forEach((file) => {
      formData.append('files[]', file);
    });

    const fallbackEnv = import.meta.env.VITE_API_URL as string;

    const response = await fetch(fallbackEnv + '/auth/pets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(
        errorData.message || `Erro ao registrar pet: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.data?.pet || data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar pet.');
    throw error;
  }
}

export async function updatePet(uuid: string, payload: IPet) {
  try {
    const response: any = await apiFetch(
      'PUT',
      `/pets/${uuid}`,
      payload,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
}

export const getMyPets = async () => {
  try {
    const response: any = await apiFetch('GET', '/pets/my-pets');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
};
