import { useInstance } from '@/hooks/useInstance';
import {
  storageGetInstance,
  storageSetInstanceSelected,
} from '@/storage/storageInstance';
import { Col, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CustomDrawer, Status } from './styles';

interface IDrawer {
  title: string;
  placement: 'top' | 'bottom' | 'right' | 'left';
  width?: number;
  onClose: () => void;
  open: boolean;
  appVersion: string;
  dbStatus: boolean;
}

export function Drawer({
  title,
  placement,
  width,
  onClose,
  open,
  appVersion,
  dbStatus,
}: IDrawer) {
  const instance = storageGetInstance();
  const { isBotafogoInstance, selectedInstance, setSelectedInstance } =
    useInstance();

  const navigate = useNavigate();

  const instancesOptions = [
    {
      id: 1,
      name: 'Consolidador',
      value: 'consolidador',
    },
    {
      id: 2,
      name: 'Bravo',
      value: 'bravo',
    },
    {
      id: 3,
      name: 'Forte',
      value: 'forte',
    },
    {
      id: 4,
      name: 'Valente',
      value: 'frade',
    },
  ];

  const handleInstance = (instanceName: string) => {
    setSelectedInstance(instanceName.toLowerCase());
    storageSetInstanceSelected(instanceName.toLowerCase());
    navigate(`/dashboard/${instance}`);
  };

  return (
    <CustomDrawer
      title={title}
      placement={placement}
      width={width}
      onClose={onClose}
      open={open}
    >
      <Col style={{ marginBottom: '10px' }}>
        <strong>Versão do software:</strong> v{appVersion}
      </Col>

      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: '10px',
        }}
      >
        <strong>Status da conexão: </strong> {dbStatus ? 'Online' : 'Offline'}
        <Status status={dbStatus} />
      </Col>

      <Col style={{ marginBottom: '10px' }}>
        <strong>Instância atual:</strong> {instance}
      </Col>

      {isBotafogoInstance && (
        <>
          <Col>
            <strong>Visualizando dados de:</strong>
          </Col>

          <Col style={{ marginTop: '8px' }}>
            <Select
              showSearch
              value={selectedInstance}
              style={{ width: '100%' }}
              optionFilterProp="children"
              placeholder="Selecione a instância a visualizar"
              onChange={handleInstance}
              getPopupContainer={trigger => trigger.parentNode}
            >
              {instancesOptions?.map(instance => (
                <Select.Option key={instance.id} value={instance.value}>
                  {instance.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </>
      )}
    </CustomDrawer>
  );
}
