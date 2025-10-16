export default function Timeline({ details, onDeleteDetail, onEditDetail }) {
  return (
    <div className="detail-card">
      <h3>Timeline & History</h3>
      {details.length > 0 ? (
        <div className="timeline">
          {details.map((detail) => (
            <div key={detail.id} className={`timeline-item timeline-${detail.type}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-type">
                    {detail.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="timeline-date">{detail.date}</span>
                  <div className="timeline-actions">
                    <button
                      className="edit-detail-btn"
                      onClick={() => onEditDetail(detail)}
                      title="Edit entry"
                    >
                      <span className="icon icon-edit"></span>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDeleteDetail(detail.id)}
                      title="Delete entry"
                    >
                      <span className="icon icon-close"></span>
                    </button>
                  </div>
                </div>

                {detail.notes && <p className="timeline-notes">{detail.notes}</p>}

                {detail.additionalData && Object.keys(detail.additionalData).length > 0 && (
                  <div className="timeline-additional">
                    {Object.entries(detail.additionalData).map(
                      ([key, value]) =>
                        value && (
                          <div key={key} className="additional-item">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No timeline entries yet.</p>
      )}
    </div>
  );
}
