import { v4 as uuid } from 'uuid';
import { ContainerPage } from '@/Container/Dashboard';
import TableModel from '@/components/Table';
import { storageGetInstance } from '@/storage/storageInstance';
import { ContainerPageCluster, ContainerTable } from './styles';
import { tableColumnList } from './tableColumns';
import bCrumb from './bCrumbs/listPageCrumb';
import { useState, useEffect } from 'react';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import { useCluster } from '@/hooks/useCluster';

const instanceName = storageGetInstance();

export function ClusterPage() {
  const { GetCluster, clusterList } = useCluster();

  useEffect(() => {
    const abortEarly = new AbortController();

    GetCluster();

    return () => {
      abortEarly.abort();
    };
  }, []);

  const PageContent = (
    <>
      <ContainerPageCluster>
        <HeaderBasicsRegister
          href={`/dashboard/${instanceName}/cadastrosBasicos/cluster/cadCluster`}
        />

        <ContainerTable>
          <TableModel
            tableColumns={tableColumnList}
            data={clusterList}
            isPagination={true}
          />
        </ContainerTable>
      </ContainerPageCluster>
    </>
  );

  return <ContainerPage children={PageContent} bCrumbArr={bCrumb} />;
}
