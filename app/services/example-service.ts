import { apiFetch } from '~/utils/api-fetch';
import { handleApiError } from '~/utils/handle-api-fetch-error';

export function exampleService() {
  try {
    const response = apiFetch('GET', '/example-endpoint');
    return response;
  } catch (error) {
    handleApiError(error, 'Falha ao buscar dados do exemplo.');
  }
}
