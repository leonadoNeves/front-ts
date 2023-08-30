import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { useCluster } from '@/hooks/useCluster';
import { storageGetInstance } from '@/storage/storageInstance';
import { useEffect, useState } from 'react';
import bCrumb from './bCrumbs/listPageCrumb';
import { ContainerTable } from './styles';
import { tableColumnList } from './tableColumns';

const instanceName = storageGetInstance();

export function ClusterPage() {
  const [isLoading, setIsLoading] = useState(true);

  const { getAllCluster, clusterList } = useCluster();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instanceName}/cadastrosBasicos/cluster/cadCluster`}
        title="Cadastrar Cluster"
      />

      <ContainerTable>
        <TableModel
          tableColumns={tableColumnList}
          data={clusterList}
          isPagination
        />
      </ContainerTable>
    </>
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      getAllCluster();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumb}
      isLoading={isLoading}
    />
  );
}
