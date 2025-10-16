import styles from '@styles/shared/EmptyState.module.css';

/**
 * Reusable EmptyState component for showing "no data" messages
 * @param {Object} props
 * @param {string} props.iconClass - Icon class name (e.g., 'icon-mailbox')
 * @param {string} props.title - Main message title
 * @param {React.ReactNode} props.children - Additional content (description, buttons, etc.)
 */

export default function EmptyState({ iconClass = 'icon-mailbox', title, children }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>
        <span className={`icon ${iconClass}`}></span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
