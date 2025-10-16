import styles from '@styles/pages/NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span className={styles.four}>4</span>
          <span className={styles.zero}>0</span>
          <span className={styles.four}>4</span>
        </div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or
          deleted.
        </p>

        <div className={styles.linksGrid}>
          <Link to="/" className={styles.linkCard}>
            <span className={`${styles.linkIcon} icon icon-dashboard`}></span>
            <div className={styles.linkText}>
              <strong>Dashboard</strong>
              <span>View all applications</span>
            </div>
          </Link>

          <Link to="/interviews" className={styles.linkCard}>
            <span className={`${styles.linkIcon} icon icon-calendar`}></span>
            <div className={styles.linkText}>
              <strong>Interviews</strong>
              <span>Check your schedule</span>
            </div>
          </Link>

          <Link to="/companies" className={styles.linkCard}>
            <span className={`${styles.linkIcon} icon icon-company`}></span>
            <div className={styles.linkText}>
              <strong>Companies</strong>
              <span>Manage companies</span>
            </div>
          </Link>

          <Link to="/positions" className={styles.linkCard}>
            <span className={`${styles.linkIcon} icon icon-briefcase`}></span>
            <div className={styles.linkText}>
              <strong>Positions</strong>
              <span>Browse positions</span>
            </div>
          </Link>
        </div>

        <Link to="/" className={styles.homeButton}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
