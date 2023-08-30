import {
  CreateZoneDTO,
  UpdateZoneDTO,
  ZoneDTO,
} from '@/dtos/BasicRegistry/ZoneDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsZoneContext = {
  getAllZones: () => Promise<void>;
  zoneList: ZoneDTO[];
  createZone: (dataZone: CreateZoneDTO) => Promise<void>;
  getZoneById: (zoneId: string) => Promise<ZoneDTO>;
  updateZone: (
    zoneId: string,
    ZoneUpdatedData: UpdateZoneDTO,
  ) => Promise<void> | AxiosError;
  disableZone: (zoneId: string) => Promise<void> | AxiosError;
  enableZone: (zoneId: string) => Promise<void> | AxiosError;
};

type PropsZoneProvider = {
  children: ReactNode;
};

const ZoneContext = createContext<PropsZoneContext>({} as PropsZoneContext);

const ZoneProvider = ({ children }: PropsZoneProvider) => {
  const [zoneList, setZoneList] = useState<ZoneDTO[]>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAllZones = async () => {
    const url = isBotafogoInstance
      ? `zones?instance=${selectedInstance}`
      : `zones`;

    try {
      const { data } = await api.get(url);
      setZoneList(data);
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar as zonas');
    }
  };

  const getZoneById = async (zoneId: string) => {
    try {
      const url = isBotafogoInstance
        ? `zones/${zoneId}?instance=${selectedInstance}`
        : `zones/${zoneId}`;

      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar a zona');
    }
  };

  const createZone = async (dataZone: CreateZoneDTO) => {
    try {
      await api.post('/zones', dataZone);
      toast.success('Zona salva');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateZone = async (zoneId: string, ZoneUpdatedData: UpdateZoneDTO) => {
    try {
      await api.patch(`/zones/${zoneId}`, ZoneUpdatedData);
    } catch (error: any) {
      return error;
    }
  };

  const disableZone = async (zoneId: string) => {
    try {
      await api.delete(`/zones/${zoneId}`);
    } catch (error: any) {
      return error;
    }
  };

  const enableZone = async (zoneId: string) => {
    try {
      await api.patch(`/zones/${zoneId}/restore`);
    } catch (error: any) {
      return error;
    }
  };

  return (
    <ZoneContext.Provider
      value={{
        getAllZones,
        zoneList,
        createZone,
        getZoneById,
        updateZone,
        disableZone,
        enableZone,
      }}
    >
      {children}
    </ZoneContext.Provider>
  );
};

export { ZoneContext, ZoneProvider };
