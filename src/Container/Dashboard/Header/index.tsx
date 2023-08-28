import React from 'react';
import { Layout } from 'antd';
import HeaderPageContainer from './style';
import Logo from '@/assets/images/PRIOLogo.png';
import { RiMenuLine } from 'react-icons/ri';

interface iHeaderPage {
  setMenuCollaps: React.Dispatch<React.SetStateAction<boolean>>;
  isCollaps: boolean;
}

const HeaderPage = ({ setMenuCollaps, isCollaps }: iHeaderPage) => {
  const { Header } = Layout;

  return (
    <HeaderPageContainer isSideBarOpen={isCollaps}>
      <Header
        className={'headerPage'}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div className="headerPage__containerlogo">
          <img src={Logo} alt="logo da PRIO" />
        </div>
        <div
          className="headerPage__containerIconMenu"
          onClick={() => {
            setMenuCollaps(!isCollaps);
          }}
        >
          <RiMenuLine className={'containerIconMenu__icon'} />
        </div>
      </Header>
    </HeaderPageContainer>
  );
};

export default HeaderPage;
