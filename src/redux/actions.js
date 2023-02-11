import {
  LOAD_RECIPES,
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_RECIPES,
} from "./constants";
import { filtredRecipesSelector, userFiltersSelector } from "./selectors";

export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/find-recipes?q=${query}`,
});

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

export const updateRecipes = () => async (dispatch, getState) => {
  const updateRecipes = filtredRecipesSelector(getState());
  console.log(updateRecipes);

  await dispatch({ type: UPDATE_RECIPES, updateRecipes });
};
