import {
  addPosition,
  deletePosition,
  getApplicationsByPositionId,
  getAllPositions,
  updatePosition,
} from '@db/indexedDbClient';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  actions as positionActions,
  initialState,
  positionsReducer,
} from '../reducers/positions.reducer';

export function usePositions() {
  const [state, dispatch] = useReducer(positionsReducer, initialState);

  async function loadPositions() {
    dispatch({ type: positionActions.SET_LOADING, payload: true });
    try {
      const data = await getAllPositions();
      dispatch({ type: positionActions.GET_POSITIONS, payload: data });
    } catch (err) {
      dispatch({ type: positionActions.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: positionActions.SET_LOADING, payload: false });
    }
  }

  useEffect(() => {
    loadPositions();
  }, []);

  async function handleAddOrUpdate(form) {
    if (form.id) {
      await updatePosition(form.id, form);
      dispatch({ type: positionActions.UPDATE_POSITION, payload: form });
    } else {
      const id = await addPosition(form);
      dispatch({ type: positionActions.ADD_POSITION, payload: { ...form, id } });
    }
    dispatch({ type: positionActions.HIDE_FORM });
  }

  async function handleDelete(id) {
    try {
      // Check if position is used in any applications
      const relatedApps = await getApplicationsByPositionId(id);

      if (relatedApps.length > 0) {
        const position = state.positions.find((p) => p.id === id);
        const positionTitle = position?.title || 'this position';

        // Set error state instead of showing alert
        dispatch({
          type: positionActions.SET_ERROR,
          payload: `Cannot delete ${positionTitle}. This position is used in ${relatedApps.length} application(s). Please delete or update the related applications first.`,
        });
        return;
      }

      // If no related applications, proceed with deletion
      if (confirm(`Are you sure you want to delete this position?`)) {
        await deletePosition(id);
        dispatch({ type: positionActions.DELETE_POSITION, payload: id });
      }
    } catch (error) {
      dispatch({
        type: positionActions.SET_ERROR,
        payload: `Error deleting position: ${error.message}`,
      });
    }
  }

  const clearFilters = useCallback(() => {
    dispatch({ type: positionActions.SET_SEARCH, payload: '' });
  }, []);

  const filteredPositions = useMemo(() => {
    return state.positions.filter((p) => {
      const term = state.search.toLowerCase();
      return (
        (p.title && p.title.toLowerCase().includes(term)) ||
        (p.department && p.department.toLowerCase().includes(term)) ||
        (p.level && p.level.toLowerCase().includes(term))
      );
    });
  }, [state.positions, state.search]);

  const stats = useMemo(() => {
    return {
      total: state.positions.length,
      byDepartment: state.positions.reduce((acc, p) => {
        if (p.department) {
          acc[p.department] = (acc[p.department] || 0) + 1;
        }
        return acc;
      }, {}),
      byLevel: state.positions.reduce((acc, p) => {
        if (p.level) {
          acc[p.level] = (acc[p.level] || 0) + 1;
        }
        return acc;
      }, {}),
    };
  }, [state.positions]);

  return {
    ...state,
    dispatch,
    positionActions,
    filteredPositions,
    stats,
    loadPositions,
    handleAddOrUpdate,
    handleDelete,
    clearFilters,
  };
}
