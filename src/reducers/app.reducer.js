export const initialState = {
  apps: [],
  selectedApp: null,
  filter: 'All',
  search: '',
  sortBy: 'dateApplied-desc',
  loading: true,
  error: null,
  editApp: null,
  showForm: false,
};

export const actions = {
  GET_APPS: 'GET_APPS',
  ADD_APP: 'ADD_APP',
  UPDATE_APP: 'UPDATE_APP',
  DELETE_APP: 'DELETE_APP',
  SELECT_APP: 'SELECT_APP',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SHOW_FORM: 'SHOW_FORM',
  HIDE_FORM: 'HIDE_FORM',
  SET_EDIT_APP: 'SET_EDIT_APP',
  CLEAR_EDIT_APP: 'CLEAR_EDIT_APP',
};

export function appReducer(state, action) {
  switch (action.type) {
    case actions.GET_APPS:
      return { ...state, apps: action.payload, loading: false };
    case actions.ADD_APP:
      return { ...state, apps: [...state.apps, action.payload] };
    case actions.UPDATE_APP:
      return {
        ...state,
        apps: state.apps.map((a) => (a.id === action.payload.id ? { ...a, ...action.payload } : a)),
      };
    case actions.DELETE_APP:
      return { ...state, apps: state.apps.filter((a) => a.id !== action.payload) };
    case actions.SELECT_APP:
      return { ...state, selectedApp: action.payload };
    case actions.SET_FILTER:
      return { ...state, filter: action.payload };
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.SET_SORT:
      return { ...state, sortBy: action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    case actions.SHOW_FORM:
      return { ...state, showForm: true };
    case actions.HIDE_FORM:
      return { ...state, showForm: false, editApp: null };
    case actions.SET_EDIT_APP:
      return { ...state, editApp: action.payload, showForm: true };
    case actions.CLEAR_EDIT_APP:
      return { ...state, editApp: null };
    default:
      return state;
  }
}
