import { ClusterDTO } from './ClusterDTO';
import { UserDTO } from './UserDTO';

export interface InstallationDTO {
  id: string;
  codInstallationAnp: string;
  createdAt: Date;
  description: string | null;
  gasSafetyBurnVolume: number | null;
  isActive: boolean;
  name: string;
  uepCod: string;
  uepName: string;
  updatedAt: Date;
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
