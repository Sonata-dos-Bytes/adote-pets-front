import type { IAdoptionRequest } from "./IAdoption";

export interface IPet {
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
  files: IPetFile[];
  id?: number;
  location?: string;
  age?: string;
  description?: string;
  image?: string;
}

export interface IPetWithRequests {
  pet: IPet;
  requests: IAdoptionRequest[];
}

export interface IPetFile {
  externalId: string;
  path: string;
  mimeType: string;
  type: string;
  orderIndex: number;
}
