import { ContainerPage } from '@/Container/Dashboard';
import { FieldDTO } from '@/dtos/FieldsDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useField } from '@/hooks/useField';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbRegister, bCrumbUpdate } from './bCrumbs';
import { FormRegister } from './components/FormRegister';

export const CadFieldsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsFormDTO[]>([]);
  const [status, setStatus] = useState(true);

  const location = useLocation();
  const fieldId = useParams().id;

  const { selectedInstance } = useInstance();
  const { checkPermissions } = usePermissions();
  const { getFieldById } = useField();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister
            fieldId={fieldId}
            fields={fields}
            setFields={setFields}
            status={status}
            setStatus={setStatus}
          />
        </Content>
      ),
    },
    {
      disabled: !fieldId,
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
    if (fieldId) {
      try {
        setIsLoading(true);
        const response = await getFieldById(fieldId);

        setFields([
          { name: ['clusterId'], value: response.installation.cluster.id },
          {
            name: ['installationId'],
            value: response.installation.id,
          },
          { name: ['name'], value: response.name },
          { name: ['codField'], value: response.codField },
          { name: ['state'], value: response.state },
          { name: ['basin'], value: response.basin },
          { name: ['location'], value: response.location },
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
      const field: FieldDTO = location.state.selectedField;

      setFields([
        { name: ['clusterId'], value: field.installation.cluster.id },
        {
          name: ['installationId'],
          value: field.installation.id,
        },
        { name: ['name'], value: field.name },
        { name: ['codField'], value: field.codField },
        { name: ['state'], value: field.state },
        { name: ['basin'], value: field.basin },
        { name: ['location'], value: field.location },
        { name: ['isActive'], value: field.isActive },
        {
          name: ['description'],
          value: field.description,
        },
      ]);

      setStatus(field?.isActive);
    } else {
      if (fieldId) {
        fetchAPI();
      }
    }
  }, [selectedInstance, fieldId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={fieldId ? bCrumbUpdate : bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
