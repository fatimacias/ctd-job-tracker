import styles from '@styles/shared/Toast.module.css';
import { useEffect, useState } from 'react';

/**
 * Toast notification component
 * @param {Object} props
 * @param {string} props.message - Message to display
 * @param {string} props.type - Type: 'success', 'error', 'warning', 'info'
 * @param {function} props.onClose - Callback when toast closes
 */

export default function Toast({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 300);
  };

  const getIconClass = () => {
    switch (type) {
      case 'success':
        return 'icon-success';
      case 'error':
        return 'icon-error';
      case 'warning':
        return 'icon-warning';
      case 'info':
        return 'icon-info';
      default:
        return 'icon-success';
    }
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${isVisible && !isLeaving ? styles.visible : ''} ${isLeaving ? styles.leaving : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className={`icon ${getIconClass()} ${styles.icon}`}></span>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeBtn} onClick={handleClose} aria-label="Close notification">
        <span className="icon icon-close"></span>
      </button>
    </div>
  );
}
