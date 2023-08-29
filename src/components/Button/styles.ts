import { Button } from 'antd';
import styled, { css } from 'styled-components';

export type VariantType = 'contained' | 'outlined' | 'error';

interface IButtonStyled {
  variant: VariantType;
  fullWidth: boolean;
}

export const ButtonStyled = styled(Button)<IButtonStyled>`
  border-radius: 4px !important;
  padding: 10px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  transition: opacity 0.1s ease-in-out !important;
  width: max-content !important;
  cursor: pointer;
  min-width: 30px !important;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100% !important;
    `}

  ${({ variant, disabled }) => {
    if (variant === 'contained') {
      return css`
        border: 1px solid transparent !important;
        background-color: ${disabled ? '#b7b7b7' : '#0d7c84'} !important;
        color: #fff !important;
      `;
    } else if (variant === 'outlined') {
      return css`
        border: 1px solid #0d7c84 !important;
        background-color: transparent !important;
        color: #0d7c84 !important;
      `;
    } else if (variant === 'error') {
      return css`
        border: 1px solid transparent !important;
        background-color: #e73636 !important;
        color: #fff !important;
      `;
    }

    if (disabled) {
      return css`
        cursor: not-allowed !important;
      `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }
`;
