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
    const response = (await apiFetch('GET', '/me')) as UserResponse;
    
    if (response?.status && response?.data?.user) {
      return response.data.user;
    }
    
    return null;
  } catch (error) {
    handleApiError(error, 'Falha ao carregar perfil do usuário.');
    return null;
  }
};

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
  avatar?: File;
}

export const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<boolean> => {
  try {
    const formData = new FormData();

    if (payload.name) {
      formData.append('name', payload.name);
    }
    
    if (payload.phone !== undefined) {
      formData.append('phone', payload.phone || '');
    }
    
    if (payload.oldPassword && payload.password) {
      formData.append('oldPassword', payload.oldPassword);
      formData.append('password', payload.password);
      if (payload.passwordConfirmation) {
        formData.append('passwordConfirmation', payload.passwordConfirmation);
      }
    }
    
    if (payload.avatar) {
      formData.append('avatar', payload.avatar);
    }
    
    const response = await apiFetch(
      'PUT',
      '/auth/update-profile',
      formData 
    );

    return true;
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    handleApiError(error, 'Falha ao atualizar perfil.');
    throw error;
  }
};