import { useAuth } from '@/hooks/useAuth';
import { getIconSideBar } from '@/utils/getIconSideBar';
import { Breadcrumb, Layout, theme } from 'antd';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderPage } from './Header';
import { SideBarPage } from './Menu';
import { BrandCrumbContainer } from './style';

interface IPageContainer {
  children: ReactNode;
  bCrumbArr: any;
}

const { Content } = Layout;

export const ContainerPage = ({ children, bCrumbArr }: IPageContainer) => {
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const itemsSideBar = user?.userPermissions?.map(elem => {
    return {
      key: `${elem.menuOrder}`,
      icon: getIconSideBar(elem.menuIcon),
      label: `${elem.menuName}`,
      onClick: () => navigate(`${elem.menuRoute}`),
      children: elem.children?.map(child => {
        return {
          key: `${child.menuOrder}`,
          label: `${child.menuName}`,
          onClick: () => navigate(`${child.menuRoute}`),
        };
      }),
    };
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <BrandCrumbContainer>
            <Breadcrumb separator=">" items={bCrumbArr} />
          </BrandCrumbContainer>

          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              overflowY: 'auto',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
