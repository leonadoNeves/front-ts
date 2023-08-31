import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { useReservoir } from '@/hooks/useReservoir';
import { storageGetInstance } from '@/storage/storageInstance';
import { ContainerTable } from '@/style/globalStyle';
import { useEffect, useState } from 'react';
import { bCrumbView } from './bCrumbs';
import { tableColumns } from './tableColumns';

export const ReservoirPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const instance = storageGetInstance();
  const { getAllReservoir, reservoirList } = useReservoir();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadReservatorio`}
        title="Cadastrar Reservatório"
      />

      <ContainerTable>
        <TableModel
          tableColumns={tableColumns}
          data={reservoirList}
          isPagination
        />
      </ContainerTable>
    </>
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      getAllReservoir();
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
