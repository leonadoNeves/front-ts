/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContainerSideBar, ContainerLogout, ContainerUserData } from './style';
import { Layout, Menu } from 'antd';
import userPhoto from '@/assets/UserPhoto.png';
import { CiLogout } from 'react-icons/ci';

interface iSideBar {
  collapsed?: boolean;
  items?: any;
}

const SideBarPage = ({ collapsed, items }: iSideBar) => {
  const { Sider } = Layout;

  return (
    <ContainerSideBar isSideBarOpen={collapsed}>
      <Sider
        width={200}
        collapsible
        collapsed={collapsed}
        className="sideBar"
        trigger={null}
      >
        {!collapsed && (
          <ContainerLogout>
            <button>
              <CiLogout className="icon" />
            </button>
          </ContainerLogout>
        )}
        <ContainerUserData isSideBarOpen={collapsed}>
          <div className="container">
            <div className="container__imageContainer">
              <img src={userPhoto} alt="Foto do usuário" />
            </div>
            {!collapsed && (
              <>
                <span className="container__userName">NOME DO USUÁRIO</span>
                <span className="container__roleName">Cargo</span>
              </>
            )}
          </div>
        </ContainerUserData>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          className="sideBar__menu"
        />
      </Sider>
    </ContainerSideBar>
  );
};

export default SideBarPage;
