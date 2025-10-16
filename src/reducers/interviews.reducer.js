export const initialState = {
  interviews: [],
  loading: true,
  filter: 'upcoming', // 'upcoming', 'all'
};

export const actions = {
  GET_INTERVIEWS: 'GET_INTERVIEWS',
  SET_FILTER: 'SET_FILTER',
  SET_LOADING: 'SET_LOADING',
};

export function interviewsReducer(state, action) {
  switch (action.type) {
    case actions.GET_INTERVIEWS:
      return { ...state, interviews: action.payload, loading: false };
    case actions.SET_FILTER:
      return { ...state, filter: action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
