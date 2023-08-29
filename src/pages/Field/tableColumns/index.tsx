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
    title: 'Cluster Associado',
    dataIndex: ['installation', 'cluster', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.installation.cluster.name) >
          formatUpperCase(b.installation.cluster.name)
          ? 1
          : formatUpperCase(b.installation.cluster.name) >
            formatUpperCase(a.installation.cluster.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Instalação Associada',
    dataIndex: ['installation', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.installation.name) >
          formatUpperCase(b.installation.name)
          ? 1
          : formatUpperCase(b.installation.name) >
            formatUpperCase(a.installation.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Nome do Campo',
    dataIndex: 'name',
    search: true,
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
    title: 'Código do Campo - ANP',
    dataIndex: 'codField',
    key: uuid(),
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.codField) > formatUpperCase(b.codField)
          ? 1
          : formatUpperCase(b.codField) > formatUpperCase(a.codField)
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
          <Link
            to={`/dashboard/${instanceName}/cadastrosBasicos/cadCampo/${record?.id}`}
            state={{ selectedInstallation: record }}
          >
            {instanceName !== 'Botafogo' ? (
              <Button
                type="primary"
                icon="Pencil"
                toolTipMessage="Editar Campo"
                toolTipPosition="topLeft"
              />
            ) : (
              <Button
                type="primary"
                icon="ClipboardText"
                toolTipMessage="Visualizar Campo"
                toolTipPosition="topLeft"
              />
            )}
          </Link>
        </div>
      );
    },
  },
];
