import styles from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
  className?: string;
  errorText?: string;
}

const ErrorMessage = ({
  className,
  errorText = 'Ошибка загрузки данных: превышено время ожидания.',
}: ErrorMessageProps) => {
  return <div className={`${styles['error-message']} ${className ?? ''}`}>{errorText}</div>;
};

export default ErrorMessage;
