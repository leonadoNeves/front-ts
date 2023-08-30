import {
  CreateInstallationDTO,
  InstallationDTO,
  UpdateInstallationDTO,
} from '@/dtos/BasicRegistry/InstallationDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsInstallationContext = {
  getAllInstallations: () => Promise<void>;
  getInstallationById: (InstallationId: string) => Promise<any>;
  installationsList: InstallationDTO[];
  createInstallation: (
    installationData: CreateInstallationDTO,
  ) => Promise<void>;
  updateInstallation: (
    installationId: string,
    installationUpdatedData: UpdateInstallationDTO,
  ) => Promise<void> | AxiosError;
  disableInstallation: (installationId: string) => Promise<void>;
  enableInstallation: (installationId: string) => Promise<void>;
};

type PropsInstallationProvider = {
  children: ReactNode;
};

const InstallationContext = createContext<PropsInstallationContext>(
  {} as PropsInstallationContext,
);

const InstallationProvider = ({ children }: PropsInstallationProvider) => {
  const [installationsList, setInstallationsList] = useState<InstallationDTO[]>(
    [],
  );

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

  const createInstallation = async (
    installationData: CreateInstallationDTO,
  ) => {
    try {
      await api.post('/installations', installationData);
      toast.success('Instalação salva');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateInstallation = async (
    installationId: string,
    installationUpdatedData: UpdateInstallationDTO,
  ) => {
    try {
      await api.patch(
        `/installations/${installationId}`,
        installationUpdatedData,
      );
    } catch (error: any) {
      return error;
    }
  };

  const disableInstallation = async (installationId: string) => {
    try {
      await api.delete(`/installations/${installationId}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const enableInstallation = async (installationId: string) => {
    try {
      await api.patch(`/installations/${installationId}/restore`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <InstallationContext.Provider
      value={{
        getInstallationById,
        getAllInstallations,
        installationsList,
        updateInstallation,
        createInstallation,
        disableInstallation,
        enableInstallation,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export { InstallationContext, InstallationProvider };
