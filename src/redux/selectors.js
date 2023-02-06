import { createSelector } from "reselect";

export const recipesSelector = (state) => state.recipes.entities;
export const recipesCountSelector = (state) => state.recipes.count;
export const recipesLoadMoreSelector = (state) => state.recipes.loadMore;

export const recipesLoadingSelector = (state) => state.recipes.loading;
export const recipesLoadedSelector = (state) => state.recipes.loaded;

function groupByCategory(recipes, category) {
  return recipes.reduce((acc, item) => {
    const key = item.recipe[category];
    const categoryGroup = acc[key] ?? [];

    return { ...acc, [key]: [...categoryGroup, item.id] };
  }, {});
}

// FILTER CATEGORY - DISH TYPE

export const recipesByDishTypeSelector = createSelector(
  recipesSelector,
  (recipes) => groupByCategory(recipes, "dishType")
);

export const dishTypeListSelector = createSelector(
  recipesByDishTypeSelector,
  Object.keys
);

// FILTER CATEGORY - MEAL TYPE

export const recipesByMealTypeSelector = createSelector(
  recipesSelector,
  (recipes) => groupByCategory(recipes, "mealType")
);

export const mealTypeListSelector = createSelector(
  recipesByMealTypeSelector,
  Object.keys
);

// FILTER CATEGORY - CUISINE TYPE

export const recipesByCuisineTypeSelector = createSelector(
  recipesSelector,
  (recipes) => groupByCategory(recipes, "cuisineType")
);

export const cuisineTypeListSelector = createSelector(
  recipesByCuisineTypeSelector,
  Object.keys
);

// FILTER CATEGORY - COOKING TIME

export const recipesByCookingTimeSelector = createSelector(
  recipesSelector,
  (recipes) => groupByCategory(recipes, "totalTime")
);

export const cookingTimeListSelector = createSelector(
  recipesByCookingTimeSelector,
  Object.keys
);
