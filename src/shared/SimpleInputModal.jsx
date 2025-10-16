import { useState } from 'react';
import modalStyles from '@styles/shared/Modal.module.css';

export default function SimpleInputModal({ title, label, placeholder, onSubmit, onClose }) {
  const [value, setValue] = useState('');
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      handleClose();
    }
  };

  return (
    <div
      className={`${modalStyles.modalOverlay} ${closing ? modalStyles.closing : modalStyles.active}`}
      onClick={handleClose}
    >
      <div
        className={`${modalStyles.modal} ${modalStyles.smallModal} ${closing ? modalStyles.closing : modalStyles.active}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.closeBtn} onClick={handleClose}>
          <span className="icon icon-close"></span>
        </button>
        <h3>{title}</h3>

        <form onSubmit={handleSubmit}>
          <label>
            {label}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              autoFocus
              required
              className={modalStyles.modalInput}
            />
          </label>

          <div className={modalStyles.modalButtons}>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
