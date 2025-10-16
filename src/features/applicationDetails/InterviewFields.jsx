export default function InterviewFields({ additionalData, onChange }) {
  return (
    <>
      <div className="form-row">
        <label>
          Interview Type:
          <select
            name="additional.interviewType"
            value={additionalData.interviewType || ''}
            onChange={onChange}
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
            value={additionalData.round || ''}
            onChange={onChange}
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
            value={additionalData.time || ''}
            onChange={onChange}
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
            value={additionalData.durationMinutes || ''}
            onChange={onChange}
            placeholder="e.g. 30, 45, 60, 90"
            min="0"
            max="480"
            step="5"
          />
        </label>
      </div>

      <label>
        Meeting URL/Location:
        <input
          name="additional.url"
          value={additionalData.url || ''}
          onChange={onChange}
          placeholder="Zoom link or office address"
        />
      </label>

      <label>
        Interviewers:
        <textarea
          name="additional.interviewers"
          value={additionalData.interviewers || ''}
          onChange={onChange}
          placeholder="John Smith - Senior Developer, Jane Doe - PM"
          rows="2"
        />
      </label>
    </>
  );
}
