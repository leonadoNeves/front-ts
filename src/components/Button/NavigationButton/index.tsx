// import IntlMessages from '@iso/components/utility/intlMessages';
import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from './style';

// const Glow = styled.div`
//   width: 33px;
//   height: 33px;
//   position: absolute;
//   left: 40px;
//   bottom: 6px;
//   background-color: transparent;
//   box-shadow: -60px -20px 20px 6px #ffffff82;
//   overflow: hidden;
// `;

interface iNavigationButton {
  href: string;
  label: string;
  icon: string;
}

const NavigationButton = ({ href, label, icon }: iNavigationButton) => {
  return (
    <Link to={href}>
      <ButtonContainer>
        <Button className="buttonNavigation">
          {icon && (
            <img src={icon} style={{ maxWidth: '100%', height: '3.25rem' }} />
          )}
          {/* <Glow /> */}

          <h3>{label}</h3>
        </Button>
      </ButtonContainer>
    </Link>
  );
};

export default NavigationButton;
