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
    dataIndex: ['zone', 'field', 'installation', 'cluster', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.zone.field.installation.cluster.name) >
          formatUpperCase(b.zone.field.installation.cluster.name)
          ? 1
          : formatUpperCase(b.zone.field.installation.cluster.name) >
            formatUpperCase(a.zone.field.installation.cluster.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Instalação Associada',
    dataIndex: ['zone', 'field', 'installation', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.zone.field.installation.name) >
          formatUpperCase(b.zone.field.installation.name)
          ? 1
          : formatUpperCase(b.zone.field.installation.name) >
            formatUpperCase(a.zone.field.installation.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Campo Associado',
    dataIndex: ['zone', 'field', 'name'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.zone.field.name) >
          formatUpperCase(b.zone.field.name)
          ? 1
          : formatUpperCase(b.zone.field.name) >
            formatUpperCase(a.zone.field.name)
          ? -1
          : 0;
      },
    },
  },
  {
    key: uuid(),
    title: 'Zona Associada',
    dataIndex: ['zone', 'codZone'],
    search: true,
    ellipsis: {
      showTitle: false,
    },
    sorter: {
      compare: (a, b) => {
        return formatUpperCase(a.zone.codZone) > formatUpperCase(b.zone.codZone)
          ? 1
          : formatUpperCase(b.zone.codZone) > formatUpperCase(a.zone.codZone)
          ? -1
          : 0;
      },
    },
  },
  {
    title: 'Reservatório',
    dataIndex: 'name',
    key: uuid(),
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
            to={`/dashboard/${instanceName}/cadastrosBasicos/cadReservatorio/${record?.id}`}
            state={{ selectedReservoir: record }}
          >
            {instanceName !== 'Botafogo' ? (
              <Button
                type="primary"
                icon="Pencil"
                toolTipMessage="Editar Reservatório"
                toolTipPosition="topLeft"
              />
            ) : (
              <Button
                type="primary"
                icon="ClipboardText"
                toolTipMessage="Visualizar Reservatório"
                toolTipPosition="topLeft"
              />
            )}
          </Link>
        </div>
      );
    },
  },
];
