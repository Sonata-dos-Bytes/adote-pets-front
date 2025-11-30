import { useAuth } from '@/contexts/auth-context';
import DashboardPage from '@/pages/dashboard/dashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Route } from './+types/dashboard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Painel de Controle - AdotePet' },
    {
      name: 'description',
      content:
        'Gerencie seus pets cadastrados, acompanhe solicitações de adoção e visualize o histórico de adoções realizadas.',
    },
  ];
}

export default function DashboardRoute() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return <DashboardPage />;
}
