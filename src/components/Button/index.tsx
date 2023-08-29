import getIcon from '@/utils/getIcon';
import { ButtonProps, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ButtonStyled, VariantType } from './styles';

interface IButton extends ButtonProps {
  variant?: VariantType;
  fullWidth?: boolean;
  icon?: string;
  toolTipMessage?: string;
  toolTipPosition?: TooltipPlacement | undefined;
}

export function Button({
  htmlType = 'button',
  title,
  icon,
  variant = 'contained',
  onClick,
  disabled = false,
  fullWidth = false,
  toolTipMessage,
  toolTipPosition,
  ...rest
}: IButton) {
  const Icon = getIcon(icon ? icon : '');

  return (
    <Tooltip
      title={toolTipMessage}
      placement={toolTipPosition ? toolTipPosition : 'topLeft'}
      showArrow={toolTipMessage ? true : false}
    >
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
    </Tooltip>
  );
}
