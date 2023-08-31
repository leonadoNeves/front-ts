import {
  CreateReservoirDTO,
  ReservoirDTO,
  UpdateReservoirDTO,
} from '@/dtos/BasicRegistry/ReservoirDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsReservoirContext = {
  reservoirList: ReservoirDTO[];
  getAllReservoir: () => Promise<void>;
  createReservoir: (reservoirData: CreateReservoirDTO) => Promise<void>;
  getReservoirById: (reservoirId: string) => Promise<ReservoirDTO>;
  updateReservoir: (
    reservoirId: string,
    reservoirUpdatedData: UpdateReservoirDTO,
  ) => Promise<void> | AxiosError;
  disableReservoir: (reservoirId: string) => Promise<void> | AxiosError;
  enableReservoir: (reservoirId: string) => Promise<void> | AxiosError;
};

type PropsReservoirProvider = {
  children: ReactNode;
};

const ReservoirContext = createContext<PropsReservoirContext>(
  {} as PropsReservoirContext,
);

const ReservoirProvider = ({ children }: PropsReservoirProvider) => {
  const [reservoirList, setReservoirList] = useState<ReservoirDTO[]>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAllReservoir = async () => {
    const url = isBotafogoInstance
      ? `reservoirs?instance=${selectedInstance}`
      : `reservoirs`;

    try {
      const { data } = await api.get(url);
      setReservoirList(data);
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar os reservatórios');
    }
  };

  const getReservoirById = async (reservoirId: string) => {
    try {
      const url = isBotafogoInstance
        ? `reservoirs/${reservoirId}?instance=${selectedInstance}`
        : `reservoirs/${reservoirId}`;

      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar o reservatório');
    }
  };

  const createReservoir = async (reservoirData: CreateReservoirDTO) => {
    try {
      await api.post('/reservoirs', reservoirData);
      toast.success('Reservatório salvo');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateReservoir = async (
    reservoirId: string,
    reservoirUpdatedData: UpdateReservoirDTO,
  ) => {
    try {
      await api.patch(`/reservoirs/${reservoirId}`, reservoirUpdatedData);
    } catch (error: any) {
      return error;
    }
  };

  const disableReservoir = async (reservoirId: string) => {
    try {
      await api.delete(`/reservoirs/${reservoirId}`);
    } catch (error: any) {
      return error;
    }
  };

  const enableReservoir = async (reservoirId: string) => {
    try {
      await api.patch(`/reservoirs/${reservoirId}/restore`);
    } catch (error: any) {
      return error;
    }
  };

  return (
    <ReservoirContext.Provider
      value={{
        reservoirList,
        getAllReservoir,
        createReservoir,
        getReservoirById,
        updateReservoir,
        disableReservoir,
        enableReservoir,
      }}
    >
      {children}
    </ReservoirContext.Provider>
  );
};

export { ReservoirContext, ReservoirProvider };
