import AddEntryForm from '@features/applicationDetails/AddEntryForm';
import ApplicationSummary from '@features/applicationDetails/ApplicationSummary';
import Timeline from '@features/applicationDetails/Timeline';
import ApplicationForm from '@features/applications/ApplicationForm';
import { useApplicationDetails } from '@hooks/useApplicationDetails';
import styles from '@styles/pages/ApplicationDetail.module.css';
import '@styles/utilities.css';
import { Link, useParams } from 'react-router-dom';

export default function ApplicationDetail() {
  const { id } = useParams();
  const {
    application,
    details,
    newDetail,
    loading,
    showEditForm,
    editingDetail,
    handleChange,
    handleAddDetail,
    handleDeleteDetail,
    handleUpdateApplication,
    handleUpdateDetail,
    dispatch,
    detailActions,
  } = useApplicationDetails(id);

  const handleEditDetail = (detail) => {
    dispatch({
      type: detailActions.SET_EDITING_DETAIL,
      payload: detail,
    });

    dispatch({
      type: detailActions.UPDATE_DETAIL_FORM,
      payload: { field: 'type', value: detail.type },
    });

    dispatch({
      type: detailActions.UPDATE_DETAIL_FORM,
      payload: { field: 'date', value: detail.date },
    });

    dispatch({
      type: detailActions.UPDATE_DETAIL_FORM,
      payload: { field: 'notes', value: detail.notes || '' },
    });

    dispatch({
      type: detailActions.UPDATE_DETAIL_FORM,
      payload: { field: 'additionalData', value: detail.additionalData || {} },
    });
  };

  const handleCancelEdit = () => {
    dispatch({ type: detailActions.CANCEL_EDITING_DETAIL });
    dispatch({ type: detailActions.RESET_DETAIL_FORM });
  };

  const handleSubmitDetail = async (e) => {
    e.preventDefault();
    if (editingDetail) {
      await handleUpdateDetail(editingDetail.id, {
        type: newDetail.type,
        date: newDetail.date,
        notes: newDetail.notes,
        additionalData: newDetail.additionalData,
      });
      dispatch({ type: detailActions.CANCEL_EDITING_DETAIL });
      dispatch({ type: detailActions.RESET_DETAIL_FORM });
    } else {
      await handleAddDetail(e);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>Loading application details...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container">
        <div className={styles.error}>Application not found</div>
        <Link to="/" className={`${styles.btn} ${styles.primary}`}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <Link to="/" className={styles.backLink}>
            ← Back to Dashboard
          </Link>
          <h1>{application.companyData?.name || application.company || 'Unknown Company'}</h1>
          <h2>{application.positionData?.title || application.position || 'Unknown Position'}</h2>
        </div>
        <div className={styles.headerActions}>
          <button
            className="action-btn edit-btn"
            onClick={() => dispatch({ type: detailActions.SHOW_EDIT_FORM })}
            title="Edit application"
          >
            <span className="icon icon-edit"></span> Edit Application
          </button>
          <div className={`${styles.statusBadge} ${styles[`status${application.status}`]}`}>
            {application.status}
          </div>
        </div>
      </div>

      <div className={styles.detailLayout}>
        <ApplicationSummary application={application} />
        <Timeline
          details={details}
          onDeleteDetail={handleDeleteDetail}
          onEditDetail={handleEditDetail}
        />
        <AddEntryForm
          newDetail={newDetail}
          onChange={handleChange}
          onSubmit={handleSubmitDetail}
          editingDetail={editingDetail}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {showEditForm && (
        <ApplicationForm
          onSubmit={handleUpdateApplication}
          onClose={() => dispatch({ type: detailActions.HIDE_EDIT_FORM })}
          editApp={application}
        />
      )}
    </div>
  );
}
