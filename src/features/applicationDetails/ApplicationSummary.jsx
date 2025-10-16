export default function ApplicationSummary({ application }) {
  return (
    <div className="detail-card">
      <h3>Application Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <strong>Company:</strong>
          <span>{application.companyData?.name || application.company || 'N/A'}</span>
        </div>
        <div className="summary-item">
          <strong>Position:</strong>
          <span>{application.positionData?.title || application.position || 'N/A'}</span>
        </div>
        <div className="summary-item">
          <strong>Status:</strong>
          <span className={`status ${application.status}`}>{application.status}</span>
        </div>
        <div className="summary-item">
          <strong>Date Applied:</strong>
          <span>{application.dateApplied || 'Not specified'}</span>
        </div>
        <div className="summary-item">
          <strong>Salary:</strong>
          <span>
            {application.salary
              ? `${application.salary} ${application.salaryType ? `(${application.salaryType})` : ''}`
              : 'Not specified'}
          </span>
        </div>
        <div className="summary-item">
          <strong>Work Type:</strong>
          <span>{application.workType || 'Not specified'}</span>
        </div>
        <div className="summary-item">
          <strong>Location:</strong>
          <span>{application.location || 'Not specified'}</span>
        </div>
        <div className="summary-item">
          <strong>Job URL:</strong>
          <span>
            {application.jobUrl ? (
              <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                View Job Posting
              </a>
            ) : (
              'Not provided'
            )}
          </span>
        </div>
      </div>

      {application.jobDescription && (
        <div className="notes-section">
          <strong>Job Description:</strong>
          <p className="job-description">{application.jobDescription}</p>
        </div>
      )}

      {application.skills && (
        <div className="skills-section">
          <strong>Required Skills:</strong>
          <div className="skills-tags">
            {application.skills.split(',').map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {application.companyData?.benefits && (
        <div className="notes-section">
          <strong>Company Benefits:</strong>
          <p>{application.companyData.benefits}</p>
        </div>
      )}

      {application.notes && (
        <div className="notes-section">
          <strong>Additional Notes:</strong>
          <p>{application.notes}</p>
        </div>
      )}
    </div>
  );
}
