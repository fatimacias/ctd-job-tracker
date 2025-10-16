import '@styles/utilities.css';

export default function CompanyList({ companies, onEdit, onDelete }) {
  if (companies.length === 0) {
    return <p>No companies added yet.</p>;
  }

  return (
    <div className="table-container">
      <table className="app-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Industry</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>
                <strong>{company.name}</strong>
                {company.notes && <p className="table-notes">{company.notes}</p>}
              </td>
              <td>{company.industry || 'Not specified'}</td>
              <td>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    Visit
                  </a>
                ) : (
                  'Not provided'
                )}
              </td>
              <td>
                <div className="table-actions">
                  <button className="action-btn edit-btn" onClick={() => onEdit(company)}>
                    Edit
                  </button>
                  <button className="action-btn danger" onClick={() => onDelete(company.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
