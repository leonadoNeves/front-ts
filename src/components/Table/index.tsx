import React, { useRef, useState } from 'react';
import EditableRow from './tableEditCell/editeCell';
import columnsSearch from './search/columnData';
import { StyledTable } from './style';
import EditableCell from './tableEditCell/editeCell';
import { iTableModel } from './interface/interface';

const TableModel = ({
  tableColumns,
  data,
  tableSize,
  loading,
  expandableRows,
  rowOnlyExpandable,
  isPagination,
  isEditable,
  dataTable,
  rowNoExpandable,
  nameLine,
  rowSelection,
}: iTableModel) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [editableData, setEditableData] = useState<any>(dataTable);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row: { key: any }) => {
    const newData = [...editableData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    setEditableData(newData);
  };

  const columnsEditable = tableColumns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const columns = isEditable
    ? columnsSearch(
        columnsEditable,
        setSearchText,
        searchText,
        searchedColumn,
        searchInput,
        setSearchedColumn,
        data,
      )
    : columnsSearch(
        tableColumns,
        setSearchText,
        searchText,
        searchedColumn,
        searchInput,
        setSearchedColumn,
        data,
      );

  // nameLine => nome da cave do objeto que vc deseja verificar o valor.
  // rowNoExpandable => valor da chave que vc colocou no "nameLine", isso faz a linha não expandir.
  // rowNoExpandable => valor da chave que vc colocou no "nameLine", isso faz apenas as linhas especificadas expandirem.

  // exemplo da função para utilizar o check na tabela.
  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       console.log(
  //         `selectedRowKeys: ${selectedRowKeys}`,
  //         'selectedRows: ',
  //         selectedRows,
  //       );
  //     },
  //     getCheckboxProps: (record) => ({
  //       disabled: record['type'] === 'Disabled User',
  //       // Column configuration not to be checked
  //       name: record['type'],
  //     }),
  //   };

  return (
    <>
      <StyledTable
        bordered
        scroll={{ x: tableSize ? tableSize : 1000 }}
        size="small"
        tableLayout="fixed"
        className="isoEditableTable"
        columns={columns}
        dataSource={isEditable ? editableData : data}
        rowSelection={
          rowSelection && {
            type: 'checkbox',
            ...rowSelection,
          }
        }
        loading={loading}
        components={components}
        pagination={
          isPagination
            ? {
                showSizeChanger: true,
                pageSizeOptions: ['10', '50', '100'],
                showTotal: (total, range) => {
                  return `Exibindo ${range[1]} de ${total} ${
                    total > 1 ? 'itens' : 'item'
                  }`;
                },
              }
            : false
        }
        expandable={{
          expandedRowRender: expandableRows,
          rowExpandable: record => {
            if (rowOnlyExpandable) {
              if (nameLine) {
                const isNameRow = rowOnlyExpandable.includes(record[nameLine]);

                if (isNameRow) {
                  return true;
                }
              }
            } else if (rowNoExpandable) {
              if (nameLine) {
                const isNameRow = rowNoExpandable.includes(record[nameLine]);

                if (!isNameRow) {
                  return true;
                }
              }
            } else if (!rowOnlyExpandable && !rowNoExpandable) {
              return true;
            }

            return true;
          },
        }}
      />
    </>
  );
};

export default TableModel;
