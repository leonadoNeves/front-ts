import { Button } from '@/components/Button';
import { ITableColumnDTO } from '@/dtos/TableColumnDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import formatUpperCase from '@/utils/formatUpperCase';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const instanceName = storageGetInstance();

export const tableColumns: ITableColumnDTO[] = [
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: uuid(),
    align: 'center',
    width: '75px',
    ellipsis: {
      showTitle: false,
    },
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
    title: 'Cluster Associado',
    dataIndex: 'cluster',
    search: true,
    key: uuid(),
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.name) > formatUpperCase(b.name)
          ? 1
          : formatUpperCase(b.name) > formatUpperCase(a.name)
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Nome da Instalação',
    dataIndex: 'name',
    search: true,
    key: uuid(),
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.name) > formatUpperCase(b.name)
          ? 1
          : formatUpperCase(b.name) > formatUpperCase(a.name)
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Código da UEP-ANP',
    dataIndex: 'uepCod',
    key: uuid(),
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.uepCod) > formatUpperCase(b.uepCod)
          ? 1
          : formatUpperCase(b.uepCod) > formatUpperCase(a.uepCod)
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Volume de Queima de Segurança de Gás (10³ m³)',
    dataIndex: 'gasSafetyBurnVolume',
    key: uuid(),
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return a.gasSafetyBurnVolume > b.gasSafetyBurnVolume
          ? 1
          : b.gasSafetyBurnVolume > a.gasSafetyBurnVolume
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: uuid(),
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.description !== null ? a.description : 'zz') >
          formatUpperCase(b.description !== null ? b.description : 'zz')
          ? 1
          : formatUpperCase(b.description !== null ? b.description : 'zz') >
            formatUpperCase(a.description !== null ? a.description : 'zz')
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
          <Link to={`cadCluster/${record?.id}`}>
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
