import DashboardPage from '@/pages/dashboard/dashboard';

import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

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
