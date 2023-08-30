import { ContainerPage } from '@/Container/Dashboard';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbRegister, bCrumbUpdate } from './bCrumbs';
import { FormRegister } from './components/FormRegister';

export const CadReservoirPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsFormDTO[]>([]);
  const [status, setStatus] = useState(true);

  const location = useLocation();
  const reservoirId = useParams().id;

  const { selectedInstance } = useInstance();
  const { checkPermissions } = usePermissions();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister
            reservoirId={reservoirId}
            fields={fields}
            setFields={setFields}
            status={status}
            setStatus={setStatus}
          />
        </Content>
      ),
    },
    {
      disabled: !reservoirId,
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
      bCrumbArr={reservoirId ? bCrumbUpdate : bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
