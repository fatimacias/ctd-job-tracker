export const initialState = {
  positions: [],
  selectedPosition: null,
  search: '',
  loading: true,
  error: null,
  editPosition: null,
  showForm: false,
};

export const actions = {
  GET_POSITIONS: 'GET_POSITIONS',
  ADD_POSITION: 'ADD_POSITION',
  UPDATE_POSITION: 'UPDATE_POSITION',
  DELETE_POSITION: 'DELETE_POSITION',
  SELECT_POSITION: 'SELECT_POSITION',
  SET_SEARCH: 'SET_SEARCH',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SHOW_FORM: 'SHOW_FORM',
  HIDE_FORM: 'HIDE_FORM',
  SET_EDIT_POSITION: 'SET_EDIT_POSITION',
  CLEAR_EDIT_POSITION: 'CLEAR_EDIT_POSITION',
};

export function positionsReducer(state, action) {
  switch (action.type) {
    case actions.GET_POSITIONS:
      return { ...state, positions: action.payload, loading: false };
    case actions.ADD_POSITION:
      return { ...state, positions: [...state.positions, action.payload] };
    case actions.UPDATE_POSITION:
      return {
        ...state,
        positions: state.positions.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };
    case actions.DELETE_POSITION:
      return { ...state, positions: state.positions.filter((p) => p.id !== action.payload) };
    case actions.SELECT_POSITION:
      return { ...state, selectedPosition: action.payload };
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    case actions.SHOW_FORM:
      return { ...state, showForm: true };
    case actions.HIDE_FORM:
      return { ...state, showForm: false, editPosition: null };
    case actions.SET_EDIT_POSITION:
      return { ...state, editPosition: action.payload, showForm: true };
    case actions.CLEAR_EDIT_POSITION:
      return { ...state, editPosition: null };
    default:
      return state;
  }
}
