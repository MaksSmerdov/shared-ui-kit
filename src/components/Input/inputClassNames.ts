import styles from './Input.module.scss';

export const inputClassNames = {
  default: styles.input,
  form: styles['input-form'],
  error: styles.error,
} as const;
