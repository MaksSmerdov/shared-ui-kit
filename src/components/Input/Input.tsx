import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { KeyboardEvent } from 'react';
import styles from './Input.module.scss';

interface InputPropsWithoutForm extends Omit<TextFieldProps, 'error' | 'helperText'> {
  label?: string;
  error?: string;
  inputVariant?: 'default' | 'form';
  control?: never;
  name?: never;
}

interface InputPropsWithForm extends Omit<TextFieldProps, 'error' | 'helperText' | 'name'> {
  label?: string;
  error?: string;
  inputVariant?: 'default' | 'form';
  name: string;
  control: unknown;
}

export type InputProps = InputPropsWithoutForm | InputPropsWithForm;

const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  const form = event.currentTarget.closest('form');
  const submitButton = form?.querySelector('button[type="submit"], input[type="submit"]');

  if (submitButton instanceof HTMLButtonElement || submitButton instanceof HTMLInputElement) {
    if (!submitButton.disabled) {
      submitButton.click();
    }
  }
};

function Input({ label, error, name, control, inputVariant = 'default', ...rest }: InputProps) {
  const variantClass = inputVariant === 'form' ? styles['input-form'] : styles['input'];

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={label}
            error={Boolean(fieldState.error) || Boolean(error)}
            helperText={fieldState.error?.message || error}
            {...rest}
            onKeyDown={handleKeyDown}
            className={`${variantClass} ${fieldState.error || error ? styles.error : ''}`}
          />
        )}
      />
    );
  }

  return (
    <TextField
      label={label}
      error={Boolean(error)}
      helperText={error}
      {...rest}
      onKeyDown={handleKeyDown}
      className={`${variantClass} ${error ? styles.error : ''}`}
    />
  );
}

export default Input;
