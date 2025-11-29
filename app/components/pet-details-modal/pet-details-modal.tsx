import { Dialog } from '@/components/ui/dialog/dialog';
import {
    deletePet,
    deleteImageFromPet,
    uploadImageToPet,
    updatePet,
} from '@/services/pet-services';
import type { IPet } from '@/types/IPet';
import { calculateAge, getPetImage } from '@/utils';
import { Edit, Trash2, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/auth-context';

const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface PetDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    pet: IPet;
    onPetUpdated: () => void;
    onPetDeleted: () => void;
}

export function PetDetailsModal({
    isOpen,
    onClose,
    pet,
    onPetUpdated,
    onPetDeleted,
}: PetDetailsModalProps) {
    const { token } = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editedPet, setEditedPet] = useState<IPet>({
        ...pet,
        birthDay: formatDateForInput(pet.birthDay)
    });
    const [localImages, setLocalImages] = useState(pet.files);

    React.useEffect(() => {
        setEditedPet({
            ...pet,
            birthDay: formatDateForInput(pet.birthDay)
        });
        setLocalImages(pet.files);
    }, [pet]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setEditedPet((prev) => ({ ...prev, [name]: checked }));
        } else {
            setEditedPet((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const payload = {
                name: editedPet.name,
                species: editedPet.species,
                breed: editedPet.breed,
                gender: editedPet.gender,
                color: editedPet.color,
                city: editedPet.city,
                state: editedPet.state,
                uf: editedPet.uf,
                birthDay: editedPet.birthDay,
                isCastrated: editedPet.isCastrated,
                isAdote: editedPet.isAdote,
                lore: editedPet.lore,
            };

            await updatePet(pet.externalId, payload);
            toast.success('Pet atualizado com sucesso!');
            setIsEditMode(false);
            onPetUpdated();
        } catch (error) {
            console.error('Erro ao atualizar pet:', error);
            toast.error('Erro ao atualizar pet.');
        }
    };

    const handleDeletePet = async () => {
        if (!window.confirm('Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deletePet(pet.externalId);
            toast.success('Pet excluído com sucesso!');
            onPetDeleted();
            onClose();
        } catch (error) {
            console.error('Erro ao excluir pet:', error);
            toast.error('Erro ao excluir pet.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteImage = async (fileExternalId: string) => {
        if (localImages.length <= 1) {
            toast.warning('O pet deve ter pelo menos uma imagem!');
            return;
        }

        if (!window.confirm('Tem certeza que deseja excluir esta imagem?')) {
            return;
        }

        try {
            await deleteImageFromPet(pet.externalId, fileExternalId);
            setLocalImages((prev) => prev.filter((img) => img.externalId !== fileExternalId));
            toast.success('Imagem excluída com sucesso!');
            onPetUpdated();
        } catch (error) {
            console.error('Erro ao excluir imagem:', error);
            toast.error('Erro ao excluir imagem.');
        }
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!token) {
            toast.error('Você precisa estar autenticado para fazer upload de imagens.');
            return;
        }

        try {
            setIsUploading(true);
            const response = await uploadImageToPet(pet.externalId, file, token);
            toast.success('Imagem adicionada com sucesso!');
            onPetUpdated();

            if (response.data?.file) {
                setLocalImages((prev) => [...prev, response.data.file]);
            }
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            toast.error('Erro ao fazer upload da imagem.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4'>
            <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto relative'>
                <X
                    className='absolute top-6 right-6 w-8 h-8 text-gray-800 cursor-pointer z-10 hover:text-gray-600 transition-colors'
                    onClick={onClose}
                />

                <div className='p-8 md:p-12'>
                    <div className='flex justify-between items-start mb-6'>
                        <h2 className='text-3xl font-bold text-secondary'>
                            {isEditMode ? 'Editar Pet' : 'Detalhes do Pet'}
                        </h2>
                        <div className='flex gap-2'>
                            {!isEditMode ? (
                                <>
                                    <button
                                        onClick={() => setIsEditMode(true)}
                                        className='flex items-center gap-2 bg-primary text-white border-primary hover:bg-primary/90 hover:text-white border rounded-lg px-4 py-3 font-semibold text-sm transition-colors duration-200'
                                    >
                                        <Edit size={18} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={handleDeletePet}
                                        disabled={isDeleting}
                                        className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white border rounded-lg px-4 py-3 font-semibold text-sm transition-colors duration-200 disabled:opacity-50'
                                    >
                                        <Trash2 size={18} />
                                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSaveChanges}
                                        className='flex items-center gap-2 bg-primary text-white border-primary hover:bg-primary/90 hover:text-white border rounded-lg px-4 py-3 font-semibold text-sm transition-colors duration-200'
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setEditedPet(pet);
                                        }}
                                        className='flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white border rounded-lg px-4 py-3 font-semibold text-sm transition-colors duration-200'
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='mb-8'>
                        <h3 className='text-lg font-semibold text-secondary mb-4'>Fotos</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {localImages.map((file) => (
                                <div key={file.externalId} className='relative group'>
                                    <img
                                        src={file.path}
                                        alt={`${pet.name}`}
                                        className='w-full h-32 object-cover rounded-lg'
                                    />
                                    {isEditMode && (
                                        <button
                                            onClick={() => handleDeleteImage(file.externalId)}
                                            className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isEditMode && (
                                <label className='border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors'>
                                    <Upload size={24} className='text-gray-400 mb-2' />
                                    <span className='text-sm text-gray-500'>
                                        {isUploading ? 'Enviando...' : 'Adicionar Foto'}
                                    </span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleUploadImage}
                                        disabled={isUploading}
                                        className='hidden'
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Nome
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='name'
                                    value={editedPet.name}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.name}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Espécie
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='species'
                                    value={editedPet.species}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.species}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Raça
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='breed'
                                    value={editedPet.breed}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.breed}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Sexo
                            </label>
                            {isEditMode ? (
                                <select
                                    name='gender'
                                    value={editedPet.gender}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                >
                                    <option value='male'>Macho</option>
                                    <option value='female'>Fêmea</option>
                                </select>
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>
                                    {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Cor
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='color'
                                    value={editedPet.color}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.color}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Idade
                            </label>
                            {isEditMode ? (
                                <input
                                    type='date'
                                    name='birthDay'
                                    value={editedPet.birthDay}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>
                                    {calculateAge(pet.birthDay)} anos
                                </p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Cidade
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='city'
                                    value={editedPet.city}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.city}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Estado
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='state'
                                    value={editedPet.state}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.state}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                UF
                            </label>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='uf'
                                    value={editedPet.uf}
                                    onChange={handleInputChange}
                                    maxLength={2}
                                    className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                                />
                            ) : (
                                <p className='text-gray-800 text-lg font-bold'>{pet.uf}</p>
                            )}
                        </div>

                        <div className='flex items-center gap-4'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type='checkbox'
                                            name='isCastrated'
                                            checked={editedPet.isCastrated}
                                            onChange={handleInputChange}
                                            className='w-5 h-5 text-primary'
                                        />
                                        <span className='text-gray-700'>Castrado ou Esterilizado</span>
                                    </>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                        <div
                                            className={`w-5 h-5 rounded ${pet.isCastrated ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                        />
                                        <span className='text-gray-700'>Castrado ou Esterilizado</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            História do Pet
                        </label>
                        {isEditMode ? (
                            <textarea
                                name='lore'
                                value={editedPet.lore}
                                onChange={handleInputChange}
                                rows={4}
                                className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none'
                            />
                        ) : (
                            <p className='text-gray-800 text-lg font-bold'>{pet.lore || 'Sem descrição'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
