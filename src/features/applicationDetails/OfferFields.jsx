export default function OfferFields({ additionalData, onChange }) {
  return (
    <>
      <div className="form-row">
        <label>
          Salary Offered:
          <input
            name="additional.salary"
            value={additionalData.salary || ''}
            onChange={onChange}
            placeholder="e.g. $85,000"
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            name="additional.startDate"
            value={additionalData.startDate || ''}
            onChange={onChange}
          />
        </label>
      </div>
    </>
  );
}
