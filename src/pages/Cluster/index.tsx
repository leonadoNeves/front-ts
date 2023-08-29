import { ContainerPage } from '@/Container/Dashboard';
import { Button } from '@/components/Button';
import TableModel from '@/components/Table';
import { useInstance } from '@/hooks/useInstance';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import bCrumb from './bCrumbs/listPageCrumb';
import { ContainerButton } from './styles';
import { tableColumnList } from './tableColumns';

export function ClusterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { isBotafogoInstance } = useInstance();

  const PageContent = (
    <>
      <ContainerButton>
        <Link to="cadCluster">
          {!isBotafogoInstance && (
            <Button
              type="primary"
              icon="Plus"
              toolTipMessage="Cadastrar Cluster"
            />
          )}
        </Link>
      </ContainerButton>

      <div style={{ marginBottom: '20px' }}>
        <TableModel
          tableColumns={tableColumnList}
          data={[
            {
              key: 1,
              isActive: true,
              name: 'Bravo',
              description: 'Descrição',
            },
          ]}
          isPagination={true}
        />
      </div>
    </>
  );

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumb}
      isLoading={isLoading}
    />
  );
}
