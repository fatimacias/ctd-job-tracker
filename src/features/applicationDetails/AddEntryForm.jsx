import styles from '@styles/pages/ApplicationDetail.module.css';
import InterviewFields from './InterviewFields';
import OfferFields from './OfferFields';

export default function AddEntryForm({
  newDetail,
  onChange,
  onSubmit,
  editingDetail,
  onCancelEdit,
}) {
  const renderDynamicFields = () => {
    switch (newDetail.type) {
      case 'interview':
        return <InterviewFields additionalData={newDetail.additionalData} onChange={onChange} />;

      case 'offer':
        return <OfferFields additionalData={newDetail.additionalData} onChange={onChange} />;

      default:
        return null;
    }
  };

  return (
    <div className="detail-card">
      <h3>{editingDetail ? 'Edit Entry' : 'Add New Entry'}</h3>
      <form onSubmit={onSubmit} className={styles.detailForm}>
        <div className="form-row">
          <label>
            Entry Type:
            <select name="type" value={newDetail.type} onChange={onChange} required>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejection">Rejection</option>
              <option value="ghosted">Ghosted</option>
              <option value="follow_up">Follow Up</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Date:
            <input type="date" name="date" value={newDetail.date} onChange={onChange} required />
          </label>
        </div>

        {renderDynamicFields()}

        <label>
          Notes:
          <textarea
            name="notes"
            value={newDetail.notes}
            onChange={onChange}
            placeholder="Additional notes or comments"
            rows="3"
          />
        </label>

        <div className={styles.formButtons}>
          <button type="submit" className="primary">
            {editingDetail ? 'Update Entry' : 'Add Entry'}
          </button>
          {editingDetail && (
            <button type="button" className="secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
