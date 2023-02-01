import { LOAD_RECIPES } from "./constants";

export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/find-recipes?query=${query}`,
});
