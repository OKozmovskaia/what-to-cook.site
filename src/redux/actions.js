import {
  LOAD_RECIPES,
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_RECIPES,
} from "./constants";
import { filterRecipeSelector, filtersSelector } from "./selectors";

export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/find-recipes?q=${query}`,
});

export const addFilter = (category) => ({
  type: ADD_FILTER,
  newFilters: category,
});

export const removeFilter = (category) => async (dispatch, getState) => {
  const state = getState();
  const filtersList = filtersSelector(state);
  const copyFiltersList = [...filtersList];
  copyFiltersList.splice(
    copyFiltersList.findIndex(
      (el) => JSON.stringify(el.value) === JSON.stringify(category[0].value),
      1
    )
  );

  await dispatch({
    type: REMOVE_FILTER,
    newFilters: copyFiltersList,
  });
};

export const updateRecipes = () => async (dispatch, getState) => {
  const state = getState();
  const newRecipesList = filterRecipeSelector(state);

  await dispatch({ type: UPDATE_RECIPES, newRecipesList });
};
