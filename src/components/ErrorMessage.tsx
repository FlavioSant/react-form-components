import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <span className={styles['error-message']}>{error}</span>
);
