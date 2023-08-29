import { IBCrumb } from '@/dtos/BCrumbDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import { HomeOutlined } from '@ant-design/icons';

const instance = storageGetInstance();

const bCrumbCreate: IBCrumb[] = [
  {
    href: `/dashboard/${instance}`,
    title: (
      <>
        <HomeOutlined />
        <span>Home</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos`,
    title: (
      <>
        <span>Cadastros Básicos</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos/cluster`,
    title: (
      <>
        <span>Cluster</span>
      </>
    ),
  },
  {
    href: ``,
    title: (
      <>
        <span style={{ color: 'black' }}>Cadastrar</span>
      </>
    ),
  },
];

const bCrumbUpdate: IBCrumb[] = [
  {
    href: `/dashboard/${instance}`,
    title: (
      <>
        <HomeOutlined />
        <span>Home</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos`,
    title: (
      <>
        <span>Cadastros Básicos</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos/cluster`,
    title: (
      <>
        <span>Cluster</span>
      </>
    ),
  },
  {
    href: ``,
    title: (
      <>
        <span style={{ color: 'black' }}>
          {instance === 'Botafogo' ? 'Visualizar' : 'Visualizar/Editar'}
        </span>
      </>
    ),
  },
];

export { bCrumbCreate, bCrumbUpdate };
