import styles from '@styles/shared/Loading.module.css';

/**
 * Reusable Loading component with spinner
 * @param {Object} props
 * @param {string} props.message - Loading message to display (default: "Loading...")
 * @param {string} props.size - Size of spinner: 'small', 'medium', 'large' (default: 'medium')
 */

export default function Loading({ message = 'Loading...', size = 'medium' }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
