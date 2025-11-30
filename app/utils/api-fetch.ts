import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

function logout() {
  Cookies.remove('@app-token');
  Cookies.remove('@app-user');

  sessionStorage.clear();

  window.location.href = '/';
}

export async function getAuthToken(): Promise<string | undefined> {
  const tokenStr = Cookies.get('@app-token');

  if (!tokenStr) {
    return undefined;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(tokenStr);

    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = decoded.exp < currentTime;

      if (isExpired) {
        console.warn('Token expirado. Realizando logout...');
        logout();
        return;
      }
    }

    return tokenStr;
  } catch (error) {
    logout();
    console.error('Erro ao validar token:', error);
    return;
  }
}

export async function apiFetch(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  body: unknown = null,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
  isAuthRequired = true,
): Promise<unknown> {
  const token = await getAuthToken();

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    ...headers,
  };

  const isFormData = body instanceof FormData;
  if (!isFormData && !headers['Content-Type']) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    if (isFormData) {
      options.body = body as FormData;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  if (method === "GET" && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString()
    url += `?${queryString}`
  }

  try {
    const fallbackEnv = import.meta.env.VITE_API_URL;
    const response = await fetch(fallbackEnv + (isAuthRequired ? "/auth" : "") + url, options);

    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      console.error('API error response:', errorData);
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${
          errorData.message || 'Unknown error'
        }`,
      );
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
