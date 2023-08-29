import { FieldDTO } from "./FieldDTO";

export interface ZoneDTO {
  id: string,
  key?: string,
  codZone: string,
  description: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  field: FieldDTO,
  user: any,
}