import { ContainerPage } from '@/Container/Dashboard';
import { HeaderBasicsRegister } from '@/components/HeaderBasicsRegister';
import TableModel from '@/components/Table';
import { storageGetInstance } from '@/storage/storageInstance';
import { useNavigate } from 'react-router-dom';
import { bCrumbView } from './bCumbs';
import { tableColumns } from './tableColumns';

export const InstalationPage = () => {
  const navigate = useNavigate();

  const instance = storageGetInstance();

  const handleRegisterPage = () => {
    navigate(`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`);
  };

  const PageContent = (
    <>
      <HeaderBasicsRegister
        href={`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`}
        onClick={handleRegisterPage}
      />
      <TableModel tableColumns={tableColumns} data={[]} isPagination />
    </>
  );

  return <ContainerPage children={PageContent} bCrumbArr={bCrumbView} />;
};
