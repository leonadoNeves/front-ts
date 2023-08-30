import { ContainerPage } from '@/Container/Dashboard';
import { IBCrumb } from '@/dtos/BCrumbDTO';
import { storageGetInstance } from '@/storage/storageInstance';
import { HomeOutlined } from '@ant-design/icons';
import { BasicRegisterScreen } from './screen';

const BasicRegisters = () => {
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
      isLoading={false}
    />
  );
};

export default BasicRegisters;
