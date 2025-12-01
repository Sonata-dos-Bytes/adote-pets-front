import z from 'zod';

export const createAdoptionRequestSchema = z.object({
  motive: z
    .string()
    .min(1, 'O motivo é obrigatório')
    .min(20, 'O motivo deve ter pelo menos 20 caracteres')
    .max(100, 'O motivo deve ter no máximo 100 caracteres'),
});

export type CreateAdoptionRequestFormData = z.infer<
  typeof createAdoptionRequestSchema
>;
