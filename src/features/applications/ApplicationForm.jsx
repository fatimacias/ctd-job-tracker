import { addCompany, addPosition, getAllCompanies, getAllPositions } from '@db/indexedDbClient';
import SimpleInputModal from '@shared/SimpleInputModal';
import formStyles from '@styles/features/applications/ApplicationForm.module.css';
import modalStyles from '@styles/shared/Modal.module.css';
import '@styles/utilities.css';
import { useEffect, useState } from 'react';

export default function ApplicationForm({ onSubmit, onClose, editApp }) {
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [form, setForm] = useState({
    companyId: '',
    positionId: '',
    status: 'Applied',
    dateApplied: getTodayDate(),
    salary: '',
    salaryType: 'yearly',
    jobUrl: '',
    jobDescription: '',
    workType: '',
    location: '',
    skills: '',
    notes: '',
  });

  const [closing, setClosing] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddPositionModal, setShowAddPositionModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editApp) setForm(editApp);
  }, [editApp]);

  const loadData = async () => {
    try {
      const [companiesData, positionsData] = await Promise.all([
        getAllCompanies(),
        getAllPositions(),
      ]);
      setCompanies(companiesData);
      setPositions(positionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'companyId' && value === 'add-new') {
      setShowAddCompanyModal(true);
      return;
    }

    if (name === 'positionId' && value === 'add-new') {
      setShowAddPositionModal(true);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickAddCompany = async (companyName) => {
    const id = await addCompany({
      name: companyName,
      website: '',
      industry: '',
      notes: '',
      benefits: '',
    });
    const newCompany = {
      id,
      name: companyName,
      website: '',
      industry: '',
      notes: '',
      benefits: '',
    };
    setCompanies((prev) => [...prev, newCompany]);
    setForm((prev) => ({ ...prev, companyId: id }));
  };

  const handleQuickAddPosition = async (positionTitle) => {
    const id = await addPosition({ title: positionTitle, department: '', level: '', skills: '' });
    const newPosition = { id, title: positionTitle, department: '', level: '', skills: '' };
    setPositions((prev) => [...prev, newPosition]);
    setForm((prev) => ({ ...prev, positionId: id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.companyId || !form.positionId) {
      alert('Company and Position are required');
      return;
    }

    const today = getTodayDate();
    const submissionData = {
      ...form,
      dateApplied: form.dateApplied || today,
      lastUpdated: today,
    };

    onSubmit(submissionData);
    handleClose();
    setForm({
      companyId: '',
      positionId: '',
      status: 'Applied',
      dateApplied: getTodayDate(),
      salary: '',
      salaryType: 'yearly',
      jobUrl: '',
      jobDescription: '',
      workType: '',
      location: '',
      skills: '',
      notes: '',
    });
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
        <h3>{editApp ? 'Edit Application' : 'Add New Application'}</h3>

        <form className={formStyles.applicationForm} onSubmit={handleSubmit}>
          <div className={formStyles.formSection}>
            <label>
              Company *
              <select name="companyId" value={form.companyId} onChange={handleChange} required>
                <option value="">Select a company</option>
                <option value="add-new">Add New Company...</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Position *
              <select name="positionId" value={form.positionId} onChange={handleChange} required>
                <option value="">Select a position</option>
                <option value="add-new">Add New Position...</option>
                {positions?.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={formStyles.formSection}>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </label>

            <label>
              Date Applied
              <input
                type="date"
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={formStyles.formSection}>
            <label>
              Salary
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. $70,000 or $35/hr"
              />
            </label>

            <label>
              Salary Type
              <select name="salaryType" value={form.salaryType} onChange={handleChange}>
                <option value="yearly">Yearly</option>
                <option value="hourly">Hourly</option>
              </select>
            </label>
          </div>

          <div className={formStyles.formSection}>
            <label>
              Work Type
              <select name="workType" value={form.workType} onChange={handleChange}>
                <option value="">Select work type</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </label>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City, State or Remote"
              />
            </label>
          </div>

          <div className={`${formStyles.formSection} ${formStyles.single}`}>
            <label>
              Job URL
              <input
                name="jobUrl"
                type="url"
                value={form.jobUrl}
                onChange={handleChange}
                placeholder="https://company.com/jobs/123"
              />
            </label>
          </div>

          <div className={`${formStyles.formSection} ${formStyles.single}`}>
            <label>
              Job Description
              <textarea
                name="jobDescription"
                value={form.jobDescription}
                onChange={handleChange}
                placeholder="Paste or write the job description here..."
                rows="4"
              />
            </label>
          </div>

          <div className={`${formStyles.formSection} ${formStyles.single}`}>
            <label>
              Required Skills
              <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, TypeScript, AWS, etc."
                rows="2"
              />
            </label>
          </div>

          <div className={`${formStyles.formSection} ${formStyles.single}`}>
            <label>
              Notes
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes about this application"
                rows="3"
              />
            </label>
          </div>

          <div className={formStyles.formActions}>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="primary">
              {editApp ? 'Update' : 'Add'} Application
            </button>
          </div>
        </form>
      </div>

      {showAddCompanyModal && (
        <SimpleInputModal
          title="Add New Company"
          label="Company Name"
          placeholder="Enter company name"
          onSubmit={(name) => {
            handleQuickAddCompany(name);
            setShowAddCompanyModal(false);
          }}
          onClose={() => setShowAddCompanyModal(false)}
        />
      )}

      {showAddPositionModal && (
        <SimpleInputModal
          title="Add New Position"
          label="Position Title"
          placeholder="Enter position title"
          onSubmit={(title) => {
            handleQuickAddPosition(title);
            setShowAddPositionModal(false);
          }}
          onClose={() => setShowAddPositionModal(false)}
        />
      )}
    </div>
  );
}
