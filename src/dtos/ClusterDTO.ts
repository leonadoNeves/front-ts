import { UserDTO } from './UserDTO';

export interface ClusterDTO {
  id: string;
  name: string;
  createdAt: string;
  description: null | string;
  isActive: boolean;
  user: UserDTO;
}

export interface CreateClusterDTO {
  name: string;
  isActive: true;
  description: string;
}
