import {
  LOAD_RECIPES,
  LOAD_MORE_RECIPES,
  ADD_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  UPDATE_RECIPES,
  UPDATE_FILTERS,
} from "../constants";
import {
  filtredRecipesSelector,
  userFiltersSelector,
  newFiltersSelector,
} from "../selectors";

export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/api/find-recipes?q=${query}`,
});

export const loadMoreRecipes = (link) => ({
  type: LOAD_MORE_RECIPES,
  callAPI: `/api/load-more`,
  postData: link,
});

export const updateRecipes = () => async (dispatch, getState) => {
  const updateRecipes = filtredRecipesSelector(getState());
  await dispatch({ type: UPDATE_RECIPES, updateRecipes });
};

export const updateFilters = () => async (dispatch, getState) => {
  const updateFilters = newFiltersSelector(getState());
  await dispatch({ type: UPDATE_FILTERS, updateFilters });
};

export const addFilter = (id) => ({
  type: ADD_FILTER,
  newFilter: id,
});

export const removeFilter = (id) => async (dispatch, getState) => {
  const userFilters = userFiltersSelector(getState());
  const newFilter = userFilters.filter((i) => i !== id);

  await dispatch({
    type: REMOVE_FILTER,
    newFilter,
  });
};

export const removeAllFilters = () => ({
  type: REMOVE_ALL_FILTERS,
  newFilter: [],
});