import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { CreateInstallationDTO } from '@/dtos/BasicRegistry/InstallationDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useCluster } from '@/hooks/useCluster';
import { useInstallation } from '@/hooks/useInstallation';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { storageGetInstance } from '@/storage/storageInstance';
import { compareValues } from '@/utils/compareValues';
import { Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IFormRegister {
  InstallationId?: string;
  fields: FieldsFormDTO[];
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export const FormRegister = ({
  InstallationId,
  fields,
  status,
  setStatus,
}: IFormRegister) => {
  const [openModal, setOpenModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [installationData, setInstallationData] = useState(
    {} as CreateInstallationDTO,
  );
  const [initialValue, setInitialValue] = useState({} as CreateInstallationDTO);

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const { clusterList, getAllCluster } = useCluster();
  const {
    createInstallation,
    updateInstallation,
    disableInstallation,
    enableInstallation,
  } = useInstallation();

  const [form] = Form.useForm();

  const clusterActive = clusterList?.filter(
    elem => elem.isActive || elem.id === installationData?.clusterId,
  );

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (values: any) => {
    setInstallationData(values);
    setOpenModal(true);
  };

  const handleCreateInstallation = async () => {
    try {
      setLoadingSubmit(true);

      await createInstallation(installationData);
      form.resetFields();
      navigate(`/dashboard/${instance}/cadastrosBasicos/instalacoes`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const handleUpdateInstallation = async () => {
    try {
      setLoadingSubmit(true);

      const updatedValues = form.getFieldsValue();
      const hasChanges = compareValues(updatedValues, initialValue);
      const isActiveChanged = updatedValues.isActive !== initialValue.isActive;

      if (!updatedValues.isActive && hasChanges) {
        await disableInstallation(InstallationId as string);
        toast.success('Instalação atualizada');
        navigate(`/dashboard/${instance}/cadastrosBasicos/instalacoes`);
      } else {
        if (isActiveChanged) {
          if (!status) {
            await disableInstallation(InstallationId as string);
          } else {
            await enableInstallation(InstallationId as string);
          }
        }

        if (hasChanges) {
          await updateInstallation(InstallationId as string, installationData);
        }

        if (!hasChanges && !isActiveChanged) {
          toast.error('Altere ao menos um campo para salvar');
        }

        if (hasChanges || isActiveChanged) {
          toast.success('Instalação atualizada');
          navigate(`/dashboard/${instance}/cadastrosBasicos/instalacoes`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    getAllCluster();
  }, []);

  useEffect(() => {
    if (fields) {
      setInitialValue({
        clusterId: fields[0]?.value,
        codInstallationAnp: fields[1]?.value,
        name: fields[2]?.value,
        uepCod: fields[3]?.value,
        uepName: fields[4]?.value,
        gasSafetyBurnVolume: fields[5]?.value,
        isActive: fields[6]?.value,
        description: fields[7]?.value,
      });
    }
  }, [fields]);

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
              placeholder={isBotafogoInstance ? '' : 'Selecionar Cluster'}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
            >
              {clusterActive?.map(cluster => (
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
              placeholder="Digite a descrição"
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

      <ModalConfirm
        open={openModal}
        handleCancel={() => setOpenModal(!openModal)}
        onSubmit={
          InstallationId ? handleUpdateInstallation : handleCreateInstallation
        }
        hasDeleteMessage={!status}
      />
    </Form>
  );
};
