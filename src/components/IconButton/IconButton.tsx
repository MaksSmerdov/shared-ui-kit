import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
  type TooltipProps,
} from '@mui/material';
import type { ReactNode } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import styles from './IconButton.module.scss';

type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'children'> {
  icon: ReactNode;
  tooltip?: string;
  placement?: TooltipProps['placement'];
  size?: IconButtonSize;
  children?: never;
}

const IconButton = ({
  icon,
  tooltip,
  placement = 'bottom',
  size = 'medium',
  className,
  sx,
  ...props
}: IconButtonProps) => {
  const buttonClassName = [styles.iconButton, styles[`iconButton_${size}`], className].filter(Boolean).join(' ');

  const button = (
    <MuiIconButton {...props} size={size} className={buttonClassName} sx={sx}>
      {icon}
    </MuiIconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={placement}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default IconButton;
