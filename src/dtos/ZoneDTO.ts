import { FieldDTO } from './FieldsDTO';
import { UserDTO } from './UserDTO';

export interface ZoneDTO {
  id: string;
  codZone: string;
  description: string | null;
  field: FieldDTO;
  isActive: boolean;
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
