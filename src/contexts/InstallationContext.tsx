import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { ReactNode, createContext } from 'react';
import { toast } from 'react-toastify';

type PropsInstallationContext = {
  getInstallationById: (InstallationId: string) => Promise<any>;
};

type PropsInstallationProvider = {
  children: ReactNode;
};

const InstallationContext = createContext<PropsInstallationContext>(
  {} as PropsInstallationContext,
);

const InstallationProvider = ({ children }: PropsInstallationProvider) => {
  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getInstallationById = async (InstallationId: string) => {
    try {
      const { data } = await api.get(
        isBotafogoInstance
          ? `installations/${InstallationId}?instance=${selectedInstance}`
          : `installations/${InstallationId}`,
      );

      return data;
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar as instalações');
    }
  };

  return (
    <InstallationContext.Provider value={{ getInstallationById }}>
      {children}
    </InstallationContext.Provider>
  );
};

export { InstallationContext, InstallationProvider };
