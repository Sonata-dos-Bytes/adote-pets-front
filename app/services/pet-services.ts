import { apiFetch } from "@/utils/api-fetch";
import { handleApiError } from "@/utils/handle-api-fetch-error";

export const getMyPets = async () => {
  try {
    const response: any = await apiFetch('GET', '/pets/my-pets');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
};
