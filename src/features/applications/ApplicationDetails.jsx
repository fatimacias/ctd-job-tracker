import { addDetail, deleteDetail, getDetailsByApplication } from '@db/indexedDbClient';
import '@styles/modal.css';
import { useCallback, useEffect, useState } from 'react';

export default function ApplicationDetails({ app, onClose, onUpdate }) {
  const [details, setDetails] = useState([]);
  const [newDetail, setNewDetail] = useState({
    type: 'status_update',
    status: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    additionalData: {},
  });
  const [closing, setClosing] = useState(false);

  const loadDetails = useCallback(async () => {
    if (app?.id) {
      const data = await getDetailsByApplication(app.id);
      setDetails(data);
    }
  }, [app?.id]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  async function handleAddDetail(e) {
    e.preventDefault();
    if (!newDetail.type || !newDetail.date) {
      alert('Type and Date are required');
      return;
    }

    await addDetail({
      applicationId: app.id,
      type: newDetail.type,
      date: newDetail.date,
      notes: newDetail.notes,
      additionalData: newDetail.additionalData,
    });

    if (newDetail.status) {
      await onUpdate(app.id, { status: newDetail.status, lastUpdated: newDetail.date });
    }

    await loadDetails();

    setNewDetail({
      type: 'status_update',
      status: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      additionalData: {},
    });
  }

  async function handleDeleteDetail(id) {
    await deleteDetail(id);
    await loadDetails();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('additional.')) {
      const field = name.substring(11);
      setNewDetail((prev) => ({
        ...prev,
        additionalData: { ...prev.additionalData, [field]: value },
      }));
    } else {
      setNewDetail((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderDynamicFields = () => {
    switch (newDetail.type) {
      case 'interview':
        return (
          <>
            <div className="form-row">
              <label>
                Interview Type:
                <select
                  name="additional.interviewType"
                  value={newDetail.additionalData.interviewType || ''}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option>Phone Screen</option>
                  <option>Video Interview</option>
                  <option>On-site</option>
                  <option>Technical</option>
                  <option>Behavioral</option>
                  <option>Final Round</option>
                </select>
              </label>

              <label>
                Interview Round:
                <input
                  name="additional.round"
                  value={newDetail.additionalData.round || ''}
                  onChange={handleChange}
                  placeholder="e.g. Round 1, Technical"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Time:
                <input
                  type="time"
                  name="additional.time"
                  value={newDetail.additionalData.time || ''}
                  onChange={handleChange}
                  pattern="[0-9]{2}:[0-9]{2}"
                  placeholder="HH:MM"
                  title="Please enter time in HH:MM format (e.g., 14:30)"
                />
              </label>

              <label>
                Duration (minutes):
                <input
                  type="number"
                  name="additional.durationMinutes"
                  value={newDetail.additionalData.durationMinutes || ''}
                  onChange={handleChange}
                  placeholder="e.g. 45, 60, 90"
                  min="1"
                  max="480"
                  step="5"
                />
              </label>
            </div>

            <label>
              Meeting URL/Location:
              <input
                name="additional.url"
                value={newDetail.additionalData.url || ''}
                onChange={handleChange}
                placeholder="Zoom link or office address"
              />
            </label>

            <label>
              Interviewers:
              <textarea
                name="additional.interviewers"
                value={newDetail.additionalData.interviewers || ''}
                onChange={handleChange}
                placeholder="John Smith - Senior Developer, Jane Doe - PM"
                rows="2"
              />
            </label>
          </>
        );

      case 'offer':
        return (
          <>
            <div className="form-row">
              <label>
                Salary Offered:
                <input
                  name="additional.salary"
                  value={newDetail.additionalData.salary || ''}
                  onChange={handleChange}
                  placeholder="e.g. $85,000"
                />
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  name="additional.startDate"
                  value={newDetail.additionalData.startDate || ''}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Benefits:
              <textarea
                name="additional.benefits"
                value={newDetail.additionalData.benefits || ''}
                onChange={handleChange}
                placeholder="Health, dental, 401k, PTO, etc."
                rows="2"
              />
            </label>
          </>
        );

      case 'status_update':
        return (
          <label>
            New Status:
            <select name="status" value={newDetail.status} onChange={handleChange} required>
              <option value="">Select status</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`modal-overlay ${closing ? 'closing' : 'active'}`} onClick={handleClose}>
      <div
        className={`modal ${closing ? 'closing' : 'active'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>

        <h3>Details for {app.company}</h3>
        <p>
          <strong>Position:</strong> {app.position}
        </p>
        <p>
          <strong>Current Status:</strong> {app.status}
        </p>

        <h4>History</h4>
        {details.length ? (
          <ul className="details-list">
            {details.map((d) => (
              <li key={d.id} className={`detail-item detail-${d.type}`}>
                <div className="detail-header">
                  <span className="detail-type">{d.type.replace('_', ' ').toUpperCase()}</span>
                  <span className="detail-date">{d.date}</span>
                  <button className="danger detail-delete" onClick={() => handleDeleteDetail(d.id)}>
                    ✕
                  </button>
                </div>

                {d.notes && <p className="detail-notes">{d.notes}</p>}

                {d.additionalData && Object.keys(d.additionalData).length > 0 && (
                  <div className="additional-info">
                    {Object.entries(d.additionalData).map(
                      ([key, value]) =>
                        value && (
                          <div key={key} className="info-item">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                          </div>
                        )
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history yet.</p>
        )}

        <form onSubmit={handleAddDetail} className="detail-form">
          <h4>Add New Entry</h4>

          <div className="form-row">
            <label>
              Entry Type:
              <select name="type" value={newDetail.type} onChange={handleChange} required>
                <option value="status_update">Status Update</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejection">Rejection</option>
                <option value="follow_up">Follow Up</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newDetail.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {renderDynamicFields()}

          <label>
            Notes:
            <textarea
              name="notes"
              value={newDetail.notes}
              onChange={handleChange}
              placeholder="Additional notes or comments"
              rows="3"
            />
          </label>

          <button type="submit" className="primary">
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
}
