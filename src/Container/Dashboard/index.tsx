import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { HeaderPage } from './Header';
import { SideBarPage } from './Menu';
import { BrandCrumbContainer } from './style';

interface iPageContainer {
  children: React.ReactNode;
  bCrumbArr: any;
}

const { Content } = Layout;

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
        className: 'optionSelect',
        style: {
          color: 'black',
        },
      };
    }),
  };
});

export const ContainerPage = ({ children, bCrumbArr }: iPageContainer) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

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
        <SideBarPage items={items2} collapsed={collapsed} />

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
