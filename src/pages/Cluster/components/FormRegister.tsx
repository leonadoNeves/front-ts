import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { CreateClusterDTO } from '@/dtos/ClusterDTO';
import { FieldsDTO } from '@/dtos/FieldsDTO';
import { useCluster } from '@/hooks/useCluster';
import { useInstance } from '@/hooks/useInstance';
import { usePermissions } from '@/hooks/usePermissions';
import { storageGetInstance } from '@/storage/storageInstance';
import { compareValues } from '@/utils/compareValues';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IFormRegister {
  clusterId?: string;
  fields: FieldsDTO[];
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export const FormRegister = ({
  clusterId,
  fields,
  status,
  setStatus,
}: IFormRegister) => {
  const [openModal, setOpenModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dataCluster, setDataCluster] = useState({} as CreateClusterDTO);
  const [initialValues, setInitialValues] = useState({} as CreateClusterDTO);

  const { postPermission, patchPermission } = usePermissions();

  const navigate = useNavigate();
  const instance = storageGetInstance();

  const { isBotafogoInstance } = useInstance();
  const { createCluster, updateCluster, disableCluster, enableCluster } =
    useCluster();

  const [form] = Form.useForm();

  const onStatusChange = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (values: any) => {
    setDataCluster(values);
    setOpenModal(true);
  };

  const handleCreateCluster = async () => {
    try {
      setLoadingSubmit(true);

      await createCluster(dataCluster);
      form.resetFields();
      navigate(`/dashboard/${instance}/cadastrosBasicos/cluster`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
      setOpenModal(false);
    }
  };

  const handleUpdateCluster = async () => {
    try {
      setLoadingSubmit(true);

      const updatedValues = form.getFieldsValue();
      const hasChanges = compareValues(updatedValues, initialValues);
      const isActiveChanged = updatedValues.isActive !== initialValues.isActive;

      if (!updatedValues.isActive && hasChanges) {
        await disableCluster(clusterId as string);
        toast.success('Cluster atualizado');
        navigate(`/dashboard/${instance}/cadastrosBasicos/cluster`);
      } else {
        if (isActiveChanged) {
          if (!status) {
            await disableCluster(clusterId as string);
          } else {
            await enableCluster(clusterId as string);
          }
        }

        if (hasChanges) {
          await updateCluster(clusterId as string, {
            name: dataCluster.name,
            description: dataCluster.description || '',
          });
        }

        if (!hasChanges && !isActiveChanged) {
          toast.error('Altere ao menos um campo para salvar');
        }

        if (hasChanges || isActiveChanged) {
          toast.success('Cluster atualizado');
          navigate(`/dashboard/${instance}/cadastrosBasicos/cluster`);
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
    if (fields) {
      setInitialValues({
        name: fields[0]?.value,
        isActive: fields[1]?.value,
        description: fields[2]?.value,
      });
    }
  }, [fields]);

  return (
    <Form form={form} fields={fields} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Nome do Cluster"
        rules={[
          {
            required: true,
            message: 'Campo obrigatório!',
          },
        ]}
      >
        <Input
          maxLength={60}
          placeholder={isBotafogoInstance ? '' : 'Digite o Nome do Cluster'}
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

      <Form.Item
        name="isActive"
        label="Status do Cluster"
        initialValue={status}
      >
        <Radio.Group
          onChange={onStatusChange}
          value={status}
          disabled={isBotafogoInstance || (!postPermission && !patchPermission)}
        >
          <Radio value={true}>Ativo</Radio>
          <Radio value={false}>Inativo</Radio>
        </Radio.Group>
      </Form.Item>

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

      <Form.Item>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          {!isBotafogoInstance && (postPermission || patchPermission) && (
            <Button
              htmlType="submit"
              title={loadingSubmit ? 'Salvando' : 'Salvar'}
              variant="contained"
              icon={loadingSubmit ? '' : 'FloppyDisk'}
              loading={loadingSubmit}
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

      <ModalConfirm
        open={openModal}
        handleCancel={() => setOpenModal(!openModal)}
        onSubmit={clusterId ? handleUpdateCluster : handleCreateCluster}
        hasDeleteMessage={!status}
      />
    </Form>
  );
};
