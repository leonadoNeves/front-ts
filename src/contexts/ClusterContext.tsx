import { ClusterDTO, CreateClusterDTO } from '@/dtos/ClusterDTO';
import { api } from '@/service/api';
import React, { createContext, useState } from 'react';

interface PropsClusterContext {
  GetCluster(): void;
  GetClusterById(clusterId: string): void;
  CreateCluster(clusterData: CreateClusterDTO): void;
  clusterList: ClusterDTO[];
  clusterSelected: ClusterDTO | undefined;
  isLoading: boolean;
}

type PropsInstanceProvider = {
  children: React.ReactNode;
};

const clusterContext = createContext({} as PropsClusterContext);

const ClusterProvider = ({ children }: PropsInstanceProvider) => {
  const [clusterList, setClusterList] = useState<ClusterDTO[]>([]);
  const [clusterSelected, setClusterSelected] = useState<
    undefined | ClusterDTO
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const GetCluster = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/clusters');
      setClusterList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const GetClusterById = async (clusterId: string) => {
    console.log(clusterId);
  };

  const CreateCluster = async (clusterData: CreateClusterDTO) => {
    console.log(clusterData);
  };

  return (
    <clusterContext.Provider
      value={{
        GetCluster,
        GetClusterById,
        CreateCluster,
        clusterList,
        clusterSelected,
        isLoading,
      }}
    >
      {children}
    </clusterContext.Provider>
  );
};

export { clusterContext, ClusterProvider };
