import '@styles/utilities.css';
import { useNavigate } from 'react-router-dom';

export default function ApplicationList({ apps, onSelect, onDelete }) {
  const navigate = useNavigate();

  const handleDoubleClick = (app) => {
    navigate(`/application/${app.id}`);
  };

  const handleViewDetails = (e, app) => {
    e.stopPropagation();
    navigate(`/application/${app.id}`);
  };

  if (!apps.length) return <p>No applications found.</p>;

  return (
    <table className="app-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Position</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {apps.map((a) => (
          <tr
            key={a.id}
            onClick={() => onSelect(a)}
            onDoubleClick={() => handleDoubleClick(a)}
            className="table-row"
          >
            <td>{a.company}</td>
            <td>{a.position}</td>
            <td>
              <span className={`status ${a.status}`}>{a.status}</span>
            </td>
            <td>{a.dateApplied || '-'}</td>
            <td>{a.lastUpdated || '-'}</td>
            <td>
              <div className="table-actions">
                <button
                  className="action-btn primary"
                  onClick={(e) => handleViewDetails(e, a)}
                  title="View full details"
                >
                  Details
                </button>
                <button
                  className="action-btn danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(a.id);
                  }}
                  title="Delete application"
                >
                  <span className="icon icon-delete"></span> Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
