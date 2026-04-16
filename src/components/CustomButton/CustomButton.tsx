import { Button as MuiButton } from '@mui/material';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './CustomButton.module.scss';

export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'mui';
  icon?: ReactNode;
  muiVariant?: 'text' | 'outlined' | 'contained';
  muiColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const CustomButton = ({
  children,
  isActive = false,
  className,
  variant = 'primary',
  icon,
  muiVariant = 'contained',
  muiColor = 'success',
  ...props
}: CustomButtonProps) => {
  if (variant === 'mui') {
    return (
      <MuiButton
        {...props}
        variant={muiVariant}
        color={muiColor}
        className={[styles.muiButton, className].filter(Boolean).join(' ')}
        startIcon={icon}
      >
        {children}
      </MuiButton>
    );
  }

  const buttonClassName = [
    styles.button,
    variant === 'secondary' ? styles.secondary : '',
    isActive ? styles.active : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...props} className={buttonClassName}>
      {icon ? <span className={styles.buttonIcon}>{icon}</span> : null}
      {children}
    </button>
  );
};

export default CustomButton;
