interface IFile {
  externalId: string;
  createdAt: string;
  updatedAt: string;
  path: string;
  mimeType: string;
  size: number;
  extension: string;
  type: string;         
  description: string;
  orderIndex: number;
}

export type {
  IFile,
}