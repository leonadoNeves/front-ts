interface IHistoryData {
  [key: string]: any,

  // General
  name: string,
  description: string,
  type?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  installationId: string,
  fieldId?: string,

  completionId?: string,
  pointMeasuringId?: string,

  // Installation
  clusterId?: string,
  codInstallationAnp?: string,
  uepCode?: string,
  uepName?: string,
  gasSafetyBurnVolume?: number,

  // Field
  codField?: string,
  location?: string,
  state?: string,
  basin?: string,

  // Zone
  codZone?: string,

  // Reservoir
  zoneId?: string,
  codReservoir?: string,

  // Well
  codWell?: string,
  wellOperatorName?: string,
  codWellAnp?: string,
  categoryAnp?: string,
  categoryReclassificationAnp?: string,
  categoryOperator?: string,
  statusOperator?: boolean,
  waterDepth?: number,
  artificialLift?: string,
  latitude4C?: string,
  longitude4C?: string,
  latitudeDD?: string,
  longitudeDD?: string,
  datumHorizontal?: string,
  typeBaseCoordinate?: string,
  typeOperation?: string,
  coordX?: string,
  coordY?: string,

  // Completion
  topOfPerforated?: number,
  baseOfPerforated?: number,
  allocationReservoir?: number,
  wellId?: string,
  reservoirId?: string,

  // Measurement Point
  tagPointMeasuring: string,

  // Measurement Equipment
  tagEquipment?: string,
  tagMeasuringPoint?: string,
  serieNumber?: string,
  typeEquipment?: string,
  model?: string,
  hasSeal?: boolean,
  mVS?: boolean,
  communicationProtocol?: string,
  typePoint?: string,
  channelNumber?: string,
  inOperation?: boolean,
  fluid?: string,
}

export interface HistoryDTO {
  id: string,
  currentData: IHistoryData,
  fieldsChanged: IHistoryData,
  previousData: IHistoryData,
  table: string,
  tableItemId: string,
  typeOperation: string,
  createdAt: Date,
  cratedBy: string,
  updatedBy: string
}