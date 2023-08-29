import { ContainerPage } from '@/Container/Dashboard';
import { IBCrumb } from '@/dtos/BCrumbDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BasicRegisterScreen } from './screen';

const BasicRegisters = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      href: '',
      title: (
        <>
          <span style={{ color: 'black' }}>Cadastros Básicos</span>
        </>
      ),
    },
  ];

  return (
    <ContainerPage
      children={<BasicRegisterScreen />}
      bCrumbArr={bCrumb}
      isLoading={isLoading}
    />
  );
};

export default BasicRegisters;
