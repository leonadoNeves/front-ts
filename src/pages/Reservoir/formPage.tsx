import { ContainerPage } from '@/Container/Dashboard';
import { ReservoirDTO } from '@/dtos/BasicRegistry/ReservoirDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { useReservoir } from '@/hooks/useReservoir';
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
  const { getReservoirById } = useReservoir();

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

  const fetchAPI = async () => {
    if (reservoirId) {
      try {
        setIsLoading(true);

        const response = await getReservoirById(reservoirId);

        setFields([
          {
            name: ['clusterId'],
            value: response?.zone.field.installation.cluster.id,
          },
          {
            name: ['installationId'],
            value: response?.zone.field.installation.id,
          },
          {
            name: ['fieldId'],
            value: response?.zone.field.id,
          },
          {
            name: ['zoneId'],
            value: response?.zone.id,
          },
          {
            name: ['name'],
            value: response?.name,
          },
          { name: ['isActive'], value: response?.isActive },
          {
            name: ['description'],
            value: response?.description,
          },
        ]);

        setStatus(response?.isActive);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    checkPermissions(location);
  }, [location]);

  useEffect(() => {
    if (selectedInstance.toLowerCase() === 'consolidador') {
      const reservoir: ReservoirDTO = location.state.selectedReservoir;

      setFields([
        {
          name: ['clusterId'],
          value: reservoir?.zone.field.installation.cluster.id,
        },
        {
          name: ['installationId'],
          value: reservoir?.zone.field.installation.id,
        },
        {
          name: ['fieldId'],
          value: reservoir?.zone.field.id,
        },
        {
          name: ['zoneId'],
          value: reservoir?.zone.id,
        },
        {
          name: ['name'],
          value: reservoir?.name,
        },
        { name: ['isActive'], value: reservoir?.isActive },
        {
          name: ['description'],
          value: reservoir?.description,
        },
      ]);

      setStatus(reservoir?.isActive);
    } else {
      if (reservoirId) {
        fetchAPI();
      }
    }
  }, [selectedInstance, reservoirId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={reservoirId ? bCrumbUpdate : bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
