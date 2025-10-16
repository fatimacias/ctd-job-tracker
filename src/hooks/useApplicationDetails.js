import {
  addDetail,
  deleteDetail,
  getApplicationById,
  getDetailsByApplication,
  updateApplication,
  updateDetail,
} from '@db/indexedDbClient';
import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  applicationDetailsReducer,
  actions as detailActions,
  initialState,
} from '../reducers/applicationDetails.reducer';

export function useApplicationDetails(applicationId) {
  const [state, dispatch] = useReducer(applicationDetailsReducer, initialState);
  const navigate = useNavigate();

  const loadApplicationData = useCallback(async () => {
    dispatch({ type: detailActions.SET_LOADING, payload: true });
    try {
      const [appData, detailsData] = await Promise.all([
        getApplicationById(parseInt(applicationId)),
        getDetailsByApplication(parseInt(applicationId)),
      ]);

      if (!appData) {
        navigate('/');
        return;
      }
      dispatch({ type: detailActions.GET_APPLICATION, payload: appData });
      dispatch({ type: detailActions.GET_DETAILS, payload: detailsData });
    } catch (error) {
      dispatch({ type: detailActions.SET_ERROR, payload: error.message });
      navigate('/');
    } finally {
      dispatch({ type: detailActions.SET_LOADING, payload: false });
    }
  }, [applicationId, navigate]);

  useEffect(() => {
    if (applicationId) {
      loadApplicationData();
    }
  }, [applicationId, loadApplicationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('additional.')) {
      const field = name.substring(11);
      dispatch({
        type: detailActions.UPDATE_DETAIL_ADDITIONAL,
        payload: { field, value },
      });
    } else {
      dispatch({
        type: detailActions.UPDATE_DETAIL_FORM,
        payload: { field: name, value },
      });
    }
  };

  const handleAddDetail = async (e) => {
    e.preventDefault();
    const { newDetail, application } = state;

    if (!newDetail.type || !newDetail.date) {
      alert('Type and Date are required');
      return;
    }

    try {
      await addDetail({
        applicationId: application.id,
        type: newDetail.type,
        date: newDetail.date,
        notes: newDetail.notes,
        additionalData: newDetail.additionalData,
      });

      const statusMap = {
        interview: 'Interview',
        offer: 'Offer',
        rejection: 'Rejected',
        ghosted: 'Ghosted',
      };

      if (statusMap[newDetail.type]) {
        await updateApplication(application.id, {
          status: statusMap[newDetail.type],
          lastUpdated: newDetail.date,
        });
      }

      await loadApplicationData();

      dispatch({ type: detailActions.RESET_DETAIL_FORM });
    } catch (error) {
      console.error('Error adding detail:', error);
      alert('Error adding detail');
    }
  };

  const handleDeleteDetail = async (detailId) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDetail(detailId);
        dispatch({ type: detailActions.DELETE_DETAIL, payload: detailId });
      } catch (error) {
        console.error('Error deleting detail:', error);
        alert('Error deleting detail');
      }
    }
  };

  const handleUpdateApplication = async (updatedData) => {
    try {
      await updateApplication(state.application.id, updatedData);
      // Reload application data to get the updated information
      await loadApplicationData();
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Error updating application');
      throw error;
    }
  };

  const handleUpdateDetail = async (detailId, updatedData) => {
    try {
      await updateDetail(detailId, updatedData);
      await loadApplicationData();
    } catch (error) {
      console.error('Error updating detail:', error);
      alert('Error updating detail');
      throw error;
    }
  };

  return {
    ...state,
    dispatch,
    detailActions,
    handleChange,
    handleAddDetail,
    handleDeleteDetail,
    handleUpdateApplication,
    handleUpdateDetail,
    loadApplicationData,
  };
}
