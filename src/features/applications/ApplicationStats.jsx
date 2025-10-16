import styles from '@styles/features/ApplicationStats.module.css';

export default function ApplicationStats({ counts }) {
  const stats = [
    { label: 'Applied', value: counts.Applied || 0, color: 'secondary' },
    { label: 'Interview', value: counts.Interview || 0, color: 'primary' },
    { label: 'Offer', value: counts.Offer || 0, color: 'success' },
    { label: 'Rejected', value: counts.Rejected || 0, color: 'danger' },
  ];

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.title}>Application Status Overview</h3>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
