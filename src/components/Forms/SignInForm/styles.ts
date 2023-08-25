import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #0d7c84 0%, #04bf8a 100%);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled(Form)`
  background: ${({ theme }) => theme['gray-100']};
  height: 80vh;
  width: 100%;
  margin: 20px;
  max-width: 500px;
  width: 100%;
  padding: 60px;
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 100%;
  margin-bottom: 80px;
`;
