import { type AuthContextData } from '@/providers/auth-provider';
import { createContext, useContext } from 'react';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
