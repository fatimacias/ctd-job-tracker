import Toast from './Toast';

/**
 * Container for displaying toast notifications
 * @param {Object} props
 * @param {Object} props.toast - Current toast object {message, type, id}
 * @param {function} props.onClose - Callback when toast closes
 */

export default function ToastContainer({ toast, onClose }) {
  if (!toast) return null;

  return <Toast message={toast.message} type={toast.type} onClose={onClose} />;
}
