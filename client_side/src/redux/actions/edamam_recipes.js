import {
  LOAD_RECIPES,
  LOAD_MORE_RECIPES,
  ADD_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  UPDATE_RECIPES,
  UPDATE_FILTERS,
  REQUEST,
  SUCCESS,
  FAILURE,
  SET_MESSAGE,
} from "../constants";
import {
  filtredRecipesSelector,
  userFiltersSelector,
  newFiltersSelector,
} from "../selectors";

export const findRecipes = (query) => async (dispatch, getState) => {
  dispatch({ type: LOAD_RECIPES + REQUEST });

  try {
    const res = await fetch(`/api/find-recipes?q=${query}`);
    const data = await res.json();

    if (!res.ok) throw data;

    dispatch({ type: LOAD_RECIPES + SUCCESS, data });

    const updateFilters = newFiltersSelector(getState());
    dispatch({ type: UPDATE_FILTERS, updateFilters });

    const updateRecipes = filtredRecipesSelector(getState());
    dispatch({ type: UPDATE_RECIPES, updateRecipes });
  } catch (data) {
    dispatch({ type: LOAD_RECIPES + FAILURE, data });
    if (data.message) dispatch({ type: SET_MESSAGE, data: data.message });
  }
};

export const loadMoreRecipes = (link) => async (dispatch, getState) => {
  dispatch({ type: LOAD_MORE_RECIPES + REQUEST });

  try {
    const res = await fetch(`/api/load-more`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    });
    const data = await res.json();

    if (!res.ok) throw data;

    dispatch({ type: LOAD_MORE_RECIPES + SUCCESS, data });

    const updateFilters = newFiltersSelector(getState());
    dispatch({ type: UPDATE_FILTERS, updateFilters });

    const updateRecipes = filtredRecipesSelector(getState());
    dispatch({ type: UPDATE_RECIPES, updateRecipes });
  } catch (data) {
    dispatch({ type: LOAD_MORE_RECIPES + FAILURE, data });
    if (data.message) dispatch({ type: SET_MESSAGE, data: data.message });
  }
};

export const addFilter = (id) => (dispatch, getState) => {
  dispatch({ type: ADD_FILTER, newFilter: id });
  const updateRecipes = filtredRecipesSelector(getState());
  dispatch({ type: UPDATE_RECIPES, updateRecipes });
};

export const removeFilter = (id) => (dispatch, getState) => {
  const userFilters = userFiltersSelector(getState());
  const newFilter = userFilters.filter((i) => i !== id);
  dispatch({ type: REMOVE_FILTER, newFilter });

  const updateRecipes = filtredRecipesSelector(getState());
  dispatch({ type: UPDATE_RECIPES, updateRecipes });
};

export const removeAllFilters = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_ALL_FILTERS, newFilter: [] });

  const updateRecipes = filtredRecipesSelector(getState());
  dispatch({ type: UPDATE_RECIPES, updateRecipes });
};
