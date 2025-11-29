import Dashboard from '@/pages/dashboard/dashboard';
import type { Route } from './+types/dashboard';

import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Painel - Adote Pets' },
    {
      name: 'description',
      content: 'Gerencie seus pets e adoções na Adote Pets.',
    },
  ];
}

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return <Dashboard />;
}
