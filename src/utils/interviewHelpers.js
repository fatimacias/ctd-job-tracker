/**
 * Get all interview details with application data
 */
export const getAllInterviews = async (db) => {
  const allApplications = await db.applications.toArray();
  const interviews = [];

  for (const app of allApplications) {
    const details = await db.applicationDetails.where('applicationId').equals(app.id).toArray();

    const interviewDetails = details.filter((d) => d.type === 'interview');

    for (const detail of interviewDetails) {
      const additionalData = detail.additionalData ? JSON.parse(detail.additionalData) : {};

      // Get company and position data
      const company = await db.companies.get(parseInt(app.companyId));
      const position = await db.positions.get(parseInt(app.positionId));

      interviews.push({
        id: detail.id,
        applicationId: app.id,
        date: detail.date,
        time: additionalData.time || '',
        durationMinutes: additionalData.durationMinutes || 0,
        interviewType: additionalData.interviewType || '',
        round: additionalData.round || '',
        url: additionalData.url || '',
        interviewers: additionalData.interviewers || '',
        notes: detail.notes || '',
        company: company?.name || 'Unknown Company',
        position: position?.title || 'Unknown Position',
        status: app.status,
      });
    }
  }

  return interviews;
};

/**
 * Get upcoming interviews (future only)
 */
export const getUpcomingInterviews = async (db) => {
  const allInterviews = await getAllInterviews(db);
  const today = new Date().toISOString().split('T')[0];

  return allInterviews
    .filter((interview) => interview.date >= today)
    .sort((a, b) => {
      // Sort by date, then by time
      if (a.date === b.date) {
        return (a.time || '').localeCompare(b.time || '');
      }
      return a.date.localeCompare(b.date);
    });
};

/**
 * Get interviews for the next N days
 */
export const getInterviewsNextNDays = async (db, days = 5) => {
  const allInterviews = await getUpcomingInterviews(db);
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);

  const todayStr = today.toISOString().split('T')[0];
  const futureDateStr = futureDate.toISOString().split('T')[0];

  return allInterviews.filter(
    (interview) => interview.date >= todayStr && interview.date <= futureDateStr
  );
};

/**
 * Format date for display
 */
export const formatInterviewDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const interviewDate = new Date(date);
  interviewDate.setHours(0, 0, 0, 0);

  if (interviewDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (interviewDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
};

/**
 * Calculate end time based on start time and duration
 */
export const calculateEndTime = (startTime, durationMinutes) => {
  if (!startTime || !durationMinutes) return '';

  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + parseInt(durationMinutes);
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;

  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};
