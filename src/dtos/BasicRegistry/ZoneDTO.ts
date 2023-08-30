import { UserDTO } from '../UserDTO';
import { FieldDTO } from './FieldDTO';

export interface ZoneDTO {
  id: string;
  key?: string;
  codZone: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  field: FieldDTO;
  user: UserDTO;
}

export interface CreateZoneDTO {
  codZone: string;
  fieldId: string;
  description: string;
  isActive: boolean;
}

export interface UpdateZoneDTO {
  codZone: string;
  fieldId: string;
  description: string;
}
