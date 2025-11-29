import React, { useEffect, useState } from 'react';
import type { Route } from './+types/home';
import { fetchUserProfile, type UserData } from '@/services/user-services';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router';
import Button from '@/components/ui/button/button';
import { Mail, Phone, Calendar, User } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [{ title: 'Meu Perfil' }];
}

export default function ProfilePage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user: authUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        const loadProfile = async () => {
            setIsLoading(true);
            const profile = await fetchUserProfile();
            if (profile) {
                setUserData(profile);
                setError(null);
            } else {
                setError('Não foi possível carregar o perfil');
            }
            setIsLoading(false);
        };

        loadProfile();
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-gray-600">Carregando perfil...</p>
                </div>
            </main>
        );
    }

    if (error || !userData) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow p-8 max-w-md text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Erro ao carregar perfil</h2>
                    <p className="text-gray-600 mb-6">{error || 'Perfil não disponível'}</p>
                    <Button bgColor="#F57B42" textColor="#fff" onClick={() => navigate('/')}>
                        Voltar para home
                    </Button>
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="w-full max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <div className="flex flex-col items-center gap-6">
                        {userData.avatar ? (
                            <img
                                src={userData.avatar}
                                alt={userData.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center border-4 border-primary">
                                <User className="w-16 h-16 text-white" />
                            </div>
                        )}

                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                            <p className="text-gray-500 mt-1">{userData.email}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                            <p className="text-xs text-gray-500">ID do Usuário</p>
                            <p className="text-sm font-mono text-gray-700">{userData.externalId}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Informações de Contato</h2>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600">Email</p>
                                <p className="text-gray-800">{userData.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                            <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600">Telefone</p>
                                <p className="text-gray-800">
                                    {userData.phone || <span className="text-gray-400">Não informado</span>}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4">
                            <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600">Membro desde</p>
                                <p className="text-gray-800">{formatDate(userData.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Ações</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button bgColor="#F57B42" textColor="#fff">
                            Editar Perfil
                        </Button>
                        <Button bgColor="#6B7280" textColor="#fff">
                            Meus Pets
                        </Button>
                        <Button bgColor="#3B82F6" textColor="#fff">
                            Minhas Adoções
                        </Button>
                        <Button bgColor="#EF4444" textColor="#fff">
                            Sair
                        </Button>
                    </div>
                </div>

                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>Última atualização: {formatDate(userData.updatedAt)}</p>
                </div>
            </div>
        </main>
    );
}
