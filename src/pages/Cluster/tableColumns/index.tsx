import { Button } from '@/components/Button';
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
              backgroundColor: 'green',
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
              backgroundColor: 'red',
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
          <Link to={`cadCluster/${record.id}`}>
            {instanceName !== 'Botafogo' ? (
              <Button type="primary" icon="Pencil" />
            ) : (
              <Button type="primary" icon="ClipboardText" />
            )}
          </Link>
        </div>
      );
    },
  },
];
