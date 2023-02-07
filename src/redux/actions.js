import { LOAD_RECIPES, ADD_FILTER, UPDATE_RECIPES } from "./constants";
import { filterRecipeSelector } from "./selectors";

export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/find-recipes?q=${query}`,
});

export const addFilter = (category) => ({
  type: ADD_FILTER,
  category,
});

export const updateRecipes = () => async (dispatch, getState) => {
  const state = getState();
  const updateList = filterRecipeSelector(state);
  console.log("UPDATE LIST", updateList);

  await dispatch({ type: UPDATE_RECIPES, updateList });
};
