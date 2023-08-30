import { ContainerPage } from '@/Container/Dashboard';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { ZoneDTO } from '@/dtos/ZoneDTO';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { useZone } from '@/hooks/useZone';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbRegister, bCrumbUpdate } from './bCrumbs';
import { FormRegister } from './components/FormRegister';

export const ZoneRegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsFormDTO[]>([]);
  const [status, setStatus] = useState(true);

  const location = useLocation();
  const zoneId = useParams().id;

  const { selectedInstance } = useInstance();
  const { checkPermissions } = usePermissions();
  const { getZoneById } = useZone();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister
            zoneId={zoneId}
            fields={fields}
            setFields={setFields}
            status={status}
            setStatus={setStatus}
          />
        </Content>
      ),
    },
    {
      disabled: !zoneId,
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
    if (zoneId) {
      try {
        setIsLoading(true);

        const response = await getZoneById(zoneId);

        setFields([
          {
            name: ['clusterId'],
            value: response.field.installation.cluster.id,
          },
          {
            name: ['installationId'],
            value: response.field.installation.id,
          },
          {
            name: ['fieldId'],
            value: response.field.id,
          },
          { name: ['codZone'], value: response.codZone },
          { name: ['isActive'], value: response.isActive },
          {
            name: ['description'],
            value: response.description,
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
      const zone: ZoneDTO = location.state.selectedZone;

      setFields([
        {
          name: ['clusterId'],
          value: zone.field.installation.cluster.id,
        },
        {
          name: ['installationId'],
          value: zone.field.installation.id,
        },
        {
          name: ['fieldId'],
          value: zone.field.id,
        },
        { name: ['codZone'], value: zone.codZone },
        { name: ['isActive'], value: zone.isActive },
        {
          name: ['description'],
          value: zone.description,
        },
      ]);

      setStatus(zone?.isActive);
    } else {
      if (zoneId) {
        fetchAPI();
      }
    }
  }, [selectedInstance, zoneId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={zoneId ? bCrumbUpdate : bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
