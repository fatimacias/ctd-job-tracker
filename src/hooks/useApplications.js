import {
  addApplication,
  deleteApplication,
  getAllApplications,
  updateApplication,
} from '@db/indexedDbClient';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { actions as appActions, appReducer, initialState } from '../reducers/app.reducer';

export function useApplications() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  async function loadApps() {
    dispatch({ type: appActions.SET_LOADING, payload: true });
    try {
      const data = await getAllApplications();
      dispatch({ type: appActions.GET_APPS, payload: data });
    } catch (err) {
      dispatch({ type: appActions.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: appActions.SET_LOADING, payload: false });
    }
  }

  useEffect(() => {
    loadApps();
  }, []);

  async function handleAddOrUpdate(form) {
    if (form.id) {
      await updateApplication(form.id, form);
      // Re-load apps to get enriched data
      await loadApps();
    } else {
      await addApplication(form);
      await loadApps();
    }
    dispatch({ type: appActions.HIDE_FORM });
  }

  async function handleDelete(id) {
    if (confirm('Delete this application?')) {
      await deleteApplication(id);
      dispatch({ type: appActions.DELETE_APP, payload: id });
    }
  }

  async function handleUpdateStatus(id, data) {
    await updateApplication(id, data);
    await loadApps();
  }

  const clearFilters = useCallback(() => {
    dispatch({ type: appActions.SET_FILTER, payload: 'All' });
    dispatch({ type: appActions.SET_SEARCH, payload: '' });
    dispatch({ type: appActions.SET_SORT, payload: 'dateApplied-desc' });
  }, []);

  const filteredApps = useMemo(() => {
    // Filter applications
    let filtered = state.apps.filter((a) => {
      const matchesFilter = state.filter === 'All' || a.status === state.filter;
      const term = state.search.toLowerCase();
      const matchesSearch =
        (a.company && a.company.toLowerCase().includes(term)) ||
        (a.position && a.position.toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });

    // Sort applications
    const [field, direction] = state.sortBy.split('-');
    filtered.sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      // Handle null/undefined values
      if (!aVal) aVal = '';
      if (!bVal) bVal = '';

      // Convert to lowercase for string comparisons
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      // Compare
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [state.apps, state.filter, state.search, state.sortBy]);

  const counts = useMemo(() => {
    const result = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    state.apps.forEach((a) => {
      if (result[a.status] !== undefined) result[a.status]++;
    });
    return result;
  }, [state.apps]);

  return {
    ...state,
    dispatch,
    appActions,
    filteredApps,
    counts,
    loadApps,
    handleAddOrUpdate,
    handleDelete,
    handleUpdateStatus,
    clearFilters,
  };
}
