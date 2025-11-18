import type { IFile } from "./IFile";

interface IPet {
  externalId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  lore: string;
  birthDay: string;
  species: string;
  breed: string;
  gender: string;
  color: string;
  city: string;
  state: string;
  uf: string;
  isCastrated: boolean;
  isAdote: boolean;
  files: IFile[];
}

export type {
  IPet,
}