import formStyles from '@styles/features/positions/PositionForm.module.css';
import modalStyles from '@styles/shared/Modal.module.css';
import { useEffect, useState } from 'react';

export default function PositionForm({ onSubmit, onClose, editPosition }) {
  const [form, setForm] = useState({
    title: '',
    department: '',
    level: '',
    skills: '',
  });

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (editPosition) setForm(editPosition);
  }, [editPosition]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      alert('Position title is required');
      return;
    }

    onSubmit(form);
    handleClose();
    setForm({ title: '', department: '', level: '', skills: '' });
  };

  return (
    <div
      className={`${modalStyles.modalOverlay} ${closing ? modalStyles.closing : modalStyles.active}`}
      onClick={handleClose}
    >
      <div
        className={`${modalStyles.modal} ${closing ? modalStyles.closing : modalStyles.active}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.closeBtn} onClick={handleClose}>
          ✕
        </button>
        <h3>{editPosition ? 'Edit Position' : 'Add New Position'}</h3>

        <form className={formStyles.positionForm} onSubmit={handleSubmit}>
          <label>
            Position Title *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Frontend Developer, Product Manager, etc."
            />
          </label>

          <label>
            Department
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">Select department</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Operations</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Data</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Level
            <select name="level" value={form.level} onChange={handleChange}>
              <option value="">Select level</option>
              <option>Intern</option>
              <option>Entry Level</option>
              <option>Junior</option>
              <option>Mid Level</option>
              <option>Senior</option>
              <option>Staff</option>
              <option>Principal</option>
              <option>Manager</option>
              <option>Senior Manager</option>
              <option>Director</option>
              <option>VP</option>
              <option>C-Level</option>
            </select>
          </label>

          <label>
            Key Skills
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, Node.js, Python, Project Management, etc."
              rows="3"
            />
          </label>

          <button type="submit" className="primary">
            {editPosition ? 'Update' : 'Add'} Position
          </button>
        </form>
      </div>
    </div>
  );
}
