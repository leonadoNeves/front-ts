import { ContainerPage } from '@/Container/Dashboard';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useInstallation } from '@/hooks/useInstallation';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bCrumbRegister, bCrumbUpdate } from './bCumbs';
import { FormRegister } from './components/FormRegister';

export const CadInstalacaoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsFormDTO[]>([]);
  const [status, setStatus] = useState(true);

  const location = useLocation();
  const InstallationId = useParams().id;

  const { checkPermissions } = usePermissions();
  const { selectedInstance } = useInstance();
  const { getInstallationById } = useInstallation();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister
            InstallationId={InstallationId}
            fields={fields}
            status={status}
            setStatus={setStatus}
          />
        </Content>
      ),
    },
    {
      disabled: !InstallationId,
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
    if (InstallationId) {
      try {
        setIsLoading(true);
        const response = await getInstallationById(InstallationId);

        setFields([
          { name: ['clusterId'], value: response.cluster.id },
          {
            name: ['codInstallationAnp'],
            value: response.codInstallationAnp,
          },
          { name: ['name'], value: response.name },
          { name: ['uepCod'], value: response.uepCod },
          { name: ['uepName'], value: response.uepName },
          {
            name: ['gasSafetyBurnVolume'],
            value: response.gasSafetyBurnVolume,
          },
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
      const installation = location.state.selectedInstallation;

      setFields([
        { name: ['clusterId'], value: installation.cluster.id },
        {
          name: ['codInstallationAnp'],
          value: installation.codInstallationAnp,
        },
        { name: ['name'], value: installation.name },
        { name: ['uepCod'], value: installation.uepCod },
        { name: ['uepName'], value: installation.uepName },
        {
          name: ['gasSafetyBurnVolume'],
          value: installation.gasSafetyBurnVolume,
        },
        { name: ['isActive'], value: installation.isActive },
        {
          name: ['description'],
          value: installation.description,
        },
      ]);

      setStatus(installation?.isActive);
    } else {
      if (InstallationId) {
        fetchAPI();
      }
    }
  }, [selectedInstance, InstallationId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={InstallationId ? bCrumbUpdate : bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
