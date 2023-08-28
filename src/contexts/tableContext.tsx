import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

interface iChildren {
  children: ReactNode;
}

interface IDataGas {
  key: string;
  description: string;
  value: number | string;
}

interface ITableTypes {
  typeInputEditable: string;
  setTypeInputEditable: Dispatch<SetStateAction<string>>;
  setDataSourceGas: Dispatch<SetStateAction<IDataGas[]>>;
  dataSourceGasBackup: IDataGas[];
  dataSourceGas: IDataGas[];
  setDataSourceGasBackup: Dispatch<SetStateAction<IDataGas[]>>;
}

export const TableTypeContext = createContext({} as ITableTypes);

export const TableTypeProvider = ({ children }: iChildren) => {
  const [typeInputEditable, setTypeInputEditable] = useState<string>('');

  const [dataSourceGas, setDataSourceGas] = useState<IDataGas[]>([
    {
      key: uuid(),
      description: 'Volume de Queima por Limitação Operacional',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima Durante Parada Programada',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Gás Ventilado',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima para Comissionamento',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima para Teste de Poço',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima Emergêncial',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima - Outros',
      value: 0,
    },
  ]);

  const [dataSourceGasBackup, setDataSourceGasBackup] = useState<IDataGas[]>([
    {
      key: uuid(),
      description: 'Volume de Queima por Limitação Operacional',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima Durante Parada Programada',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Gás Ventilado',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima para Comissionamento',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima para Teste de Poço',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima Emergêncial',
      value: 0,
    },
    {
      key: uuid(),
      description: 'Volume de Queima - Outros',
      value: 0,
    },
  ]);

  return (
    <TableTypeContext.Provider
      value={{
        typeInputEditable,
        setTypeInputEditable,
        dataSourceGas,
        setDataSourceGas,
        dataSourceGasBackup,
        setDataSourceGasBackup,
      }}
    >
      {children}
    </TableTypeContext.Provider>
  );
};
