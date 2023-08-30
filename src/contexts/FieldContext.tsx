import {
  CreateFieldsDTO,
  FieldDTO,
  UpdateFieldDTO,
} from '@/dtos/BasicRegistry/FieldDTO';
import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsFieldContext = {
  getAllFields: () => Promise<void>;
  fieldsList: FieldDTO[];
  createField: (dataField: CreateFieldsDTO) => Promise<void>;
  getFieldById: (fieldId: string) => Promise<FieldDTO>;
  updateField: (
    fieldId: string,
    fieldUpdatedData: UpdateFieldDTO,
  ) => Promise<void> | AxiosError;
  disableField: (fieldId: string) => Promise<void> | AxiosError;
  enableField: (fieldId: string) => Promise<void> | AxiosError;
};

type PropsFieldProvider = {
  children: ReactNode;
};

const FieldContext = createContext<PropsFieldContext>({} as PropsFieldContext);

const FieldProvider = ({ children }: PropsFieldProvider) => {
  const [fieldsList, setFieldsList] = useState<FieldDTO[]>([]);

  const { isBotafogoInstance, selectedInstance } = useInstance();

  const getAllFields = async () => {
    const url = isBotafogoInstance
      ? `fields?instance=${selectedInstance}`
      : `fields`;

    try {
      const { data } = await api.get(url);
      setFieldsList(data);
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar os campos');
    }
  };

  const getFieldById = async (fieldId: string) => {
    try {
      const url = isBotafogoInstance
        ? `fields/${fieldId}?instance=${selectedInstance}`
        : `fields/${fieldId}`;

      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error('Erro ao buscar o campo');
    }
  };

  const createField = async (dataField: CreateFieldsDTO) => {
    try {
      await api.post('/fields', dataField);
      toast.success('Campo salvo');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateField = async (
    fieldId: string,
    FieldUpdatedData: UpdateFieldDTO,
  ) => {
    try {
      await api.patch(`/fields/${fieldId}`, FieldUpdatedData);
    } catch (error: any) {
      return error;
    }
  };

  const disableField = async (fieldId: string) => {
    try {
      await api.delete(`/fields/${fieldId}`);
    } catch (error: any) {
      return error;
    }
  };

  const enableField = async (fieldId: string) => {
    try {
      await api.patch(`/fields/${fieldId}/restore`);
    } catch (error: any) {
      return error;
    }
  };

  return (
    <FieldContext.Provider
      value={{
        getAllFields,
        fieldsList,
        createField,
        getFieldById,
        updateField,
        disableField,
        enableField,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};

export { FieldContext, FieldProvider };
