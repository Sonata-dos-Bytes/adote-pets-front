import type { IPetFile } from '@/types/IPet';

export const getInitials = (name: string) => {
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const calculateAge = (birthDay: string): number => {
  const birth = new Date(birthDay);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const getPetImage = (files: IPetFile[]): string => {
  const sortedFiles = [...files].sort((a, b) => a.orderIndex - b.orderIndex);
  return sortedFiles[0]?.path || '';
};
