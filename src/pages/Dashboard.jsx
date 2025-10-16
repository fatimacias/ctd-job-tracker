import ApplicationForm from '@features/applications/ApplicationForm';
import ApplicationList from '@features/applications/ApplicationList';
import ApplicationStats from '@features/applications/ApplicationStats';
import FilterBar from '@features/applications/FilterBar';
import UpcomingInterviews from '@features/interviews/UpcomingInterviews';
import { useApplications } from '@hooks/useApplications';
import { usePagination } from '@hooks/usePagination';
import EmptyState from '@shared/EmptyState';
import Loading from '@shared/Loading';
import Pagination from '@shared/Pagination';
import styles from '@styles/pages/Dashboard.module.css';

export default function Dashboard() {
  const {
    filteredApps,
    counts,
    editApp,
    showForm,
    loading,
    error,
    filter,
    search,
    sortBy,
    dispatch,
    appActions,
    handleAddOrUpdate,
    handleDelete,
    clearFilters,
  } = useApplications();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedApps,
    handlePageChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredApps, 10);

  return (
    <div className="container">
      <UpcomingInterviews />

      <ApplicationStats counts={counts} />

      <div className={styles.sectionHeader}>
        <h2>Applications</h2>
        <button className="primary" onClick={() => dispatch({ type: appActions.SHOW_FORM })}>
          + Add Application
        </button>
      </div>

      <FilterBar
        filter={filter}
        onFilterChange={(f) => dispatch({ type: appActions.SET_FILTER, payload: f })}
        search={search}
        onSearchChange={(s) => dispatch({ type: appActions.SET_SEARCH, payload: s })}
        sortBy={sortBy}
        onSortChange={(s) => dispatch({ type: appActions.SET_SORT, payload: s })}
        onClearFilters={clearFilters}
      />

      {error && (
        <div className={styles.errorAlert}>
          <span className="icon icon-warning"></span> {error}
        </div>
      )}

      {loading ? (
        <Loading message="Loading applications..." />
      ) : filteredApps.length === 0 ? (
        <EmptyState
          iconClass="icon-mailbox"
          title={
            filter !== 'All' || search
              ? 'No applications match your filters'
              : 'No applications yet'
          }
        >
          {filter !== 'All' || search ? (
            <p>Try adjusting your filters or search term.</p>
          ) : (
            <>
              <p>Start tracking your job search by adding your first application.</p>
              <button
                className={`primary ${styles.emptyStateButton}`}
                onClick={() => dispatch({ type: appActions.SHOW_FORM })}
              >
                + Add Your First Application
              </button>
            </>
          )}
        </EmptyState>
      ) : (
        <>
          <ApplicationList
            apps={paginatedApps}
            onSelect={(a) => dispatch({ type: appActions.SELECT_APP, payload: a })}
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
        <ApplicationForm
          onSubmit={handleAddOrUpdate}
          onClose={() => dispatch({ type: appActions.HIDE_FORM })}
          editApp={editApp}
        />
      )}
    </div>
  );
}
