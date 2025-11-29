import Button from '@/components/ui/button/button';
import { RegisterSchema, type RegisterFormData } from '@/schemas/auth-schema';
import { registerUser } from '@/services/auth-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSidebar,
} from '../ui/dialog/dialog';

export default function AdotePetSignup({
  isOpen,
  setIsOpen,
  onSwitchToLogin,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSwitchToLogin: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const response = await registerUser(data);

        if (response?.status === false) {
          toast.error('Erro ao registrar usuário. Tente novamente.');
          return;
        }

        toast.success('Usuário registrado com sucesso!');
        handleClose();
      } catch (error) {
        toast.error('Falha ao registrar usuário. Tente novamente.');
        console.error('Erro ao registrar usuário:', error);
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} maxWidth='4xl'>
      <DialogSidebar side='left'>
        <img
          src='./assets/images/logo-header.png'
          alt='Logo'
          className='w-36'
        />

        <div className='relative'>
          <img
            src='./assets/images/auth/dog-register.webp'
            alt='Cachorro fofo segurando placa com texto Registrar Agora'
            className='w-72 h-72 mt-4'
          />
        </div>

        <div className='mt-12 text-center'>
          <div className='w-16 h-1 bg-orange-200 mx-auto rounded-full'></div>
        </div>
      </DialogSidebar>

      <DialogContent side='right'>
        <DialogHeader
          title='Crie sua conta'
          description='Junte-se à nossa comunidade!'
        />

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <User width={18} height={18} />
            </span>
            <input
              type='text'
              placeholder='Nome Completo'
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors'
              {...register('name')}
            />
          </div>
          {errors.name && (
            <p className='text-red-500 text-sm mt-1 ml-1'>
              {errors.name.message}
            </p>
          )}

          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Mail width={18} height={18} />
            </span>
            <input
              type='email'
              placeholder='E-mail'
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors'
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className='text-red-500 text-sm mt-1 ml-1'>
              {errors.email.message}
            </p>
          )}

          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Phone width={18} height={18} />
            </span>
            <input
              type='text'
              placeholder='Telefone'
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors'
              {...register('phone')}
            />
          </div>
          {errors.phone && (
            <p className='text-red-500 text-sm mt-1 ml-1'>
              {errors.phone.message}
            </p>
          )}

          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Lock width={18} height={18} />
            </span>
            <input
              type='password'
              placeholder='Senha'
              className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors'
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1 ml-1'>
              {errors.password.message}
            </p>
          )}

          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
              <Lock width={18} height={18} />
            </span>
            <input
              type='password'
              placeholder='Confirmar Senha'
              className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors'
              {...register('passwordConfirmation')}
            />
          </div>
          {errors.passwordConfirmation && (
            <p className='text-red-500 text-sm mt-1 ml-1'>
              {errors.passwordConfirmation.message}
            </p>
          )}

          <Button
            type='submit'
            disabled={isPending}
            className='w-full text-white font-semibold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl mt-5'
          >
            Cadastrar-se
          </Button>
        </form>

        <DialogFooter>
          Já tem uma conta?{' '}
          <button
            type='button'
            className='text-primary hover:underline font-semibold hover:cursor-pointer'
            onClick={onSwitchToLogin}
          >
            Entrar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
