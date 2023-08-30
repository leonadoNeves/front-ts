import { FieldDTO } from "./FieldDTO";

export interface ZoneDTO {
  id: string,
  key?: string,
  codZone: string,
  description: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
  field: FieldDTO,
  user: any,
}