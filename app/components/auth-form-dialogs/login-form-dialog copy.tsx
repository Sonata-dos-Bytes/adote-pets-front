import { useAuth } from '@/contexts/auth-context';
import { LoginSchema, type LoginFormData } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../ui/button/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSidebar,
} from '../ui/dialog/dialog';

export default function AdotePetSignin({
  isOpen,
  setIsOpen,
  onSwitchToRegister,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSwitchToRegister: () => void;
}) {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      try {
        const response: any = await signIn(data);

        if (response?.error) {
          toast.error('Erro ao autenticar usuário. Tente novamente.');
          return;
        }

        toast.success('Usuário autenticado com sucesso!');
        handleClose();
      } catch (error) {
        toast.error('Falha ao autenticar usuário. Tente novamente.');
        console.error('Erro ao autenticar usuário:', error);
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} maxWidth='4xl'>
      <DialogContent side='left'>
        <DialogHeader
          title='Faça login no AdotePet'
          description='Bem-vindo de volta! Por favor, faça login para continuar.'
        />

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Mail width={18} height={18} />
            </span>
            <input
              type='login'
              placeholder='E-mail'
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors'
              {...register('login')}
            />
          </div>
          {errors.login && (
            <p className='text-red-500 text-sm ml-1'>{errors.login.message}</p>
          )}

          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Lock width={18} height={18} />
            </span>
            <input
              type='password'
              placeholder='Senha'
              autoComplete='off'
              className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors'
              {...register('password')}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              {showPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm ml-1'>
              {errors.password.message}
            </p>
          )}

          <Button type='submit' disabled={isPending}>
            Entrar
          </Button>
        </form>

        <DialogFooter>
          Não tem uma conta?{' '}
          <button
            type='button'
            className='text-primary hover:underline font-semibold hover:cursor-pointer'
            onClick={onSwitchToRegister}
          >
            Cadastre-se
          </button>
        </DialogFooter>
      </DialogContent>

      <DialogSidebar side='right'>
        <img
          src='./assets/images/logo-header.png'
          alt='Logo'
          className='w-36'
        />
        <div className='relative'>
          <img
            src='./assets/images/auth/cat-login.webp'
            alt='Gato fofo segurando placa com texto Entrar Agora'
            className='w-72 h-72 mt-4'
          />
        </div>
        <div className='mt-12 text-center'>
          <div className='w-16 h-1 bg-orange-200 mx-auto rounded-full'></div>
        </div>
      </DialogSidebar>
    </Dialog>
  );
}
