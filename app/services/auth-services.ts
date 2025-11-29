import type { SignIn, SignUp } from '@/types/IAuth';
import { apiFetch } from '@/utils/api-fetch';
import { handleApiError } from '@/utils/handle-api-fetch-error';

export const registerUser = async (data: SignUp) => {
  try {
    const response: any = await apiFetch('POST', '/auth/register', data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Falha ao registrar usuário.');
  }
};

export const loginUser = async (data: SignIn) => {
  try {
    const response = await apiFetch('POST', '/auth/login', data);
    return response;
  } catch (error) {
    handleApiError(error, 'Falha ao realizar login.');
  }
};
