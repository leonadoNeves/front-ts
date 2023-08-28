import iTableCloumn from '@/interface/tableColumn.interface';
import { storageGetInstance } from '@/storage/storageInstance';
import { v4 as uuid } from 'uuid';
import formatUpper from '@/utils/formatUpperCase';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

const instanceName = storageGetInstance();

export const tableColumnList: iTableCloumn[] = [
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
    width: '48px',
    render: (_text, record) => {
      return (
        <Space style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '32px' }}>
            <Link to={`cadCluster/${record.id}`}>
              {instanceName !== 'Botafogo' ? (
                <Button type="primary" icon="Pencil" />
              ) : (
                <Button type="primary" icon="ClipboardText" />
              )}
            </Link>
          </div>
        </Space>
      );
    },
  },
];
