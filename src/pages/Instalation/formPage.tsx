import { ContainerPage } from '@/Container/Dashboard';
import { Loading } from '@/components/Loading';
import { Layout, Spin, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { bCrumbRegister } from './bCumbs';
import { FormRegister } from './components/FormRegister';

interface ICadInstalationPage {
  instalationId?: string;
}

export const CadInstalacaoPage = ({ instalationId }: ICadInstalationPage) => {
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister />
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
    <Spin
      tip="Carregando..."
      size="large"
      indicator={<Loading />}
      spinning={isLoading}
      style={{ marginTop: '10rem' }}
    >
      <Layout
        style={{
          display: 'flex',
          background: 'transparent',
        }}
      >
        <Tabs defaultActiveKey="1" items={tabs} />
      </Layout>
    </Spin>
  );

  return <ContainerPage children={PageContent} bCrumbArr={bCrumbRegister} />;
};
