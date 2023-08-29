import { ReactNode, createContext } from "react";
import { HistoryDTO } from "@/dtos/HistoryDTO";
import { ClusterDTO } from "@/dtos/BasicRegistry/ClusterDTO";
import { InstallationDTO } from "@/dtos/BasicRegistry/InstallationDTO";
import { FieldDTO } from "@/dtos/BasicRegistry/FieldDTO";
import { ZoneDTO } from "@/dtos/BasicRegistry/ZoneDTO";
import { WellDTO } from "@/dtos/BasicRegistry/WellDTO";
import { ReservoirDTO } from "@/dtos/BasicRegistry/ReservoirDTO";
import { UserDTO } from "@/dtos/UserDTO";

interface IHistoryContext {
  processHistoryData: (data: IProcessHistoryData) => any
}

type PropsHistoryProvider = {
  children: ReactNode;
};

interface IProcessHistoryData {
  historyData: HistoryDTO[],
  users: UserDTO[],
  historyKeys: string[],
  clusters: ClusterDTO[],
  installations: InstallationDTO[],
  fields: FieldDTO[],
  zones: ZoneDTO[],
  wells: WellDTO[],
  reservoirs: ReservoirDTO[],
}

export const historyContext = createContext<IHistoryContext>({} as IHistoryContext)

const HistoryProvider = ({ children }: PropsHistoryProvider) => {
  const formatCamelCase = (keys: string[]) => {
    return keys.map(key => (
      key.charAt(0).toLowerCase() + key.slice(1)
    ))
  }

  function processHistoryData({
    historyData, users, historyKeys,
    clusters,
    installations,
    fields,
    zones,
    wells,
    reservoirs,
  }: IProcessHistoryData) {
    try {
      const transformedHistoryData: any[] = [];

      historyData && historyData.forEach(item => {
        const fieldsChanged = item.fieldsChanged ? item.fieldsChanged : null;
        const currentData = item.currentData;

        const userData = users.find(u => u.id === item.updatedBy);

        const clusterData = clusters && clusters.find(c => c.id === currentData.clusterId)
        const previousClusterData = item.previousData && clusters && clusters.find(c => c.id === item.previousData.clusterId)

        const installationData = installations && installations.find(i => i.id === currentData.installationId)
        const previousInstallationData = item.previousData && installations && installations.find(i => i.id === item.previousData.installationId);

        const fieldData = fields && fields.find(f => f.id === currentData.fieldId);
        const previousFieldData = item.previousData && fields && fields.find(f => f.id === item.previousData.fieldId)

        const zoneData = zones && zones.find(z => z.id === currentData.zoneId)
        const previousZoneData = item.previousData && zones && zones.find(z => z.id === item.previousData.zoneId)

        const wellData = wells && wells.find(w => w.id === currentData.wellId)
        const previousWellData = item.previousData && wells && wells.find(f => f.id === item.previousData.wellId)

        const reservoirData = reservoirs && reservoirs.find(z => z.id === currentData.reservoirId)
        const previousReservoirData = item.previousData && reservoirs && reservoirs.find(f => f.id === item.previousData.reservoirId)

        if (fieldsChanged) {
          const keys = Object.keys(fieldsChanged);

          const camelCasedKeys = formatCamelCase(keys)

          const filteredKeys = camelCasedKeys.filter(k => historyKeys.includes(k))

          filteredKeys.forEach((key) => {
            let previousData = item.previousData[key];
            let changedValue = currentData[key]

            if (key === "clusterId") {
              changedValue = clusterData ? clusterData.name : ""
              previousData = previousClusterData ? previousClusterData.name : ""
            }

            if (key === "installationId") {
              changedValue = installationData ? installationData.name : ""
              previousData = previousInstallationData ? previousInstallationData.name : ""
            }

            if (key === "fieldId") {
              changedValue = fieldData ? fieldData.name : ""
              previousData = previousFieldData ? previousFieldData.name : ""
            }

            if (key === "zoneId") {
              changedValue = zoneData ? zoneData.codZone : ""
              previousData = previousZoneData ? previousZoneData.codZone : ""
            }

            if (key === "wellId") {
              changedValue = wellData !== undefined ? wellData.name : ""
              previousData = previousWellData !== undefined ? previousWellData.name : ""
            }

            if (key === "reservoirId") {
              changedValue = reservoirData !== undefined ? reservoirData.name : ""
              previousData = previousReservoirData !== undefined ? previousReservoirData.name : ""
            }

            if (key === "statusOperator") {
              changedValue = changedValue ? "Ativo" : "Inativo"
              previousData = previousData ? "Ativo" : "Inativo"
            }

            if (key === "isActive") {
              changedValue = changedValue ? "Ativo" : "Inativo"
              previousData = previousData ? "Ativo" : "Inativo"
            }

            const transformedHistoryItem = {
              changedField: key,
              previousData: previousData,
              changedValue: changedValue,
              updatedBy: userData ? userData.name : "",
              createdAt: new Date(item.createdAt).toLocaleString()
            };

            transformedHistoryData.push(transformedHistoryItem);
          })

        } else {
          const keys = Object.keys(currentData);

          const filteredKeys = keys.filter(k => historyKeys.includes(k))

          for (const key of filteredKeys) {
            let changedValue = currentData[key]

            if (key === "clusterId")
              changedValue = clusterData ? clusterData.name : ""

            if (key === "installationId")
              changedValue = installationData ? installationData.name : ""

            if (key === "fieldId")
              changedValue = fieldData ? fieldData.name : ""

            if (key === "zoneId")
              changedValue = zoneData ? zoneData.codZone : ""

            if (key === "wellId")
              changedValue = wellData !== undefined ? wellData.name : ""

            if (key === "reservoirId")
              changedValue = reservoirData !== undefined ? reservoirData.name : ""

            if (key === "statusOperator")
              changedValue = changedValue ? "Ativo" : "Inativo"

            if (key === "isActive")
              changedValue = changedValue ? "Ativo" : "Inativo"

            const transformedHistoryItem = {
              changedField: key,
              previousData: "",
              changedValue: changedValue,
              updatedBy: userData ? userData.name : "",
              createdAt: new Date(item.createdAt).toLocaleString()
            };

            transformedHistoryData.push(transformedHistoryItem);
          }
        }
      })

      const historyDataWithKey = transformedHistoryData.map((d, index) => {
        return ({ ...d, key: index })
      })

      return historyDataWithKey

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <historyContext.Provider value={{
      processHistoryData
    }}>
      {children}
    </historyContext.Provider>
  )
}

export default HistoryProvider