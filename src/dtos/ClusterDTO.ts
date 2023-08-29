import { UserDTO } from './UserDTO';

export interface ClusterDTO {
  key?: string;
  id: string;
  name: string;
  createdAt: string;
  description: null | string;
  isActive: boolean;
  user: UserDTO;
}

export interface UpdateClusterDTO {
  name: string;
  description: string;
}

export interface CreateClusterDTO {
  name: string;
  isActive: boolean;
  description: string | null;
}
