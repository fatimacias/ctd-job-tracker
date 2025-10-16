import { db } from '@db/indexedDbClient';
import styles from '@styles/features/interviews.module.css';
import { formatInterviewDate, getInterviewsNextNDays } from '@utils/interviewHelpers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const upcomingInterviews = await getInterviewsNextNDays(db, 5);
      setInterviews(upcomingInterviews);
    } catch (error) {
      console.error('Error loading interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-card">
        <h3>
          <span className="icon icon-calendar"></span> Upcoming Interviews (Next 5 Days)
        </h3>
        <p className="empty-state">Loading...</p>
      </div>
    );
  }

  return (
    <div className="detail-card">
      <div className={styles.header}>
        <h3>
          <span className="icon icon-calendar"></span> Upcoming Interviews (Next 5 Days)
        </h3>
        <Link to="/interviews" className="action-btn primary">
          View All
        </Link>
      </div>

      {interviews.length === 0 ? (
        <p className="empty-state">No interviews scheduled in the next 5 days</p>
      ) : (
        <div className={styles.compactList}>
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              to={`/application/${interview.applicationId}`}
              className={styles.compactCard}
            >
              <div className={styles.compactLeft}>
                <div className={styles.dateBadge}>{formatInterviewDate(interview.date)}</div>
                {interview.time && (
                  <div className={styles.time}>
                    {interview.time}
                    {interview.durationMinutes && (
                      <span className={styles.duration}> ({interview.durationMinutes}m)</span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.compactRight}>
                <div className={styles.compactInfo}>
                  <strong>{interview.company}</strong>
                  <span className={styles.separator}>•</span>
                  <span>{interview.position}</span>
                </div>
                <div className={styles.badges}>
                  {interview.interviewType && (
                    <span className={styles.typeBadge}>{interview.interviewType}</span>
                  )}
                  {interview.round && <span className={styles.roundBadge}>{interview.round}</span>}
                  {interview.url && (
                    <span className={styles.locationBadge}>
                      <span className="icon icon-location"></span>{' '}
                      {interview.url.includes('http') ? 'Virtual' : interview.url}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
