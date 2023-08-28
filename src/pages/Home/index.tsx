import ContainerPage from '@/Container/Dashboard';
import { HomeOutlined } from '@ant-design/icons';

const HomePage = () => {
  const bCrumb = {
    href: '',
    title: (
      <>
        <HomeOutlined />
        <span>Home</span>
      </>
    ),
  };

  return <ContainerPage children={<></>} bCrumbArr={bCrumb} />;
};

export default HomePage;
