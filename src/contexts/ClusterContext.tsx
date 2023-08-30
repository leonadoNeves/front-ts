import {
  ClusterDTO,
  CreateClusterDTO,
  UpdateClusterDTO,
} from '@/dtos/BasicRegistry/ClusterDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { AxiosError } from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

interface PropsClusterContext {
  getAllCluster: () => Promise<void>;
  getClusterById: (clusterId: string) => Promise<ClusterDTO>;
  createCluster: (clusterData: CreateClusterDTO) => Promise<void>;
  clusterList: ClusterDTO[];
  updateCluster: (
    clusterId: string,
    clusterUpdatedData: UpdateClusterDTO,
  ) => Promise<void> | AxiosError;
  disableCluster: (clusterId: string) => Promise<void>;
  enableCluster: (clusterId: string) => Promise<void>;
}

type PropsInstanceProvider = {
  children: React.ReactNode;
};

const ClusterContext = createContext<PropsClusterContext>(
  {} as PropsClusterContext,
);

const ClusterProvider = ({ children }: PropsInstanceProvider) => {
  const [clusterList, setClusterList] = useState<ClusterDTO[]>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAllCluster = async () => {
    try {
      const url = isBotafogoInstance
        ? `/clusters?instance=${selectedInstance}`
        : '/clusters';

      const { data } = await api.get(url);

      const objKey = data.map((obj: ClusterDTO) => {
        return {
          ...obj,
          key: uuid(),
        };
      });

      setClusterList(objKey);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar os clusters');
    }
  };

  const getClusterById = async (clusterId: string) => {
    try {
      const { data } = await api.get(
        isBotafogoInstance
          ? `/clusters/${clusterId}?instance=${selectedInstance}`
          : `/clusters/${clusterId}`,
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar o cluster');
    }
  };

  const createCluster = async (clusterData: CreateClusterDTO) => {
    try {
      await api.post('/clusters', clusterData);
      toast.success('Cluster salvo');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateCluster = async (
    clusterId: string,
    clusterUpdatedData: UpdateClusterDTO,
  ) => {
    try {
      await api.patch(`/clusters/${clusterId}`, clusterUpdatedData);
    } catch (error: any) {
      return error;
    }
  };

  const disableCluster = async (clusterId: string) => {
    try {
      await api.delete(`/clusters/${clusterId}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const enableCluster = async (clusterId: string) => {
    try {
      await api.patch(`/clusters/${clusterId}/restore`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ClusterContext.Provider
      value={{
        getAllCluster,
        getClusterById,
        createCluster,
        clusterList,
        updateCluster,
        disableCluster,
        enableCluster,
      }}
    >
      {children}
    </ClusterContext.Provider>
  );
};

export { ClusterContext, ClusterProvider };
