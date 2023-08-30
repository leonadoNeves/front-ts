import { UserDTO } from '../UserDTO';
import { ZoneDTO } from './ZoneDTO';

export interface ReservoirDTO {
  id: string;
  key?: string;
  name: string;
  description: string;
  user: UserDTO;
  zone: ZoneDTO;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateReservoirDTO {
  name: string;
  description: string;
  zoneId: string;
  isActive: boolean;
}
