import { Button } from 'antd';
import styled from 'styled-components';

export type VariantType = 'contained' | 'outlined' | 'error';

interface IButtonStyled {
  variant: VariantType;
}

export const ButtonStyled = styled(Button)<IButtonStyled>``;
