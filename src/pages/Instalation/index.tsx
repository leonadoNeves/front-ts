import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { useInstallation } from '@/hooks/useInstallation';
import { storageGetInstance } from '@/storage/storageInstance';
import { ContainerTable } from '@/style/globalStyle';
import { useEffect, useState } from 'react';
import { bCrumbView } from './bCumbs';
import { tableColumns } from './tableColumns';

export const InstallationPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const instance = storageGetInstance();
  const { installationsList, getAllInstallations } = useInstallation();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`}
        title="Cadastrar Instalação"
      />

      <ContainerTable>
        <TableModel
          tableColumns={tableColumns}
          data={installationsList}
          isPagination
        />
      </ContainerTable>
    </>
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      getAllInstallations();
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
