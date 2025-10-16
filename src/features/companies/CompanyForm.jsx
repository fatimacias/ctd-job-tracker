import formStyles from '@styles/features/companies/CompanyForm.module.css';
import modalStyles from '@styles/shared/Modal.module.css';
import { useEffect, useState } from 'react';

export default function CompanyForm({ onSubmit, onClose, editCompany }) {
  const [form, setForm] = useState({
    name: '',
    website: '',
    industry: '',
    notes: '',
    benefits: '',
  });

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (editCompany) setForm(editCompany);
  }, [editCompany]);

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
    if (!form.name) {
      alert('Company name is required');
      return;
    }

    onSubmit(form);
    handleClose();
    setForm({ name: '', website: '', industry: '', notes: '', benefits: '' });
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
        <h3>{editCompany ? 'Edit Company' : 'Add New Company'}</h3>

        <form className={formStyles.companyForm} onSubmit={handleSubmit}>
          <label>
            Company Name *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Company name"
            />
          </label>

          <label>
            Website
            <input
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              placeholder="https://company.com"
            />
          </label>

          <label>
            Industry
            <select name="industry" value={form.industry} onChange={handleChange}>
              <option value="">Select industry</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Retail</option>
              <option>Manufacturing</option>
              <option>Consulting</option>
              <option>Media</option>
              <option>Government</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Benefits
            <textarea
              name="benefits"
              value={form.benefits}
              onChange={handleChange}
              placeholder="Health insurance, 401k, PTO, etc."
              rows="3"
            />
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Company culture, size, etc."
              rows="3"
            />
          </label>

          <button type="submit" className="primary">
            {editCompany ? 'Update' : 'Add'} Company
          </button>
        </form>
      </div>
    </div>
  );
}
