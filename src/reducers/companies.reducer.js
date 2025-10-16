export const initialState = {
  companies: [],
  selectedCompany: null,
  search: '',
  loading: true,
  error: null,
  editCompany: null,
  showForm: false,
};

export const actions = {
  GET_COMPANIES: 'GET_COMPANIES',
  ADD_COMPANY: 'ADD_COMPANY',
  UPDATE_COMPANY: 'UPDATE_COMPANY',
  DELETE_COMPANY: 'DELETE_COMPANY',
  SELECT_COMPANY: 'SELECT_COMPANY',
  SET_SEARCH: 'SET_SEARCH',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SHOW_FORM: 'SHOW_FORM',
  HIDE_FORM: 'HIDE_FORM',
  SET_EDIT_COMPANY: 'SET_EDIT_COMPANY',
  CLEAR_EDIT_COMPANY: 'CLEAR_EDIT_COMPANY',
};

export function companiesReducer(state, action) {
  switch (action.type) {
    case actions.GET_COMPANIES:
      return { ...state, companies: action.payload, loading: false };
    case actions.ADD_COMPANY:
      return { ...state, companies: [...state.companies, action.payload] };
    case actions.UPDATE_COMPANY:
      return {
        ...state,
        companies: state.companies.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };
    case actions.DELETE_COMPANY:
      return { ...state, companies: state.companies.filter((c) => c.id !== action.payload) };
    case actions.SELECT_COMPANY:
      return { ...state, selectedCompany: action.payload };
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    case actions.SHOW_FORM:
      return { ...state, showForm: true };
    case actions.HIDE_FORM:
      return { ...state, showForm: false, editCompany: null };
    case actions.SET_EDIT_COMPANY:
      return { ...state, editCompany: action.payload, showForm: true };
    case actions.CLEAR_EDIT_COMPANY:
      return { ...state, editCompany: null };
    default:
      return state;
  }
}
