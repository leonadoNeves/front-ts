export interface CompletionDTO {
  id: string
  key?: string,
  name: string
  description: string
  codCompletion: string
  topOfPerforated: number
  baseOfPerforated: number
  createdAt: Date
  updatedAt: Date
  reservoir: any
}