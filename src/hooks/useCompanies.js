import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getApplicationsByCompanyId,
  updateCompany,
} from '@db/indexedDbClient';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  companiesReducer,
  actions as companyActions,
  initialState,
} from '../reducers/companies.reducer';

export function useCompanies() {
  const [state, dispatch] = useReducer(companiesReducer, initialState);

  async function loadCompanies() {
    dispatch({ type: companyActions.SET_LOADING, payload: true });
    try {
      const data = await getAllCompanies();
      dispatch({ type: companyActions.GET_COMPANIES, payload: data });
    } catch (err) {
      dispatch({ type: companyActions.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: companyActions.SET_LOADING, payload: false });
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  async function handleAddOrUpdate(form) {
    if (form.id) {
      await updateCompany(form.id, form);
      dispatch({ type: companyActions.UPDATE_COMPANY, payload: form });
    } else {
      const id = await addCompany(form);
      dispatch({ type: companyActions.ADD_COMPANY, payload: { ...form, id } });
    }
    dispatch({ type: companyActions.HIDE_FORM });
  }

  async function handleDelete(id) {
    try {
      // Check if company is used in any applications
      const relatedApps = await getApplicationsByCompanyId(id);

      if (relatedApps.length > 0) {
        const company = state.companies.find((c) => c.id === id);
        const companyName = company?.name || 'this company';

        // Set error state instead of showing alert
        dispatch({
          type: companyActions.SET_ERROR,
          payload: `Cannot delete ${companyName}. This company is used in ${relatedApps.length} application(s). Please delete or update the related applications first.`,
        });
        return;
      }

      if (confirm(`Are you sure you want to delete this company?`)) {
        await deleteCompany(id);
        dispatch({ type: companyActions.DELETE_COMPANY, payload: id });
      }
    } catch (error) {
      dispatch({
        type: companyActions.SET_ERROR,
        payload: `Error deleting company: ${error.message}`,
      });
    }
  }

  const clearFilters = useCallback(() => {
    dispatch({ type: companyActions.SET_SEARCH, payload: '' });
  }, []);

  const filteredCompanies = useMemo(() => {
    return state.companies.filter((c) => {
      const term = state.search.toLowerCase();
      return (
        (c.name && c.name.toLowerCase().includes(term)) ||
        (c.industry && c.industry.toLowerCase().includes(term))
      );
    });
  }, [state.companies, state.search]);

  const stats = useMemo(() => {
    return {
      total: state.companies.length,
      withWebsite: state.companies.filter((c) => c.website).length,
      byIndustry: state.companies.reduce((acc, c) => {
        if (c.industry) {
          acc[c.industry] = (acc[c.industry] || 0) + 1;
        }
        return acc;
      }, {}),
    };
  }, [state.companies]);

  return {
    ...state,
    dispatch,
    companyActions,
    filteredCompanies,
    stats,
    loadCompanies,
    handleAddOrUpdate,
    handleDelete,
    clearFilters,
  };
}
