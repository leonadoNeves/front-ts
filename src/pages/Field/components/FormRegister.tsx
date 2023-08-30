import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { CreateFieldsDTO } from '@/dtos/FieldsDTO';
import { FieldsFormDTO } from '@/dtos/FieldsFormDTO';
import { useAuxiliary } from '@/hooks/useAuxiliary';
import { useCluster } from '@/hooks/useCluster';
import { useField } from '@/hooks/useField';
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
  fieldId?: string;
  fields: FieldsFormDTO[];
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  setFields: Dispatch<SetStateAction<FieldsFormDTO[]>>;
}

export const FormRegister = ({
  fieldId,
  fields,
  status,
  setStatus,
  setFields,
}: IFormRegister) => {
  const [openModal, setOpenModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [fieldData, setFieldData] = useState({} as CreateFieldsDTO);
  const [initialValue, setInitialValue] = useState({} as CreateFieldsDTO);
  const [clusterSelected, setClusterSelected] = useState('');

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const instance = storageGetInstance();
  const { isBotafogoInstance } = useInstance();

  const { clusterList, getAllCluster } = useCluster();
  const { getAllInstallations, installationsList } = useInstallation();
  const { getAuxiliaryData, ufList, basinsList } = useAuxiliary();
  const { createField, updateField, enableField, disableField } = useField();

  const [form] = Form.useForm();

  const clusterActive = clusterList?.filter(cluster => cluster.isActive);

  const onClusterChange = async (value: any) => {
    setClusterSelected(value);
    setFields([{ name: ['fieldId'], value: null }]);
  };

  const installationsActive = installationsList?.filter(
    installation =>
      installation.isActive && installation.cluster.id === clusterSelected,
  );

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (values: any) => {
    setFieldData(values);
    setOpenModal(true);
  };

  const handleCreateField = async () => {
    try {
      setLoadingSubmit(true);

      await createField(fieldData);
      form.resetFields();
      navigate(`/dashboard/${instance}/cadastrosBasicos/campos`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const handleUpdateField = async () => {
    try {
      setLoadingSubmit(true);

      const updatedValues = form.getFieldsValue();
      const hasChanges = compareValues(updatedValues, initialValue);
      const isActiveChanged = updatedValues.isActive !== initialValue.isActive;

      if (!updatedValues.isActive && hasChanges) {
        await disableField(fieldId as string);
        toast.success('Campo atualizado');
        navigate(`/dashboard/${instance}/cadastrosBasicos/campos`);
      } else {
        if (isActiveChanged) {
          if (!status) {
            await disableField(fieldId as string);
          } else {
            await enableField(fieldId as string);
          }
        }

        if (hasChanges) {
          await updateField(fieldId as string, fieldData);
        }

        if (!hasChanges && !isActiveChanged) {
          toast.error('Altere ao menos um campo para salvar');
        }

        if (hasChanges || isActiveChanged) {
          toast.success('Campo atualizado');
          navigate(`/dashboard/${instance}/cadastrosBasicos/campos`);
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
    getAllInstallations();
  }, []);

  useEffect(() => {
    if (!isBotafogoInstance) {
      getAuxiliaryData();
    }
  }, [isBotafogoInstance]);

  useEffect(() => {
    if (fields) {
      console.log(fields);
      setClusterSelected(fields[0]?.value);

      setInitialValue({
        installationId: fields[1]?.value,
        name: fields[2]?.value,
        codField: fields[3]?.value,
        state: fields[4]?.value,
        basin: fields[5]?.value,
        location: fields[6]?.value,
        isActive: fields[7]?.value,
        description: fields[8]?.value,
      });
    }
  }, [fields]);

  const verifyInstallationFieldDisabled = () => {
    if (
      isBotafogoInstance ||
      !status ||
      (!postPermission && !patchPermission)
    ) {
      return true;
    }

    if (fieldId) {
      return false;
    }

    if (!clusterSelected) {
      return true;
    }
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
            name="name"
            label="Nome do Campo"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={isBotafogoInstance ? '' : 'Digite o nome do campo'}
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
            name="codField"
            label="Código do Campo - ANP"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório!',
              },
            ]}
          >
            <Input
              maxLength={60}
              placeholder={isBotafogoInstance ? '' : 'Digite o código do campo'}
              disabled={
                isBotafogoInstance ||
                !!fieldId ||
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
          <Form.Item name="state" label="UF">
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={isBotafogoInstance ? '' : 'Selecione uma UF'}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            >
              {ufList?.map(uf => (
                <Select.Option key={uf.id} value={uf.option}>
                  {uf.option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item name="basin" label="Bacia">
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={isBotafogoInstance ? '' : 'Selecione uma Bacia'}
              disabled={
                isBotafogoInstance ||
                !status ||
                (!postPermission && !patchPermission)
              }
              style={{
                color: isBotafogoInstance ? '#635d5d' : 'rgb(109, 102, 102)',
              }}
            >
              {basinsList?.map(basin => (
                <Select.Option key={basin.id} value={basin.option}>
                  {basin.option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item name="location" label="Localização">
            <Input
              maxLength={60}
              placeholder={isBotafogoInstance ? '' : 'Digite a localização'}
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
              rows={3}
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
        onSubmit={fieldId ? handleUpdateField : handleCreateField}
        hasDeleteMessage={!status}
      />
    </Form>
  );
};
