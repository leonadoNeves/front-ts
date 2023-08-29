import { ContainerPage } from '@/Container/Dashboard';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bCrumbRegister } from './bCumbs';
import { FormRegister } from './components/FormRegister';

export const CadInstalacaoPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { checkPermissions } = usePermissions();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content style={{ width: '100%' }}>
          <FormRegister />
        </Content>
      ),
    },
    {
      disabled: true,
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

  useEffect(() => {
    checkPermissions(location);
  }, [location]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
