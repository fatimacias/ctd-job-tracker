import styles from '@styles/shared/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.developer}>
          <strong>Developed by:</strong> Fatima Macias
        </p>
        <p className={styles.program}>
          Built as part of the{' '}
          <a href="https://codethedream.org" target="_blank" rel="noopener noreferrer">
            CTD
          </a>{' '}
          program
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
