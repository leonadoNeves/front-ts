import { InstallationDTO } from './InstallationDTO';
import { UserDTO } from './UserDTO';

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

export interface FieldDTO {
  id: string;
  name: string;
  basin: string | null;
  codField: string;
  description: string | null;
  installation: InstallationDTO;
  isActive: boolean;
  location: string | null;
  state: string | null;
  user: UserDTO;
  wells: any[];
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
