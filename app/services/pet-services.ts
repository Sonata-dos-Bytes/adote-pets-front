import { apiFetch, getAuthToken } from '@/utils/api-fetch';
import { handleApiError } from '@/utils/handle-api-fetch-error';

export interface CreatePetPayload {
  name: string;
  species: string;
  breed: string;
  gender: 'male' | 'female';
  color?: string;
  city: string;
  state: string;
  uf: string;
  birthDay: string; 
  isCastrated: boolean;
  isAdote: boolean;
  lore?: string;
  files: File[];
}

export async function registerPet(
  token: string,
  payload: CreatePetPayload
): Promise<any> {
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
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(errorData.message || `Erro ao registrar pet: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.pet || data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar pet.');
    throw error;
  }
}