import { ContainerPage } from '@/Container/Dashboard';
import { HomeOutlined } from '@ant-design/icons';
import { HomeScreen } from './screen';

export const HomePage = () => {
  const bCrumb = [
    {
      href: '',
      title: (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ),
    },
  ];

  return <ContainerPage children={<HomeScreen />} bCrumbArr={bCrumb} />;
};
