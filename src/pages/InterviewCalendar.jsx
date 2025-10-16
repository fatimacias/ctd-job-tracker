import { useInterviews } from '@hooks/useInterviews';
import EmptyState from '@shared/EmptyState';
import Loading from '@shared/Loading';
import styles from '@styles/features/interviews.module.css';
import { calculateEndTime, formatInterviewDate } from '@utils/interviewHelpers';
import { Link } from 'react-router-dom';

export default function InterviewCalendar() {
  const { interviews, loading, filter, setFilter } = useInterviews();

  if (loading) {
    return (
      <div className="container">
        <h1>Interview Calendar</h1>
        <Loading message="Loading interviews..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.calendarHeader}>
        <div>
          <Link to="/" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1>Interview Calendar</h1>
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${filter === 'upcoming' ? styles.active : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Interviews
          </button>
        </div>
      </div>

      {interviews.length === 0 ? (
        <EmptyState
          iconClass="icon-calendar"
          title={filter === 'upcoming' ? 'No upcoming interviews' : 'No interviews scheduled'}
        >
          {filter === 'upcoming' ? (
            <p>
              You have no upcoming interviews scheduled. Check back later or view all interviews.
            </p>
          ) : (
            <>
              <p>Start scheduling interviews by adding them to your applications.</p>
              <Link to="/" className={`primary ${styles.dashboardLink}`}>
                Go to Dashboard
              </Link>
            </>
          )}
        </EmptyState>
      ) : (
        <div className={styles.interviewList}>
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              to={`/application/${interview.applicationId}`}
              className={styles.interviewCard}
            >
              <div className={styles.interviewHeader}>
                <div className={styles.dateBadge}>
                  {formatInterviewDate(interview.date)}
                  <span className={styles.dateText}>{interview.date}</span>
                </div>
                {interview.time && (
                  <div className={styles.time}>
                    {interview.time}
                    {interview.durationMinutes && (
                      <span className={styles.duration}>
                        {' '}
                        - {calculateEndTime(interview.time, interview.durationMinutes)} (
                        {interview.durationMinutes} min)
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.details}>
                <h4>{interview.company}</h4>
                <p className={styles.position}>{interview.position}</p>

                <div>
                  {interview.interviewType && (
                    <span className={styles.typeBadge}>{interview.interviewType}</span>
                  )}
                  {interview.round && <span className={styles.roundBadge}>{interview.round}</span>}
                  <span
                    className={`${styles.typeBadge} ${interview.status === 'Offer' ? styles.statusOffer : styles.statusInterview}`}
                  >
                    {interview.status}
                  </span>
                </div>
              </div>

              {interview.url && (
                <div className={styles.url}>
                  <span className="icon icon-location"></span>{' '}
                  {interview.url.includes('http') ? 'Virtual' : interview.url}
                </div>
              )}

              {interview.interviewers && (
                <div className={styles.url}>
                  <span className="icon icon-people"></span> {interview.interviewers}
                </div>
              )}

              {interview.notes && (
                <div className={`${styles.url} ${styles.urlWithMargin}`}>
                  <span className="icon icon-note"></span> {interview.notes}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
