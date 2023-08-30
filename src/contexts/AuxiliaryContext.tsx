import { AuxiliaryDTO } from '@/dtos/AuxiliaryDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { ReactNode, createContext, useState } from 'react';

type PropsAuxiliaryContext = {
  getAuxiliaryData: () => void;
  ufList: AuxiliaryDTO[];
  basinsList: AuxiliaryDTO[];
};

type PropsAuxiliaryProvider = {
  children: ReactNode;
};

const AuxiliaryContext = createContext<PropsAuxiliaryContext>(
  {} as PropsAuxiliaryContext,
);

const AuxiliaryProvider = ({ children }: PropsAuxiliaryProvider) => {
  const [ufList, setUfList] = useState<AuxiliaryDTO[]>([]);
  const [basinsList, setBasinsList] = useState<AuxiliaryDTO[]>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAuxiliaryData = async () => {
    try {
      const url = isBotafogoInstance
        ? `auxiliaries?instance=${selectedInstance}&table=fields&route=%2FcadastrosBasicos`
        : `auxiliaries?table=fields&route=%2FcadastrosBasicos`;

      const { data } = await api.get(url);

      setUfList(data.filter((d: AuxiliaryDTO) => d.select === 'UF'));
      setBasinsList(data.filter((d: AuxiliaryDTO) => d.select === 'Basin'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuxiliaryContext.Provider value={{ getAuxiliaryData, ufList, basinsList }}>
      {children}
    </AuxiliaryContext.Provider>
  );
};

export { AuxiliaryContext, AuxiliaryProvider };
