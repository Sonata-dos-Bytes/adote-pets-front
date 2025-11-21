import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().min(3, 'Digite seu nome completo'),
    email: z.email('Digite um e-mail válido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z.string().min(8, 'Repita a senha corretamente'),
    phone: z
      .string()
      .min(10, 'Digite um número válido')
      .regex(/^\d+$/, 'Digite apenas números'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

export const LoginSchema = z.object({
  login: z.email('Digite um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export type LoginFormData = z.infer<typeof LoginSchema>;
