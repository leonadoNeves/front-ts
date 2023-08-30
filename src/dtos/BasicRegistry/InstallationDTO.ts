import { ClusterDTO } from "./ClusterDTO"

export interface InstallationDTO {
  id: string,
  key?: string,
  name: string,
  uepCod: string,
  uepName: string,
  codInstallationAnp: string,
  gasSafetyBurnVolume: number,
  description: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
  user: any,
  cluster: ClusterDTO,
}