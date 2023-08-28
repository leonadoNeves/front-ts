import { ContainerPage } from '@/Container/Dashboard';
import { Button } from '@/components/Button';
import TableModel from '@/components/Table';
import { useInstance } from '@/hooks/useInstance';
import { storageGetInstance } from '@/storage/storageInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from './styles';

export const InstalationPage = () => {
  const navigate = useNavigate();
  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const handleRegisterPage = () => {
    navigate(`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`);
  };

  const PageContent = (
    <Container>
      <div className="containerBtn">
        <Link to={`/dashboard/${instance}/cadastrosBasicos/cadInstalacao`}>
          {!isBotafogoInstance && (
            <Button type="primary" icon="Plus" onClick={handleRegisterPage} />
          )}
        </Link>
      </div>

      <TableModel tableColumns={[]} data={[]} />
    </Container>
  );

  return <ContainerPage children={PageContent} bCrumbArr={[]} />;
};
