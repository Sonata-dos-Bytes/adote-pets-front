import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile, type UserData } from '@/services/user-services';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router';
import Button from '@/components/ui/button/button';
import { Mail, Phone, Calendar, User, X } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
    avatar: null as File | null,
  });

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

  const handleOpenEditModal = () => {
    if (userData) {
      setEditFormData({
        name: userData.name,
        phone: userData.phone || '',
        oldPassword: '',
        password: '',
        passwordConfirmation: '',
        avatar: null,
      });
      setEditError(null);
    }
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditError(null);
    setEditFormData({
      name: '',
      phone: '',
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
      avatar: null,
    });
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEdit(true);
    setEditError(null);

    try {
      if (editFormData.name.trim().length < 1) {
        throw new Error('Nome é obrigatório');
      }

      if (editFormData.password && !editFormData.oldPassword) {
        throw new Error(
          'Você precisa informar a senha antiga para alterar a senha',
        );
      }

      if (
        editFormData.password &&
        editFormData.password !== editFormData.passwordConfirmation
      ) {
        throw new Error('As senhas não conferem');
      }

      const payload: any = {};
      if (editFormData.name !== userData?.name) {
        payload.name = editFormData.name;
      }
      if (editFormData.phone !== (userData?.phone || '')) {
        payload.phone = editFormData.phone || null;
      }
      if (editFormData.password) {
        payload.oldPassword = editFormData.oldPassword;
        payload.password = editFormData.password;
        payload.passwordConfirmation = editFormData.passwordConfirmation;
      }
      if (editFormData.avatar) {
        payload.avatar = editFormData.avatar;
      }

      if (Object.keys(payload).length === 0) {
        throw new Error('Nenhuma alteração foi feita');
      }

      const success = await updateUserProfile(payload);

      if (success) {
        const updatedProfile = await fetchUserProfile();
        if (updatedProfile) {
          setUserData(updatedProfile);
          handleCloseEditModal();
          alert('Perfil atualizado com sucesso!');
        } else {
          throw new Error('Não foi possível carregar os dados atualizados');
        }
      }
    } catch (err: any) {
      setEditError(err.message || 'Erro ao atualizar perfil');
      console.error('Erro completo:', err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      signOut();
    }
  };

  if (isLoading) {
    return (
      <main className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          <p className='text-gray-600'>Carregando perfil...</p>
        </div>
      </main>
    );
  }

  if (error || !userData) {
    return (
      <main className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow p-8 max-w-md text-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>
            Erro ao carregar perfil
          </h2>
          <p className='text-gray-600 mb-6'>
            {error || 'Perfil não disponível'}
          </p>
          <Button
            bgColor='#F57B42'
            textColor='#fff'
            onClick={() => navigate('/')}
          >
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
    <main className='min-h-screen bg-gray-50 py-12'>
      <div className='w-full max-w-2xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-8 mb-6'>
          <div className='flex flex-col items-center gap-6'>
            {userData.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.name}
                className='w-32 h-32 rounded-full object-cover border-4 border-primary'
              />
            ) : (
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center border-4 border-primary'>
                <User className='w-16 h-16 text-white' />
              </div>
            )}

            <div className='text-center'>
              <h1 className='text-3xl font-bold text-gray-800'>
                {userData.name}
              </h1>
              <p className='text-gray-500 mt-1'>{userData.email}</p>
            </div>

            <div className='bg-gray-50 rounded-lg px-4 py-2 text-center'>
              <p className='text-xs text-gray-500'>ID do Usuário</p>
              <p className='text-sm font-mono text-gray-700'>
                {userData.externalId}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-8 mb-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>
            Informações de Contato
          </h2>

          <div className='space-y-4'>
            <div className='flex items-start gap-4 pb-4 border-b border-gray-200'>
              <Mail className='w-6 h-6 text-primary flex-shrink-0 mt-0.5' />
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-600'>Email</p>
                <p className='text-gray-800'>{userData.email}</p>
              </div>
            </div>

            <div className='flex items-start gap-4 pb-4 border-b border-gray-200'>
              <Phone className='w-6 h-6 text-primary flex-shrink-0 mt-0.5' />
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-600'>Telefone</p>
                <p className='text-gray-800'>
                  {userData.phone || (
                    <span className='text-gray-400'>Não informado</span>
                  )}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4 pb-4'>
              <Calendar className='w-6 h-6 text-primary flex-shrink-0 mt-0.5' />
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-600'>
                  Membro desde
                </p>
                <p className='text-gray-800'>
                  {formatDate(userData.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>Ações</h2>

          <div className='w-full flex flex-col gap-4'>
            <Button
              bgColor='#F57B42'
              textColor='#fff'
              onClick={handleOpenEditModal}
            >
              Editar Perfil
            </Button>
            <Button bgColor='#EF4444' textColor='#fff' onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>

        <div className='text-center mt-8 text-sm text-gray-500'>
          <p>Última atualização: {formatDate(userData.updatedAt)}</p>
        </div>
      </div>

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Editar Perfil
              </h2>
              <button
                onClick={handleCloseEditModal}
                className='p-1 hover:bg-gray-100 rounded-full transition'
              >
                <X className='w-6 h-6 text-gray-600' />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className='p-6 space-y-4'>
              {editError && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                  {editError}
                </div>
              )}

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Nome
                </label>
                <input
                  type='text'
                  value={editFormData.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Seu nome'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Telefone
                </label>
                <input
                  type='tel'
                  value={editFormData.phone}
                  onChange={(e) =>
                    handleEditFormChange('phone', e.target.value)
                  }
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='(11) 99999-9999'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Avatar
                </label>
                <input
                  type='file'
                  accept='image/jpeg,image/png,image/jpg,image/webp'
                  onChange={(e) =>
                    handleEditFormChange('avatar', e.target.files?.[0] || null)
                  }
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Formatos: JPG, PNG, WebP
                </p>
              </div>

              <div className='border-t border-gray-200 pt-4 mt-4'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                  Alterar Senha (opcional)
                </p>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Senha Antiga
                </label>
                <input
                  type='password'
                  value={editFormData.oldPassword}
                  onChange={(e) =>
                    handleEditFormChange('oldPassword', e.target.value)
                  }
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Digite sua senha atual'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Nova Senha
                </label>
                <input
                  type='password'
                  value={editFormData.password}
                  onChange={(e) =>
                    handleEditFormChange('password', e.target.value)
                  }
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Digite a nova senha'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Confirmar Nova Senha
                </label>
                <input
                  type='password'
                  value={editFormData.passwordConfirmation}
                  onChange={(e) =>
                    handleEditFormChange('passwordConfirmation', e.target.value)
                  }
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Confirme a nova senha'
                />
              </div>

              <div className='flex gap-3 pt-4 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={handleCloseEditModal}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 font-semibold hover:bg-gray-50 transition'
                  disabled={isSubmittingEdit}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-primary text-white rounded font-semibold hover:opacity-90 transition disabled:opacity-50'
                  disabled={isSubmittingEdit}
                >
                  {isSubmittingEdit ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
