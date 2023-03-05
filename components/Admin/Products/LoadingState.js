import styles from '../../../styles/Admin/Products/add.module.css';

const LoadingState = () => {
  return (
    <div className={styles.Nullpanel}>
      <div className={styles.spin}>
      </div>
    </div>
  );
};

export default LoadingState;
