import { Drawer } from '@/components/Drawer';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/service/api';
import { storageGetInstance } from '@/storage/storageInstance';
import { getIconSideBar } from '@/utils/getIconSideBar';
import { Info } from '@phosphor-icons/react';
import { Breadcrumb, Layout, Spin, theme } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderPage } from './Header';
import { SideBarPage } from './Menu';
import { BrandCrumbContainer } from './style';

interface IPageContainer {
  children: ReactNode;
  bCrumbArr: any;
  isLoading: boolean;
}

const { Content, Footer } = Layout;

export const ContainerPage = ({
  children,
  bCrumbArr,
  isLoading,
}: IPageContainer) => {
  const [collapsed, setCollapsed] = useState(false);
  const [appVersion, setAppVersion] = useState('');
  const [dbStatus, setDbStatus] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const instance = storageGetInstance();

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const itemsSideBar = user?.userPermissions?.map(elem => {
    return {
      key: `${elem.menuOrder}`,
      icon: getIconSideBar(elem.menuIcon),
      label: `${elem.menuName}`,
      onClick: () =>
        elem.children
          ? ''
          : navigate(`/dashboard/${instance}${elem.menuRoute}`),
      children: elem.children?.map(child => {
        return {
          key: `${child.menuOrder}`,
          label: `${child.menuName}`,
          onClick: () => navigate(`/dashboard/${instance}${child.menuRoute}`),
        };
      }),
    };
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const fetchAPI = async () => {
    const { data } = await api.get('/');

    setAppVersion(data?.version);
    setDbStatus(data?.connectedToDatabase);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Layout
      style={{
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <HeaderPage setMenuCollaps={setCollapsed} isCollaps={collapsed} />

      <Layout>
        <SideBarPage items={itemsSideBar} collapsed={collapsed} />

        <Layout>
          <BrandCrumbContainer style={{ margin: '0px' }}>
            <div style={{ marginLeft: '20px' }}>
              <Breadcrumb separator=">" items={bCrumbArr} />
            </div>
          </BrandCrumbContainer>

          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              overflow: 'hidden',
              overflowY: 'auto',
            }}
          >
            <Spin
              tip="Carregando..."
              size="large"
              indicator={<Loading />}
              spinning={isLoading}
              style={{ marginTop: '10rem' }}
            >
              {children}
            </Spin>
          </Content>

          <Footer
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '17px',
              fontWeight: '500',
            }}
          >
            <Info
              size={21}
              style={{ marginRight: '5px', cursor: 'pointer' }}
              onClick={handleOpenDrawer}
            />
            {`SGDP - ${instance}  v${appVersion}`}
          </Footer>

          <Drawer
            open={openDrawer}
            onClose={handleOpenDrawer}
            placement="right"
            width={350}
            title="Informações do Sistema"
            appVersion={appVersion}
            dbStatus={dbStatus}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
