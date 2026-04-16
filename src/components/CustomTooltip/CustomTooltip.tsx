import { Fade, Tooltip, type TooltipProps } from '@mui/material';
import type { ReactElement } from 'react';

export interface CustomTooltipProps extends Omit<TooltipProps, 'children'> {
  children: ReactElement;
  title: string;
}

const CustomTooltip = ({ children, title, ...rest }: CustomTooltipProps) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement="top"
      slots={{ transition: Fade }}
      slotProps={{ transition: { timeout: 150 } }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
