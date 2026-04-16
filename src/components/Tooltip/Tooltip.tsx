import { Fade, Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import type { ReactElement } from 'react';

export interface TooltipPropsBase extends Omit<TooltipProps, 'children'> {
  children: ReactElement;
  title: string;
}

const Tooltip = ({ children, title, ...rest }: TooltipPropsBase) => {
  return (
    <MuiTooltip
      title={title}
      arrow
      placement="top"
      slots={{ transition: Fade }}
      slotProps={{ transition: { timeout: 150 } }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
