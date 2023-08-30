import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { ContainerTable } from '@/globals/ContainerTable';
import { useZone } from '@/hooks/useZone';
import { storageGetInstance } from '@/storage/storageInstance';
import { useEffect, useState } from 'react';
import { bCrumbView } from './bCrumbs';
import { tableColumns } from './tableColumns';

export const ZonePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const instance = storageGetInstance();
  const { getAllZones, zoneList } = useZone();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadZona`}
        title="Cadastrar Zona"
      />

      <ContainerTable>
        <TableModel tableColumns={tableColumns} data={zoneList} isPagination />
      </ContainerTable>
    </>
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      getAllZones();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumbView}
      isLoading={isLoading}
    />
  );
};
