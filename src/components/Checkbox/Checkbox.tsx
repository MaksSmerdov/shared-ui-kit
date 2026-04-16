import { Checkbox as MuiCheckbox, type CheckboxProps as MuiCheckboxProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends MuiCheckboxProps {
  className?: string;
}

const baseSx: SxProps<Theme> = {
  color: 'var(--text-muted)',
  '&.Mui-checked': {
    color: 'var(--hulk)',
  },
};

const Checkbox = ({ className, sx, ...props }: CheckboxProps) => {
  const rootClassName = [styles.checkbox, className].filter(Boolean).join(' ');
  const normalizedSx = (
    Array.isArray(sx) ? [baseSx, ...(sx as SxProps<Theme>[])] : sx ? [baseSx, sx] : [baseSx]
  ) as MuiCheckboxProps['sx'];

  return <MuiCheckbox {...props} className={rootClassName} sx={normalizedSx} />;
};

export default Checkbox;
