import { Button } from '@/components/Button';
import { IHistoryTableColumnDTO } from '@/dtos/HistoryTableColumnDTO';
import { ITableColumnDTO } from '@/dtos/TableColumnDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import formatUpper from '@/utils/formatUpperCase';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const instanceName = storageGetInstance();

export const tableColumnList: ITableColumnDTO[] = [
  {
    key: uuid(),
    title: 'Status',
    dataIndex: 'isActive',
    align: 'center',
    width: '75px',
    sorter: {
      compare: (a, b) => {
        return a.isActive > b.isActive ? 1 : b.isActive > a.isActive ? -1 : 0;
      },
    },
    render: (_text, record) => {
      return record.isActive ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '10px',
              backgroundColor: '#4BE03C',
            }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '10px',
              backgroundColor: '#FF2727',
            }}
          />
        </div>
      );
    },
  },
  {
    key: uuid(),
    title: 'Nome do Cluster',
    dataIndex: 'name',
    search: true,
    sorter: {
      compare: (a, b) => {
        return formatUpper(a.name) > formatUpper(b.name)
          ? 1
          : formatUpper(b.name) > formatUpper(a.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Descrição',
    dataIndex: 'description',
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpper(a.description !== null ? a.description : 'zz') >
          formatUpper(b.description !== null ? b.description : 'zz')
          ? 1
          : formatUpper(b.description !== null ? b.description : 'zz') >
            formatUpper(a.description !== null ? a.description : 'zz')
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: '',
    dataIndex: '',
    fixed: 'right',
    width: '58px',
    align: 'center',
    render: (_text, record) => {
      return (
        <div style={{ width: '30px' }}>
          <Link
            to={`cadCluster/${record.id}`}
            state={{ selectedCluster: record }}
          >
            {instanceName !== 'Botafogo' ? (
              <Button
                type="primary"
                icon="Pencil"
                toolTipMessage="Editar Cluster"
                toolTipPosition="topLeft"
              />
            ) : (
              <Button
                type="primary"
                icon="ClipboardText"
                toolTipMessage="Visualizar Cluster"
                toolTipPosition="topLeft"
              />
            )}
          </Link>
        </div>
      );
    },
  },
];

export const historyTableColumns: IHistoryTableColumnDTO[] = [
  {
    key: uuid(),
    title: "Campo Alterado",
    dataIndex: "changedField",
  },
  {
    key: uuid(),
    title: "Valor Anterior",
    dataIndex: "previousData",
  },
  {
    key: uuid(),
    title: "Valor Inserido",
    dataIndex: "changedValue",
  },
  {
    key: uuid(),
    title: "Usuário",
    dataIndex: "updatedBy",
    search: true,
    sorter: {
      compare: (a, b) => {
        return formatUpper(a.updatedBy) > formatUpper(b.updatedBy)
          ? 1
          : formatUpper(b.updatedBy) > formatUpper(a.updatedBy)
          ? -1
          : 0;
      }
    }
  },
  {
    key: uuid(),
    title: "Data",
    dataIndex: "createdAt",
    search: true,
    sorter: {
      compare: (a, b) => {
        return formatUpper(a.createdAt) > formatUpper(b.createdAt)
          ? 1
          : formatUpper(b.createdAt) > formatUpper(a.createdAt)
          ? -1
          : 0;
      }
    }
  }
];