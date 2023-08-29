import { ContainerPage } from '@/Container/Dashboard';
import { FieldsDTO } from '@/dtos/FieldsDTO';
import { useInstallation } from '@/hooks/useInstallation';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bCrumbRegister } from './bCumbs';
import { FormRegister } from './components/FormRegister';

interface ICadInstallationPage {
  InstallationId?: string;
}

export const CadInstalacaoPage = ({ InstallationId }: ICadInstallationPage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldsDTO[]>([]);

  const location = useLocation();

  const { checkPermissions } = usePermissions();
  const { selectedInstance } = useInstance();
  const { getInstallationById } = useInstallation();

  const tabs = [
    {
      key: '1',
      label: 'DADOS GERAIS',
      children: (
        <Content>
          <FormRegister InstallationId={InstallationId} fields={fields} />
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

  useEffect(() => {
    checkPermissions(location);
  }, [location]);

  const fetchAPI = async () => {
    if (InstallationId) {
      try {
        setIsLoading(true);

        if (selectedInstance !== 'consolidador') {
          const response = await getInstallationById(InstallationId);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [InstallationId]);

  return (
    <ContainerPage
      children={PageContent}
      bCrumbArr={bCrumbRegister}
      isLoading={isLoading}
    />
  );
};
