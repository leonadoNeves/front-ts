import { ITableColumnDTO } from '@/dtos/TableColumnDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import formatUpperCase from '@/utils/formatUpperCase';
import { Space } from 'antd';
import { Link } from 'react-router-dom';

const instanceName = storageGetInstance();

export const tableColumns: ITableColumnDTO[] = [
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'status',
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
    key: 'cluster',
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
    key: 'name',
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
    key: 'uepCod',
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
    key: 'gasSafetyBurnVolume',
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
    key: 'description',
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
  // {
  //   title: '',
  //   dataIndex: '',
  //   fixed: 'right',
  //   width: '48px',
  //   key: 'actions',
  //   render: (_text, record) => {
  //     return (
  //       <Space style={{ display: 'flex', justifyContent: 'center' }}>
  //         <div style={{ width: '32px' }}>
  //           <Link to={`cadInstalacao/${record.id}`}>
  //             {instanceName !== 'Botafogo' && patchPermission ? (
  //               <EditButton type="primary" icon="Pencil" messageTip="Editar" />
  //             ) : (
  //               <EditButton
  //                 type="primary"
  //                 onlyRead={true}
  //                 messageTip="Informações"
  //                 icon="ClipboardText"
  //               />
  //             )}
  //           </Link>
  //         </div>
  //       </Space>
  //     );
  //   },
  // },
];
