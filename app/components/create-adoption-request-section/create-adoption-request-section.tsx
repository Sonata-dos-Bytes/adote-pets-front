import {
  createAdoptionRequestSchema,
  type CreateAdoptionRequestFormData,
} from '@/schemas/create-adoption-request-schema';
import { createAdoptionRequest } from '@/services/adoption-request-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../ui/button/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog/dialog';
import type { IApiResponse } from '@/types/IApiResponse';
import type { IAdoptionRequest } from '@/types/IAdoption';

interface CreateAdoptionRequestSectionProps {
  pet: { externalId: string };
}

export default function CreateAdoptionRequestSection({
  pet,
}: CreateAdoptionRequestSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAdoptionRequestFormData>({
    resolver: zodResolver(createAdoptionRequestSchema),
  });

  const onSubmit = async (data: CreateAdoptionRequestFormData) => {
    try {
      const response = await createAdoptionRequest(pet.externalId, {
        reason: data.motive,
      });

      if (!response || !response.status) {
        toast.error('Erro ao enviar solicitação: ' + (response?.message || 'Erro desconhecido'));
        return;
      }

      toast.success('Solicitação de adoção enviada com sucesso');
      setIsDialogOpen(false);
      reset();
    } catch (error: any) {
      toast.error('Erro ao enviar solicitação: ' + error.message);
    }
  };

  useEffect(() => {
    reset();
  }, [isDialogOpen]);

  return (
    <>
      <div className='w-full border border-[#dfdfdf] rounded-[16px] p-6 flex flex-col items-center gap-4'>
        <p className='text-center text-gray-800 font-bold text-base'>
          Se você estiver interessado em adotar
        </p>

        <Button onClick={() => setIsDialogOpen(true)}>
          Abrir Solicitação de Adoção
        </Button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth='4xl'
        fullWidth
      >
        <DialogContent fullWidth>
          <DialogHeader
            title='Solicitação de Adoção'
            description='Conte-nos por que você deseja adotar este pet'
          />

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <textarea
                {...register('motive')}
                placeholder='Descreva seus motivos para adoção...'
                className='w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#D77445]'
              />
              {errors.motive && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.motive.message}
                </p>
              )}
            </div>

            <Button type='submit'>Enviar Solicitação</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
