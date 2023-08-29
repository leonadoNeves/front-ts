import { CompletionDTO } from "./CompletionDTO"
import { FieldDTO } from "./FieldDTO"

export interface WellDTO {
  id: string,
  key?: string,
  codWell: string,
  name: string,
  wellOperatorName: string,
  codWellAnp: string,
  categoryAnp: string,
  categoryReclassificationAnp: string,
  categoryOperator: string,
  statusOperator: boolean,
  type: string,
  waterDepth: number,
  artificialLift: string,
  latitude4C: string,
  longitude4C: string,
  latitudeDD: string,
  longitudeDD: string,
  datumHorizontal: string,
  typeBaseCoordinate: string,
  typeOperation: string,
  coordX: string,
  coordY: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
  field: FieldDTO,
  completions: CompletionDTO[]
  user: any
}