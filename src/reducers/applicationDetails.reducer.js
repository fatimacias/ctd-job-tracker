export const initialState = {
  application: null,
  details: [],
  loading: true,
  error: null,
  showEditForm: false,
  editingDetail: null,
  newDetail: {
    type: 'interview',
    status: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    additionalData: {},
  },
};

export const actions = {
  GET_APPLICATION: 'GET_APPLICATION',
  GET_DETAILS: 'GET_DETAILS',
  ADD_DETAIL: 'ADD_DETAIL',
  DELETE_DETAIL: 'DELETE_DETAIL',
  UPDATE_DETAIL_FORM: 'UPDATE_DETAIL_FORM',
  UPDATE_DETAIL_ADDITIONAL: 'UPDATE_DETAIL_ADDITIONAL',
  RESET_DETAIL_FORM: 'RESET_DETAIL_FORM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SHOW_EDIT_FORM: 'SHOW_EDIT_FORM',
  HIDE_EDIT_FORM: 'HIDE_EDIT_FORM',
  SET_EDITING_DETAIL: 'SET_EDITING_DETAIL',
  CANCEL_EDITING_DETAIL: 'CANCEL_EDITING_DETAIL',
};

export function applicationDetailsReducer(state, action) {
  switch (action.type) {
    case actions.GET_APPLICATION:
      return { ...state, application: action.payload, loading: false };
    case actions.GET_DETAILS:
      return { ...state, details: action.payload };
    case actions.ADD_DETAIL:
      return { ...state, details: [...state.details, action.payload] };
    case actions.DELETE_DETAIL:
      return { ...state, details: state.details.filter((d) => d.id !== action.payload) };
    case actions.UPDATE_DETAIL_FORM:
      return {
        ...state,
        newDetail: { ...state.newDetail, [action.payload.field]: action.payload.value },
      };
    case actions.UPDATE_DETAIL_ADDITIONAL:
      return {
        ...state,
        newDetail: {
          ...state.newDetail,
          additionalData: {
            ...state.newDetail.additionalData,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case actions.RESET_DETAIL_FORM:
      return {
        ...state,
        newDetail: {
          type: 'interview',
          status: '',
          date: new Date().toISOString().split('T')[0],
          notes: '',
          additionalData: {},
        },
      };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actions.SHOW_EDIT_FORM:
      return { ...state, showEditForm: true };
    case actions.HIDE_EDIT_FORM:
      return { ...state, showEditForm: false };
    case actions.SET_EDITING_DETAIL:
      return { ...state, editingDetail: action.payload };
    case actions.CANCEL_EDITING_DETAIL:
      return { ...state, editingDetail: null };
    default:
      return state;
  }
}
