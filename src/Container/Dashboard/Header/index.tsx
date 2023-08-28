import Logo from '@/assets/images/PRIOLogo.png';
import { Layout } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { HeaderPageContainer } from './style';

interface iHeaderPage {
  setMenuCollaps: Dispatch<SetStateAction<boolean>>;
  isCollaps: boolean;
}

export const HeaderPage = ({ setMenuCollaps, isCollaps }: iHeaderPage) => {
  const { Header } = Layout;

  return (
    <HeaderPageContainer>
      <Header className="headerPage">
        <div className="headerPage__containerlogo">
          <img src={Logo} alt="logo da PRIO" />
        </div>

        <div
          className="headerPage__containerIconMenu"
          onClick={() => {
            setMenuCollaps(!isCollaps);
          }}
        >
          <RiMenuLine className="containerIconMenu__icon" />
        </div>
      </Header>
    </HeaderPageContainer>
  );
};
