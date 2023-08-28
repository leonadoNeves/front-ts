import ContainerPage from '@/Container/Dashboard';
import { ibCrumb } from '@/interface/bCrumb.interface';
import { HomeOutlined } from '@ant-design/icons';
import BasicRegisterScreen from './screen';
import { storageGetInstance } from '@/storage/storageInstance';

const BasicRegisters = () => {
  const instance = storageGetInstance();

  const bCrumb: ibCrumb[] = [
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
          <span>Cadastro Básico</span>
        </>
      ),
    },
  ];

  return (
    <ContainerPage children={<BasicRegisterScreen />} bCrumbArr={bCrumb} />
  );
};

export default BasicRegisters;
