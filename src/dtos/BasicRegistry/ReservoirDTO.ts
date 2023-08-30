import { ZoneDTO } from "./ZoneDTO"

export interface ReservoirDTO {
  id: string,
  key?: string,
  name: string,
  description: string,
  user: any,
  zone: ZoneDTO,
  createdAt: string,
  updatedAt: string,
  isActive: boolean
}