import React, { useRef, useState } from "react";
import {Table} from "antd";
import styled from 'styled-components';
import columnsSearch from "./TableModel/search/columnData";
import TableModel from "./TableModel/Table";

const StyledTable = styled(Table)`
  .ant-pagination-item-active {
    border-color: #0d7c84
  }

  .ant-pagination-item-active a {
    color: #0d7c84
  }

`

const SuperTable = ({ 
  tableColumns, 
  data, 
  tableSize, 
  loading,
  expandableRows, 
  rowExpandableName,
  isPagination,
  isGas,
  isOil
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataTable, setDataTable] = useState(data)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record["type"] === 'Disabled User',
      // Column configuration not to be checked
      name: record["type"],
    }),
  };

  // nameLine => nome da cave do objeto que vc deseja verificar o valor.
  // rowNoExpandable => valor da chave que vc colocou no "nameLine", isso faz a linha não expandir.
  // rowNoExpandable => valor da chave que vc colocou no "nameLine", isso faz apenas as linhas especificadas expandirem.

  return (
    <TableModel 
      tableColumns={tableColumns} 
      data={data} 
      tableSize={tableSize}
      // rowNoExpandable={["Nome Teste 1", "Nome Teste 2"]}
      // // rowOnlyExpandable={["Nome Teste 1"]}
      // nameLine={"type"}
      rowSelection={rowSelection}
      loading={loading} 
      expandableRows={() => {

        return (
          <TableModel 
            tableColumns={tableColumns} 
            data={data} 
            tableSize={tableSize} 
            loading={loading}
            isPagination={isPagination}
            // rowNoExpandable={["Nome Teste 1"]}
            // nameLine={"type"}
            // rowSelection={rowSelection}
            isEditable={true}
            expandableRows={() => {
              return (
                <TableModel 
                  tableColumns={tableColumns} 
                  data={data} 
                  tableSize={tableSize} 
                  loading={loading}
                  isPagination={isPagination}
                  isEditable={true}
                  dataTable={dataTable} 
                  setDataTable={setDataTable}
                  isOil
                />
              )
            }}
            isGas={isGas}
            dataTable={dataTable} 
            setDataTable={setDataTable}
            isOil
          />
        )

      }} 
      isPagination={isPagination}
      isEditable={true}
      dataTable={dataTable} 
      setDataTable={setDataTable}
    /> 
  )

};

export default SuperTable
