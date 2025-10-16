import '@styles/utilities.css';

export default function PositionList({ positions, onEdit, onDelete }) {
  if (positions.length === 0) {
    return <p>No positions added yet.</p>;
  }

  return (
    <div className="table-container">
      <table className="app-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Department</th>
            <th>Level</th>
            <th>Key Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>
                <strong>{position.title}</strong>
              </td>
              <td>{position.department || 'Not specified'}</td>
              <td>{position.level || 'Not specified'}</td>
              <td>
                {position.skills ? (
                  <div className="skills-tags">
                    {position.skills.split(',').map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  'Not specified'
                )}
              </td>
              <td>
                <div className="table-actions">
                  <button className="action-btn edit-btn" onClick={() => onEdit(position)}>
                    Edit
                  </button>
                  <button className="action-btn danger" onClick={() => onDelete(position.id)}>
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
