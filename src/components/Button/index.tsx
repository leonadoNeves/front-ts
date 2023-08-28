import getIcon from '@/utils/getIcon';
import { ButtonProps } from 'antd';
import { ButtonStyled, VariantType } from './styles';

interface IButton extends ButtonProps {
  variant?: VariantType;
  fullWidth?: boolean;
  icon?: string;
}

export function Button({
  htmlType = 'button',
  title,
  icon,
  variant = 'contained',
  onClick,
  disabled = false,
  fullWidth = false,
  ...rest
}: IButton) {
  const Icon = getIcon(icon ? icon : '');

  return (
    <ButtonStyled
      htmlType={htmlType}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      {...rest}
    >
      {icon && <Icon size={16} />}
      {title && title}
    </ButtonStyled>
  );
}
