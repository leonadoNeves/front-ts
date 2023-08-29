import { ContainerPage } from '@/Container/Dashboard';
import { FieldsDTO } from '@/dtos/FieldsDTO';
import { useCluster } from '@/hooks/useCluster';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbCreate, bCrumbUpdate } from './bCrumbs/formPageCrumb';
import { FormRegister } from './components/FormRegister';

const FormCluster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsDTO[]>([]);
  const [status, setStatus] = useState(true);

  const clusterId = useParams().id;
  const location = useLocation();

  const { checkPermissions } = usePermissions();
  const { getClusterById } = useCluster();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister
            clusterId={clusterId}
            fields={fields}
            status={status}
            setStatus={setStatus}
          />
        </Content>
      ),
    },
    {
      disabled: !clusterId,
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

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await getClusterById(clusterId as string);

      setFields([
        { name: ['name'], value: response?.name },
        { name: ['isActive'], value: response?.isActive },
        { name: ['description'], value: response?.description },
      ]);

      setStatus(response?.isActive);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPermissions(location);
  }, [location]);

  useEffect(() => {
    if (clusterId) {
      fetchAPI();
    }
  }, [clusterId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={clusterId ? bCrumbUpdate : bCrumbCreate}
      isLoading={isLoading}
    />
  );
};

export default FormCluster;
