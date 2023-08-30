import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { CreateZoneDTO } from '@/dtos/BasicRegistry/ZoneDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useCluster } from '@/hooks/useCluster';
import { useField } from '@/hooks/useField';
import { useInstallation } from '@/hooks/useInstallation';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { useZone } from '@/hooks/useZone';
import { storageGetInstance } from '@/storage/storageInstance';
import { compareValues } from '@/utils/compareValues';
import { Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IFormRegister {
  zoneId?: string;
  fields: FieldsFormDTO[];
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  setFields: Dispatch<SetStateAction<FieldsFormDTO[]>>;
}

export const FormRegister = ({
  zoneId,
  fields,
  status,
  setStatus,
  setFields,
}: IFormRegister) => {
  const [openModal, setOpenModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [zoneData, setZoneData] = useState({} as CreateZoneDTO);
  const [initialValue, setInitialValue] = useState({} as CreateZoneDTO);
  const [clusterSelected, setClusterSelected] = useState('');
  const [installationSelected, setInstallationSelected] = useState('');

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const { clusterList, getAllCluster } = useCluster();
  const { getAllInstallations, installationsList } = useInstallation();
  const { getAllFields, fieldsList } = useField();
  const { createZone, disableZone, enableZone, updateZone } = useZone();

  const [form] = Form.useForm();

  const clusterActive = status
    ? clusterList?.filter(cluster => cluster.isActive)
    : clusterList;

  const onClusterChange = async (value: string) => {
    setClusterSelected(value);
    setFields([
      { name: ['installationId'], value: null },
      { name: ['fieldId'], value: null },
    ]);
  };

  const installationsActive = status
    ? installationsList?.filter(
        installation =>
          installation.isActive && installation.cluster.id === clusterSelected,
      )
    : installationsList?.filter(
        installation => installation.cluster.id === clusterSelected,
      );

  const onInstallationChange = async (value: string) => {
    setInstallationSelected(value);
    setFields([{ name: ['fieldId'], value: null }]);
  };

  const fieldsActive = status
    ? fieldsList?.filter(
        field =>
          field.isActive && field.installation.id === installationSelected,
      )
    : fieldsList?.filter(
        field => field.installation.id === installationSelected,
      );

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (values: any) => {
    setZoneData(values);
    setOpenModal(true);
  };

  const handleCreateZone = async () => {
    try {
      setLoadingSubmit(true);

      await createZone(zoneData);
      form.resetFields();
      navigate(`/dashboard/${instance}/cadastrosBasicos/zonas`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const handleSucess = () => {
    toast.success('Zona atualizada');
    navigate(`/dashboard/${instance}/cadastrosBasicos/zonas`);
  };

  const handleUpdateZone = async () => {
    try {
      setLoadingSubmit(true);

      const updatedValues = form.getFieldsValue();
      const hasChanges = compareValues(updatedValues, initialValue);
      const isActiveChanged = updatedValues.isActive !== initialValue.isActive;

      if (!updatedValues.isActive && hasChanges) {
        const response = await disableZone(zoneId as string);

        if (response instanceof AxiosError) {
          throw response;
        }

        handleSucess();
      } else {
        if (isActiveChanged && hasChanges) {
          if (!status) {
            const response = await disableZone(zoneId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          } else {
            const response = await enableZone(zoneId as string);
            const responseUpdate = await updateZone(zoneId as string, zoneData);

            if (response instanceof AxiosError) {
              throw response;
            }

            if (responseUpdate instanceof AxiosError) {
              throw responseUpdate;
            }

            handleSucess();
          }
        }

        if (isActiveChanged && !hasChanges) {
          if (!status) {
            const response = await disableZone(zoneId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          } else {
            const response = await enableZone(zoneId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          }
        }

        if (!isActiveChanged && hasChanges) {
          const response = await updateZone(zoneId as string, zoneData);

          if (response instanceof AxiosError) {
            throw response;
          }

          handleSucess();
        }

        if (!hasChanges && !isActiveChanged) {
          toast.error('Altere ao menos um campo para salvar');
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const verifyInstallationFieldDisabled = () => {
    if (
      isBotafogoInstance ||
      !status ||
      (!postPermission && !patchPermission) ||
      !clusterSelected
    ) {
      return true;
    }

    if (zoneId) {
      return false;
    }
  };

  const verifyFieldDisabled = () => {
    if (
      isBotafogoInstance ||
      !status ||
      (!postPermission && !patchPermission) ||
      !installationSelected
    ) {
      return true;
    }

    if (zoneId) {
      return false;
    }
  };

  useEffect(() => {
    getAllCluster();
    getAllInstallations();
    getAllFields();
  }, []);

  useEffect(() => {
    if (fields) {
      setInitialValue({
        fieldId: fields[2]?.value,
        codZone: fields[3]?.value,
        isActive: fields[4]?.value,
        description: fields[5]?.value,
      });
    }
  }, [fields]);

  useEffect(() => {
    if (fields && !clusterSelected) {
      setClusterSelected(fields[0]?.value);
    }
  }, [fields, clusterSelected]);

  useEffect(() => {
    if (fields && !installationSelected) {
      setInstallationSelected(fields[1]?.value);
    }
  }, [fields, installationSelected]);

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
              onChange={onClusterChange}
              optionFilterProp="children"
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={isBotafogoInstance ? '' : 'Selecione o Cluster'}
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
            name="installationId"
            label="Instalação Associada"
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
              onChange={onInstallationChange}
              optionFilterProp="children"
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={isBotafogoInstance ? '' : 'Selecione uma Instalação'}
              disabled={verifyInstallationFieldDisabled()}
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            >
              {installationsActive?.map(installation => (
                <Select.Option key={installation.id} value={installation.id}>
                  {installation.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="fieldId"
            label="Campo Associado"
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
              placeholder={isBotafogoInstance ? '' : 'Selecione um campo'}
              disabled={verifyFieldDisabled()}
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            >
              {fieldsActive?.map(field => (
                <Select.Option key={field.id} value={field.id}>
                  {field.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="codZone"
            label="Código da Zona - ANP"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              placeholder={isBotafogoInstance ? '' : 'Digite o código da zona'}
              disabled={
                isBotafogoInstance ||
                !!zoneId ||
                !status ||
                (!postPermission && !patchPermission)
              }
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
        onSubmit={zoneId ? handleUpdateZone : handleCreateZone}
        hasDeleteMessage={!status}
      />
    </Form>
  );
};
