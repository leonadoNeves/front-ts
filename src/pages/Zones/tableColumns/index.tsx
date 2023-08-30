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
    dataIndex: ['field', 'installation', 'cluster', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.field.installation.cluster.name) >
          formatUpperCase(b.field.installation.cluster.name)
          ? 1
          : formatUpperCase(b.field.installation.cluster.name) >
            formatUpperCase(a.field.installation.cluster.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Instalação Associada',
    dataIndex: ['field', 'installation', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.field.installation.name) >
          formatUpperCase(b.field.installation.name)
          ? 1
          : formatUpperCase(b.field.installation.name) >
            formatUpperCase(a.field.installation.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Campo Associado',
    dataIndex: ['field', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.field.name) > formatUpperCase(b.field.name)
          ? 1
          : formatUpperCase(b.field.name) > formatUpperCase(a.field.name)
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Código da Zona - ANP',
    dataIndex: 'codZone',
    key: uuid(),
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.codZone) > formatUpperCase(b.codZone)
          ? 1
          : formatUpperCase(b.codZone) > formatUpperCase(a.codZone)
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
            to={`/dashboard/${instanceName}/cadastrosBasicos/cadZona/${record?.id}`}
            state={{ selectedZone: record }}
          >
            {instanceName !== 'Botafogo' ? (
              <Button
                type="primary"
                icon="Pencil"
                toolTipMessage="Editar Zona"
                toolTipPosition="topLeft"
              />
            ) : (
              <Button
                type="primary"
                icon="ClipboardText"
                toolTipMessage="Visualizar Zona"
                toolTipPosition="topLeft"
              />
            )}
          </Link>
        </div>
      );
    },
  },
];
