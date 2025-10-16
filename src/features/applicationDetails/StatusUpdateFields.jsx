export default function StatusUpdateFields({ status, onChange }) {
  return (
    <label>
      New Status:
      <select name="status" value={status} onChange={onChange} required>
        <option value="">Select status</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </label>
  );
}
