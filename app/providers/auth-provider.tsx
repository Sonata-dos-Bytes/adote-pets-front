import { loginUser } from '@/services/auth-services';
import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { AuthContext } from '@/contexts/auth-context';
import type { SignIn } from '@/types/IAuth';
import type { User } from '@/types/IUser';

export interface AuthContextData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (
    credentials: SignIn,
  ) => Promise<{ error: boolean; message: string } | void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userJson = Cookies.get('@app-user');
        const userToken = Cookies.get('@app-token');

        if (!userJson || !userToken) {
          setUser(null);
          setToken(null);
          return;
        }

        const userParsed = JSON.parse(userJson) as User;

        setUser(userParsed);
        setToken(userToken);
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const signIn = async ({ login, password }: SignIn) => {
    try {
      setIsLoading(true);
      const res = (await loginUser({ login, password })) as unknown as {
        error?: boolean;
        message?: string;
        data?: any;
      };

      if (res?.error || !res?.data) {
        const errorMessage = res?.message?.includes('Unauthorized')
          ? 'E-mail ou senha inválidos'
          : res?.message || 'Erro ao fazer login';

        return { error: true, message: errorMessage };
      }

      setUser(res.data.user as User);
      setToken(res.data.token);

      Cookies.set('@app-token', res.data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });

      Cookies.set('@app-user', JSON.stringify(res.data.user), {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });

      return { error: false, message: 'Login realizado com sucesso' };
    } catch (error: unknown) {
      signOut();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('@app-token');
    Cookies.remove('@app-user');
    sessionStorage.clear();
    window.location.href = '/';
  };

  const isAuthenticated = user !== null;

  const values: AuthContextData = {
    user,
    token,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
