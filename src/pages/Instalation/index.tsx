import { ContainerPage } from '@/Container/Dashboard';
import { Button } from '@/components/Button';
import TableModel from '@/components/Table';
import { useInstance } from '@/hooks/useInstance';
import { storageGetInstance } from '@/storage/storageInstance';
import { Link, useNavigate } from 'react-router-dom';
import { bCrumbView } from './bCumbs';
import { ContainerButton } from './styles';
import { tableColumns } from './tableColumns';

export const InstalationPage = () => {
  const navigate = useNavigate();

  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const handleRegisterPage = () => {
    navigate(`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`);
  };

  const PageContent = (
    <>
      <ContainerButton>
        <Link to={`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`}>
          {!isBotafogoInstance && (
            <Button type="primary" icon="Plus" onClick={handleRegisterPage} />
          )}
        </Link>
      </ContainerButton>

      <TableModel tableColumns={tableColumns} data={[]} />
    </>
  );

  return <ContainerPage children={PageContent} bCrumbArr={bCrumbView} />;
};
