import z from 'zod';

export const createAdoptionRequestSchema = z.object({
  motive: z
    .string()
    .min(1, 'O motivo é obrigatório')
    .min(20, 'O motivo deve ter pelo menos 20 caracteres')
    .max(500, 'O motivo deve ter no máximo 500 caracteres'),
});

export type CreateAdoptionRequestFormData = z.infer<
  typeof createAdoptionRequestSchema
>;
