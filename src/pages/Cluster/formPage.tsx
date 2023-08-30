import { ContainerPage } from '@/Container/Dashboard';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useCluster } from '@/hooks/useCluster';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbCreate, bCrumbUpdate } from './bCrumbs/formPageCrumb';
import { FormRegister } from './components/FormRegister';
import TableModel from '@/components/Table';
import { useHistory } from '@/hooks/useHistory';
import { historyTableColumns } from './tableColumns';
import { IHistoryData } from '@/contexts/HistoryContext';

const FormCluster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsFormDTO[]>([]);
  const [status, setStatus] = useState(true);
  const [historyData, setHistoryData] = useState<IHistoryData[] | undefined>([])

  const clusterId = useParams().id;
  const location = useLocation();

  const { selectedInstance } = useInstance();
  const { checkPermissions } = usePermissions();
  const { getClusterById } = useCluster();
  const { getHistory } = useHistory();

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
      children: (
        <Content>
          <TableModel data={historyData ? historyData : []} tableColumns={historyTableColumns} isPagination={true} />
        </Content>
      ),
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
    if (selectedInstance.toLowerCase() === 'consolidador') {
      const cluster = location.state.selectedCluster;

      setFields([
        { name: ['name'], value: cluster?.name },
        { name: ['isActive'], value: cluster?.isActive },
        { name: ['description'], value: cluster?.description },
      ]);

      setStatus(cluster?.isActive);
    } else {
      if (clusterId) {
        fetchAPI();
      }
    }
  }, [selectedInstance, clusterId]);

  const fetchHistory = async ()=> {
    const history = await getHistory({id: clusterId, url: 'clusters'})
    
    setHistoryData(history)
  }

  useEffect(() => {
    fetchHistory();
  }, [])

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={clusterId ? bCrumbUpdate : bCrumbCreate}
      isLoading={isLoading}
    />
  );
};

export default FormCluster;
