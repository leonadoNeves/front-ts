import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { storageGetInstance } from '@/storage/storageInstance';
import { useState } from 'react';
import { bCrumbView } from './bCumbs';
import { tableColumns } from './tableColumns';

export const InstallationPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const instance = storageGetInstance();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`}
        title="Cadastrar Instalação"
      />
      <TableModel tableColumns={tableColumns} data={[]} isPagination />
    </>
  );

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumbView}
      isLoading={isLoading}
    />
  );
};
