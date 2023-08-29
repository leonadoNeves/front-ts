import { Button } from '@/components/Button';
import { FieldsDTO } from '@/dtos/FieldsDTO';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IFormRegister {
  InstallationId?: string;
  fields: FieldsDTO[];
}

export const FormRegister = ({ InstallationId, fields }: IFormRegister) => {
  const [status, setStatus] = useState(true);
  const [installationData, setInstallationData] = useState({} as any);
  const [clusters, setClusters] = useState<any[]>([]);
  const [initialValue, setInitialValue] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const { isBotafogoInstance } = useInstance();

  const [form] = Form.useForm();

  const clusterActive = clusters.filter(
    elem => elem.isActive || elem.id === installationData.clusterId,
  );

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = () => {
    setLoadingSubmit(true);
  };

  return (
    <Form form={form} fields={fields} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={[16, 0]}>
        <Col xs={24} lg={12}>
          <Form.Item
            name="clusterId"
            label="Cluster Associado"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              getPopupContainer={trigger => trigger.parentNode}
              // filterOption={(input, option) =>
              //   option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
              placeholder={isBotafogoInstance ? '' : 'Selecionar Cluster'}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
            >
              {clusters &&
                clusterActive.map(cluster => (
                  <Select.Option key={cluster.id} value={cluster.id}>
                    {cluster.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="codInstallationAnp"
            label="Código da Instalação"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={
                isBotafogoInstance ? '' : 'Digite Código da Instalação'
              }
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="name"
            label="Nome da Instalação"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={
                isBotafogoInstance ? '' : 'Digite Nome da Instalação'
              }
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="uepCod"
            label="Código da Unidade de Processamento"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={
                isBotafogoInstance
                  ? ''
                  : 'Digite o Código da Unidade de Processamento'
              }
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="uepName"
            label="Nome da Unidade de Processamento"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={
                isBotafogoInstance
                  ? ''
                  : 'Digite Nome da Unidade de Processamento'
              }
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="gasSafetyBurnVolume"
            label="Volume de Queima de Segurança Mensal (10³ m³)"
          >
            <Input
              maxLength={60}
              placeholder={
                isBotafogoInstance
                  ? ''
                  : 'Digite Volume de Queima de Segurança de Gás (10³ m³)'
              }
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              type="number"
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="isActive"
            label="Status da Instalação"
            initialValue={true}
          >
            <Radio.Group
              onChange={onStatusChange}
              value={status ? status : true}
              disabled={
                isBotafogoInstance || (!postPermission && !patchPermission)
              }
            >
              <Radio value={true}>Ativo</Radio>
              <Radio value={false}>Inativo</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item name="description" label="Descrição">
            <TextArea
              rows={4}
              maxLength={120}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
                resize: 'none',
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              {!isBotafogoInstance && (postPermission || patchPermission) && (
                <Button
                  htmlType="submit"
                  title={loadingSubmit ? 'Salvando' : 'Salvar'}
                  variant="contained"
                  icon={loadingSubmit ? '' : 'FloppyDisk'}
                  loading={loadingSubmit}
                  disabled={!initialValue && !status}
                />
              )}

              <Button
                htmlType="button"
                title="Voltar"
                icon="ArrowUUpLeft"
                variant="outlined"
                onClick={() => navigate(-1)}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
