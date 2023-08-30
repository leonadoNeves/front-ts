import { InstallationDTO } from "./InstallationDTO";
import { WellDTO } from "./WellDTO";

export interface FieldDTO {
  id: string,
  key?: string,
  name: string,
  description: string,
  codField: string,
  basin: string,
  state: string,
  location: string,
  createdAt: string,
  updatedAt: string,
  user: any,
  installation: InstallationDTO,
  well: WellDTO[]
}