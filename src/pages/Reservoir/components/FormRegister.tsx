import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { CreateReservoirDTO } from '@/dtos/BasicRegistry/ReservoirDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useCluster } from '@/hooks/useCluster';
import { useField } from '@/hooks/useField';
import { useInstallation } from '@/hooks/useInstallation';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { useReservoir } from '@/hooks/useReservoir';
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
  reservoirId?: string;
  fields: FieldsFormDTO[];
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  setFields: Dispatch<SetStateAction<FieldsFormDTO[]>>;
}

export const FormRegister = ({
  reservoirId,
  fields,
  status,
  setStatus,
  setFields,
}: IFormRegister) => {
  const [openModal, setOpenModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [reservoirData, setReservoirData] = useState({} as CreateReservoirDTO);
  const [initialValue, setInitialValue] = useState({} as any);
  const [clusterSelected, setClusterSelected] = useState('');
  const [installationSelected, setInstallationSelected] = useState('');
  const [fieldSelected, setFieldSelected] = useState('');

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const { clusterList, getAllCluster } = useCluster();
  const { getAllInstallations, installationsList } = useInstallation();
  const { getAllFields, fieldsList } = useField();
  const { getAllZones, zoneList } = useZone();
  const {
    createReservoir,
    disableReservoir,
    enableReservoir,
    updateReservoir,
  } = useReservoir();

  const [form] = Form.useForm();

  const clusterActive = status
    ? clusterList?.filter(cluster => cluster.isActive)
    : clusterList;

  const onClusterChange = async (value: string) => {
    setClusterSelected(value);
    setInstallationSelected('');
    setFieldSelected('');

    setFields([
      { name: ['installationId'], value: null },
      { name: ['fieldId'], value: null },
      { name: ['zoneId'], value: null },
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
    setFieldSelected('');

    setFields([
      { name: ['fieldId'], value: null },
      { name: ['zoneId'], value: null },
    ]);
  };

  const fieldsActive = status
    ? fieldsList?.filter(
        field =>
          field.isActive && field.installation.id === installationSelected,
      )
    : fieldsList?.filter(
        field => field.installation.id === installationSelected,
      );

  const onFieldChange = async (value: string) => {
    setFieldSelected(value);
    setFields([{ name: ['zoneId'], value: null }]);
  };

  const zonesActive = status
    ? zoneList?.filter(zone => zone.isActive && zone.field.id === fieldSelected)
    : zoneList?.filter(zone => zone.field.id === fieldSelected);

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (values: any) => {
    setReservoirData(values);
    setOpenModal(true);
  };

  const handleCreateReservoir = async () => {
    try {
      setLoadingSubmit(true);

      await createReservoir(reservoirData);
      form.resetFields();
      navigate(`/dashboard/${instance}/cadastrosBasicos/reservatorios`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const handleSucess = () => {
    toast.success('Reservatório atualizao');
    navigate(`/dashboard/${instance}/cadastrosBasicos/reservatorios`);
  };

  const handleUpdateReservoir = async () => {
    try {
      setLoadingSubmit(true);

      const updatedValues = form.getFieldsValue();
      const hasChanges = compareValues(updatedValues, initialValue);
      const isActiveChanged = updatedValues.isActive !== initialValue.isActive;

      if (!updatedValues.isActive && hasChanges) {
        const response = await disableReservoir(reservoirId as string);

        if (response instanceof AxiosError) {
          throw response;
        }

        handleSucess();
      } else {
        if (isActiveChanged && hasChanges) {
          if (!status) {
            const response = await disableReservoir(reservoirId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          } else {
            const response = await enableReservoir(reservoirId as string);
            const responseUpdate = await updateReservoir(
              reservoirId as string,
              reservoirData,
            );

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
            const response = await disableReservoir(reservoirId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          } else {
            const response = await enableReservoir(reservoirId as string);

            if (response instanceof AxiosError) {
              throw response;
            }

            handleSucess();
          }
        }

        if (!isActiveChanged && hasChanges) {
          const response = await updateReservoir(
            reservoirId as string,
            reservoirData,
          );

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

    if (reservoirId) {
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

    if (reservoirId) {
      return false;
    }
  };

  const verifyZoneDisabled = () => {
    if (
      isBotafogoInstance ||
      !status ||
      (!postPermission && !patchPermission) ||
      !fieldSelected
    ) {
      return true;
    }

    if (reservoirId) {
      return false;
    }
  };

  useEffect(() => {
    getAllCluster();
    getAllInstallations();
    getAllFields();
    getAllZones();
  }, []);

  useEffect(() => {
    if (fields) {
      setInitialValue({
        clusterId: fields[0]?.value,
        installationId: fields[1]?.value,
        fieldId: fields[2]?.value,
        zoneId: fields[3]?.value,
        name: fields[4]?.value,
        isActive: fields[5]?.value,
        description: fields[6]?.value,
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

  useEffect(() => {
    if (fields && !fieldSelected) {
      setFieldSelected(fields[2]?.value);
    }
  }, [fields, fieldSelected]);

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
              placeholder={isBotafogoInstance ? '' : 'Selecione um cluster'}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
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
              placeholder={isBotafogoInstance ? '' : 'Selecione uma instalação'}
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
              onChange={onFieldChange}
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
            name="zoneId"
            label="Zona Associada"
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
              getPopupContainer={trigger => trigger.parentNode}
              optionFilterProp="children"
              placeholder={isBotafogoInstance ? '' : 'Selecione uma zona'}
              disabled={verifyZoneDisabled()}
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            >
              {zonesActive?.map(zone => (
                <Select.Option key={zone.id} value={zone.id}>
                  {zone.codZone}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            name="name"
            label="Nome do Reservatório"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={isBotafogoInstance ? '' : 'Digite um reservatório'}
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
        onSubmit={reservoirId ? handleUpdateReservoir : handleCreateReservoir}
        hasDeleteMessage={!status}
      />
    </Form>
  );
};
