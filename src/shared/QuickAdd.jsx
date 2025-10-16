import { useState } from 'react';
import styles from '@styles/shared/QuickAdd.module.css';

export default function QuickAdd({ children, onQuickAdd, placeholder, buttonText }) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickValue, setQuickValue] = useState('');

  const handleQuickSubmit = async () => {
    if (!quickValue.trim()) return;

    try {
      await onQuickAdd(quickValue.trim());
      setQuickValue('');
      setShowQuickAdd(false);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuickSubmit();
    } else if (e.key === 'Escape') {
      setShowQuickAdd(false);
      setQuickValue('');
    }
  };

  return (
    <div className={styles.quickAddWrapper}>
      {children}

      <button
        type="button"
        className={styles.quickAddBtn}
        onClick={() => setShowQuickAdd(!showQuickAdd)}
      >
        + {buttonText}
      </button>

      {showQuickAdd && (
        <div className={styles.quickAddForm}>
          <div className={styles.quickAddInputGroup}>
            <input
              type="text"
              value={quickValue}
              onChange={(e) => setQuickValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              autoFocus
            />
            <div className={styles.quickAddActions}>
              <button
                type="button"
                className={`primary ${styles.quickAddSave}`}
                onClick={handleQuickSubmit}
              >
                ✓
              </button>
              <button
                type="button"
                className={styles.quickAddCancel}
                onClick={() => {
                  setShowQuickAdd(false);
                  setQuickValue('');
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
