import { UserDTO } from '../UserDTO';
import { ClusterDTO } from './ClusterDTO';

export interface InstallationDTO {
  id: string;
  key?: string;
  name: string;
  uepCod: string;
  uepName: string;
  codInstallationAnp: string;
  gasSafetyBurnVolume: number;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserDTO;
  cluster: ClusterDTO;
}

export interface CreateInstallationDTO {
  name: string;
  clusterId: string;
  uepCod: string;
  uepName: string;
  codInstallationAnp: string;
  gasSafetyBurnVolume: number | null;
  description: string | null;
  isActive: boolean;
}

export interface UpdateInstallationDTO {
  name: string;
  clusterId: string;
  uepCod: string;
  uepName: string;
  codInstallationAnp: string;
  gasSafetyBurnVolume: number | null;
  description: string | null;
}
