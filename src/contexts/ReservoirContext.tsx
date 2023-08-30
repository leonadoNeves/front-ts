import {
  CreateReservoirDTO,
  ReservoirDTO,
} from '@/dtos/BasicRegistry/ReservoirDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsReservoirContext = {
  reservoirList: ReservoirDTO[];
  getAllReservoir: () => Promise<void>;
  createReservoir: (reservoirData: CreateReservoirDTO) => Promise<void>;
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

  const createReservoir = async (reservoirData: CreateReservoirDTO) => {
    try {
      await api.post('/reservoirs', reservoirData);
      toast.success('Reservatório salvo');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <ReservoirContext.Provider
      value={{ reservoirList, getAllReservoir, createReservoir }}
    >
      {children}
    </ReservoirContext.Provider>
  );
};

export { ReservoirContext, ReservoirProvider };
