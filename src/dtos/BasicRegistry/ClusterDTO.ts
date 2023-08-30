import { UserDTO } from '../UserDTO';

export interface ClusterDTO {
  id: string;
  key?: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
