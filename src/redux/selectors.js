import { createSelector } from "reselect";

export const allRecipesSelector = (state) => state.recipes.entities;
export const updateRecipesSelector = (state) => state.recipes.filtered;
export const recipesCountSelector = (state) => state.recipes.count;
export const recipesLoadMoreSelector = (state) => state.recipes.loadMore;
export const filtersSelector = (state) => state.recipes.filters;

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
  allRecipesSelector,
  (recipes) => groupByCategory(recipes, "dishType")
);

export const dishTypeListSelector = createSelector(
  recipesByDishTypeSelector,
  Object.keys
);

// FILTER CATEGORY - MEAL TYPE

export const recipesByMealTypeSelector = createSelector(
  allRecipesSelector,
  (recipes) => groupByCategory(recipes, "mealType")
);

export const mealTypeListSelector = createSelector(
  recipesByMealTypeSelector,
  Object.keys
);

// FILTER CATEGORY - CUISINE TYPE

export const recipesByCuisineTypeSelector = createSelector(
  allRecipesSelector,
  (recipes) => groupByCategory(recipes, "cuisineType")
);

export const cuisineTypeListSelector = createSelector(
  recipesByCuisineTypeSelector,
  Object.keys
);

// FILTER CATEGORY - COOKING TIME

export const recipesByCookingTimeSelector = createSelector(
  allRecipesSelector,
  (recipes) => groupByCategory(recipes, "totalTime")
);

export const cookingTimeListSelector = createSelector(
  recipesByCookingTimeSelector,
  Object.keys
);

export const filterRecipeSelector = createSelector(
  allRecipesSelector,
  filtersSelector,
  (recipes, filters) =>
    recipes.filter((item) =>
      filters.every(
        (category) =>
          JSON.stringify(item.recipe[category.key]) ===
          JSON.stringify(category.value)
      )
    )
);
