import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ContainerPage } from '@/Container/Dashboard';
import { bCrumbCreate, bCrumbUpdate } from './bCrumbs/formPageCrumb';
import { Layout, Tabs } from 'antd';
import FormClusterComponent from './components/formCluster';
import { Content } from 'antd/es/layout/layout';
import { usePermissions } from '@/hooks/usePermissions';

interface iClusterForm {
  instalationId: string;
}

const FormCluster = ({ instalationId }: iClusterForm) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const idToken = useParams().id;

  const location = useLocation();
  const { checkPermissions } = usePermissions();

  useEffect(() => {
    checkPermissions(location);
  }, [location]);

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content style={{ width: '100%' }}>
          <FormClusterComponent />
        </Content>
      ),
    },
    {
      disabled: !instalationId,
      key: '2',
      label: 'HISTÓRICO',
      children: <Content></Content>,
    },
  ];

  const PageContent = (
    <Layout
      style={{
        display: 'flex',
        background: 'transparent',
      }}
    >
      <Tabs defaultActiveKey="1" items={tabs} />
    </Layout>
  );

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={idToken ? bCrumbUpdate : bCrumbCreate}
      isLoading={isLoading}
    />
  );
};

export default FormCluster;
