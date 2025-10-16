import { db } from '@db/indexedDbClient';
import { getAllInterviews, getUpcomingInterviews } from '@utils/interviewHelpers';
import { useCallback, useEffect, useReducer } from 'react';
import { actions, initialState, interviewsReducer } from '../reducers/interviews.reducer';

export function useInterviews() {
  const [state, dispatch] = useReducer(interviewsReducer, initialState);

  const loadInterviews = useCallback(async () => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    try {
      const data =
        state.filter === 'upcoming' ? await getUpcomingInterviews(db) : await getAllInterviews(db);
      dispatch({ type: actions.GET_INTERVIEWS, payload: data });
    } catch (error) {
      console.error('Error loading interviews:', error);
      dispatch({ type: actions.SET_LOADING, payload: false });
    }
  }, [state.filter]);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const setFilter = (filter) => {
    dispatch({ type: actions.SET_FILTER, payload: filter });
  };

  return {
    interviews: state.interviews,
    loading: state.loading,
    filter: state.filter,
    setFilter,
    dispatch,
    actions,
  };
}
