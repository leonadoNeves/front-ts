import userPhoto from '@/assets/images/UserPhoto.png';
import { useAuth } from '@/hooks/useAuth';
import useMedia from '@/hooks/useMedia';
import { Layout, Menu } from 'antd';
import { FaPowerOff } from 'react-icons/fa';
import { ContainerLogout, ContainerSideBar, ContainerUserData } from './style';

interface iSideBar {
  collapsed?: boolean;
  items?: any;
}

export const SideBarPage = ({ collapsed, items }: iSideBar) => {
  const mobile = useMedia('(max-width: 768px)');

  const { user, signOut } = useAuth();
  const { Sider } = Layout;

  return (
    <ContainerSideBar isSideBarOpen={!collapsed}>
      <Sider
        width={mobile ? '100vw' : 250}
        collapsible
        collapsed={collapsed}
        className="sideBar"
        trigger={null}
      >
        {!collapsed && (
          <ContainerLogout>
            <button onClick={signOut}>
              <FaPowerOff className="icon" />
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
                <span className="container__userName">{user?.name}</span>
                <span className="container__roleName">{user?.group?.name}</span>
              </>
            )}
          </div>
        </ContainerUserData>

        <Menu
          mode="inline"
          items={items}
          style={{ height: '100%', borderRight: 0 }}
          className="sideBar__menu"
        />
      </Sider>
    </ContainerSideBar>
  );
};
