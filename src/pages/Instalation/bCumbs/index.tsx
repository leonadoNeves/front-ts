import { IBCrumb } from '@/dtos/BCrumbDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import { HomeOutlined } from '@ant-design/icons';

const instance = storageGetInstance();

export const bCrumbView: IBCrumb[] = [
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
    href: `/dashboard/${instance}/cadastrosBasicos/instalacoes`,
    title: (
      <>
        <span style={{ color: 'black' }}>Instalações</span>
      </>
    ),
  },
];

export const bCrumbRegister: IBCrumb[] = [
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
    href: `/dashboard/${instance}/cadastrosBasicos/cadInstalacao`,
    title: (
      <>
        <span style={{ color: 'black' }}>Cadastrar</span>
      </>
    ),
  },
];
