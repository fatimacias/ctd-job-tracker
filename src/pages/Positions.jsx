import PositionForm from '@features/positions/PositionForm';
import PositionList from '@features/positions/PositionList';
import { usePositions } from '@hooks/usePositions';
import { usePagination } from '@hooks/usePagination';
import { useToast } from '@hooks/useToast';
import EmptyState from '@shared/EmptyState';
import Loading from '@shared/Loading';
import Pagination from '@shared/Pagination';
import ToastContainer from '@shared/ToastContainer';
import styles from '@styles/pages/Positions.module.css';
import { useEffect } from 'react';

export default function Positions() {
  const { toast, showToast, hideToast } = useToast();

  const {
    filteredPositions,
    stats,
    loading,
    error,
    showForm,
    editPosition,
    positionActions,
    dispatch,
    handleAddOrUpdate,
    handleDelete,
  } = usePositions();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedPositions,
    handlePageChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPositions, 10);

  const handleEdit = (position) => {
    dispatch({ type: positionActions.SET_EDIT_POSITION, payload: position });
  };

  const handleClose = () => {
    dispatch({ type: positionActions.HIDE_FORM });
  };

  // Show toast when error changes
  useEffect(() => {
    if (error) {
      showToast(error, 'error', 5000);
      // Clear the error from state after showing toast
      setTimeout(() => {
        dispatch({ type: positionActions.SET_ERROR, payload: null });
      }, 100);
    }
  }, [error, showToast, dispatch, positionActions.SET_ERROR]);

  if (loading) {
    return (
      <div className="container">
        <h1>Positions</h1>
        <Loading message="Loading positions..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Position Management</h1>
        <button className="primary" onClick={() => dispatch({ type: positionActions.SHOW_FORM })}>
          + Add Position
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Positions</p>
        </div>
        <div className="stat-card">
          <h3>{Object.keys(stats.byDepartment).length}</h3>
          <p>Departments</p>
        </div>
      </div>

      {filteredPositions.length === 0 ? (
        <EmptyState iconClass="icon-briefcase" title="No positions yet">
          <p>Create your position catalog to track different job roles.</p>
          <button
            className={`primary ${styles.emptyStateButton}`}
            onClick={() => dispatch({ type: positionActions.SHOW_FORM })}
          >
            + Add Your First Position
          </button>
        </EmptyState>
      ) : (
        <>
          <PositionList
            positions={paginatedPositions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </>
      )}

      {showForm && (
        <PositionForm
          onSubmit={handleAddOrUpdate}
          onClose={handleClose}
          editPosition={editPosition}
        />
      )}

      <ToastContainer toast={toast} onClose={hideToast} />
    </div>
  );
}
