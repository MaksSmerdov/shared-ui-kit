import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ru.js';
import styles from './DatePicker.module.scss';

export interface DatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  compact?: boolean;
}

const DatePicker = ({ label, value, onChange, compact = false }: DatePickerProps) => {
  const inputClass = compact ? `${styles['date-picker']} ${styles['date-picker_compact']}` : styles['date-picker'];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <MuiDatePicker
        label={compact ? undefined : label}
        value={value}
        onChange={onChange}
        className={inputClass}
        slotProps={{
          textField: {
            size: compact ? 'small' : 'medium',
            placeholder: compact ? 'Дата' : undefined,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
