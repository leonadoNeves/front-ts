import { useInstance } from '@/hooks/useInstance';
import { api } from '@/service/api';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

type PropsFieldContext = {
  getAllFields: () => Promise<void>;
  fieldsList: any[];
};

type PropsFieldProvider = {
  children: ReactNode;
};

const FieldContext = createContext<PropsFieldContext>({} as PropsFieldContext);

const FieldProvider = ({ children }: PropsFieldProvider) => {
  const [fieldsList, setFieldsList] = useState<any>([]); //TIPAR!!!!

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

  return (
    <FieldContext.Provider value={{ getAllFields, fieldsList }}>
      {children}
    </FieldContext.Provider>
  );
};

export { FieldContext, FieldProvider };
