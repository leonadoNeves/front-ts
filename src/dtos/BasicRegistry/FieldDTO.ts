import { InstallationDTO } from './InstallationDTO';
import { WellDTO } from './WellDTO';

export interface FieldDTO {
  id: string;
  key?: string;
  name: string;
  description: string;
  codField: string;
  basin: string;
  state: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  user: any;
  installation: InstallationDTO;
  well: WellDTO[];
}

export interface CreateFieldsDTO {
  name: string;
  codField: string;
  basin: string;
  state: string;
  location: string;
  description: string;
  isActive: boolean;
  installationId: string;
}

export interface UpdateFieldDTO {
  name: string;
  codField: string;
  basin: string;
  state: string;
  location: string;
  description: string;
  installationId: string;
}
