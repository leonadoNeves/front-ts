import { IBCrumb } from '@/dtos/BCrumbDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import { HomeOutlined } from '@ant-design/icons';

const instance = storageGetInstance();

const bCrumb: IBCrumb[] = [
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
        <span>Cadastro Básico</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos/cluster`,
    title: (
      <>
        <span style={{ color: 'black' }}>Cluster</span>
      </>
    ),
  },
];

export default bCrumb;
