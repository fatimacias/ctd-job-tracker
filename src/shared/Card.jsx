import styles from '@styles/shared/Card.module.css';

/**
 * Reusable Card component that wraps content with consistent styling
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside the card
 * @param {string} props.title - Optional title for the card
 * @param {string} props.iconClass - Optional icon class name (e.g., 'icon-database')
 * @param {string} props.variant - Card style variant: 'default', 'primary', 'success', 'danger', 'warning'
 * @param {string} props.className - Additional CSS classes
 */

export default function Card({
  children,
  title,
  iconClass,
  variant = 'default',
  className = '',
}) {
  return (
    <div className={`${styles.card} ${styles[variant]} ${className}`}>
      {(title || iconClass) && (
        <div className={styles.cardHeader}>
          {iconClass && (
            <span className={styles.icon}>
              <span className={`icon ${iconClass}`}></span>
            </span>
          )}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
