import { ButtonProps } from 'antd';
import { ButtonStyled, VariantType } from './styles';

interface IButton extends ButtonProps {
  variant?: VariantType;
  onClick: () => void;
  text?: string;
}

export function Button({
  htmlType = 'button',
  text,
  icon,
  variant = 'contained',
  onClick,
  disabled = false,
  ...rest
}: IButton) {
  // const Icon = getIcon(icon);

  return (
    <ButtonStyled
      htmlType={htmlType}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    ></ButtonStyled>
  );
}
