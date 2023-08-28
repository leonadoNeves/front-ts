import React from 'react';
import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface iChildren {
  children: React.ReactNode;
}

interface idataGas {
  key: string;
  description: string;
  value: number | string;
}

interface iTableTypes {
  typeInputEditable: string;
  setTypeInputEditable: React.Dispatch<React.SetStateAction<string>>;
  setDataSourceGas: React.Dispatch<React.SetStateAction<idataGas[]>>;
  dataSourceGasBackup: idataGas[];
  dataSourceGas: idataGas[];
  setDataSourceGasBackup: React.Dispatch<React.SetStateAction<idataGas[]>>;
}

export const TableTypeObjContext = createContext({} as iTableTypes);

const TableTypes = ({ children }: iChildren) => {
  const [typeInputEditable, setTypeInputEditable] = useState<string>('');

  const [dataSourceGas, setDataSourceGas] = useState<idataGas[]>([
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

  const [dataSourceGasBackup, setDataSourceGasBackup] = useState<idataGas[]>([
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
    <TableTypeObjContext.Provider
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
    </TableTypeObjContext.Provider>
  );
};

export default TableTypes;
