import CompanyForm from '@features/companies/CompanyForm';
import CompanyList from '@features/companies/CompanyList';
import { useCompanies } from '@hooks/useCompanies';
import { usePagination } from '@hooks/usePagination';
import { useToast } from '@hooks/useToast';
import EmptyState from '@shared/EmptyState';
import Loading from '@shared/Loading';
import Pagination from '@shared/Pagination';
import ToastContainer from '@shared/ToastContainer';
import styles from '@styles/pages/Companies.module.css';
import { useEffect } from 'react';

export default function Companies() {
  const { toast, showToast, hideToast } = useToast();

  const {
    filteredCompanies,
    stats,
    loading,
    error,
    showForm,
    editCompany,
    companyActions,
    dispatch,
    handleAddOrUpdate,
    handleDelete,
  } = useCompanies();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedCompanies,
    handlePageChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredCompanies, 10);

  const handleEdit = (company) => {
    dispatch({ type: companyActions.SET_EDIT_COMPANY, payload: company });
  };

  const handleClose = () => {
    dispatch({ type: companyActions.HIDE_FORM });
  };

  // Show toast when error changes
  useEffect(() => {
    if (error) {
      showToast(error, 'error', 5000);
      // Clear the error from state after showing toast
      setTimeout(() => {
        dispatch({ type: companyActions.SET_ERROR, payload: null });
      }, 100);
    }
  }, [error, showToast, dispatch, companyActions.SET_ERROR]);

  if (loading) {
    return (
      <div className="container">
        <h1>Companies</h1>
        <Loading message="Loading companies..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Company Management</h1>
        <button className="primary" onClick={() => dispatch({ type: companyActions.SHOW_FORM })}>
          + Add Company
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Companies</p>
        </div>
        <div className="stat-card">
          <h3>{stats.withWebsite}</h3>
          <p>With Websites</p>
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <EmptyState iconClass="icon-company" title="No companies yet">
          <p>Build your company catalog to streamline job applications.</p>
          <button
            className={`primary ${styles.emptyStateButton}`}
            onClick={() => dispatch({ type: companyActions.SHOW_FORM })}
          >
            + Add Your First Company
          </button>
        </EmptyState>
      ) : (
        <>
          <CompanyList companies={paginatedCompanies} onEdit={handleEdit} onDelete={handleDelete} />

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
        <CompanyForm onSubmit={handleAddOrUpdate} onClose={handleClose} editCompany={editCompany} />
      )}

      <ToastContainer toast={toast} onClose={hideToast} />
    </div>
  );
}
