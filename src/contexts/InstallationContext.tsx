import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsInstallationContext = {
  getAllInstallations: () => Promise<void>;
  getInstallationById: (InstallationId: string) => Promise<any>;
  installationsList: any;
};

type PropsInstallationProvider = {
  children: ReactNode;
};

const InstallationContext = createContext<PropsInstallationContext>(
  {} as PropsInstallationContext,
);

const InstallationProvider = ({ children }: PropsInstallationProvider) => {
  const [installationsList, setInstallationsList] = useState<any>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAllInstallations = async () => {
    const url = isBotafogoInstance
      ? `installations?instance=${selectedInstance}`
      : `installations`;

    try {
      const { data } = await api.get(url);
      setInstallationsList(data);
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar as instalações');
    }
  };

  const getInstallationById = async (InstallationId: string) => {
    try {
      const url = isBotafogoInstance
        ? `installations/${InstallationId}?instance=${selectedInstance}`
        : `installations/${InstallationId}`;

      const { data } = await api.get(url);

      return data;
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar as instalações');
    }
  };

  return (
    <InstallationContext.Provider
      value={{ getInstallationById, getAllInstallations, installationsList }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export { InstallationContext, InstallationProvider };
