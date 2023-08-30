import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { useField } from '@/hooks/useField';
import { storageGetInstance } from '@/storage/storageInstance';
import { useEffect, useState } from 'react';
import { bCrumbView } from './bCrumbs';
import { ContainerTable } from './styles';
import { tableColumns } from './tableColumns';

export const FieldPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const instance = storageGetInstance();
  const { getAllFields, fieldsList } = useField();

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadCampo`}
        title="Cadastrar Campo"
      />

      <ContainerTable>
        <TableModel
          tableColumns={tableColumns}
          data={fieldsList}
          isPagination
        />
      </ContainerTable>
    </>
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      getAllFields();
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
