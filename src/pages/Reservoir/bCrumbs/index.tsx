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
    href: `/dashboard/${instance}/cadastrosBasicos/reservatorios`,
    title: (
      <>
        <span style={{ color: 'black' }}>Reservatórios</span>
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
    href: `/dashboard/${instance}/cadastrosBasicos/reservatorios`,
    title: (
      <>
        <span>Reservatórios</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos/cadReservatorio`,
    title: (
      <>
        <span style={{ color: 'black' }}>Cadastrar</span>
      </>
    ),
  },
];

export const bCrumbUpdate: IBCrumb[] = [
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
    href: `/dashboard/${instance}/cadastrosBasicos/reservatorios`,
    title: (
      <>
        <span>Reservatórios</span>
      </>
    ),
  },
  {
    href: `/dashboard/${instance}/cadastrosBasicos/cadReservatorio`,
    title: (
      <>
        <span style={{ color: 'black' }}>
          {instance === 'Botafogo' ? 'Visualizar' : 'Visualizar/Editar'}
        </span>
      </>
    ),
  },
];
