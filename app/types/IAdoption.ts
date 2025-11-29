import type { IPet } from './IPet';
import type { IUser } from './IUser';

export interface IAdoptionRequest {
  externalId: string;
  createdAt: string;
  updatedAt: string;
  reason: string;
  pet: IPet;
  user: IUser;
}
