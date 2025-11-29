import { apiFetch } from '@/utils/api-fetch';
import { handleApiError } from '@/utils/handle-api-fetch-error';

export interface UserData {
  externalId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: {
    user: UserData;
  };
}

export const fetchUserProfile = async (): Promise<UserData | null> => {
  try {
    const response = (await apiFetch('GET', '/auth/me')) as UserResponse;
    
    if (response?.status && response?.data?.user) {
      return response.data.user;
    }
    
    return null;
  } catch (error) {
    handleApiError(error, 'Falha ao carregar perfil do usuário.');
    return null;
  }
};
