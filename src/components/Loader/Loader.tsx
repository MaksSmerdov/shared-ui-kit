import styles from './Loader.module.scss';

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

const Loader = ({ size = 'medium' }: LoaderProps) => (
  <div className={styles.loader}>
    <div className={`${styles.spinner} ${styles[`spinner--${size}`]}`} />
  </div>
);

export default Loader;
