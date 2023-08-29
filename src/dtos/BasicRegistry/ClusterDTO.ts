export interface ClusterDTO {
  id: string,
  key?: string,
  name: string,
  description: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  user: any
}