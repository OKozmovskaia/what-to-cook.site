import { createSelector } from "reselect";

export const allRecipesSelector = (state) => state.recipes.entities;
export const updateRecipesSelector = (state) => state.recipes.filtered;
export const recipesCountSelector = (state) => state.recipes.count;
export const recipesLoadMoreSelector = (state) => state.recipes.loadMore;
export const filtersSelector = (state) => state.recipes.filters;

export const recipesLoadingSelector = (state) => state.recipes.loading;
export const recipesLoadedSelector = (state) => state.recipes.loaded;

// FILTERS SELECTORS

const groupByCategory = (recipes, category) => {
  return recipes.reduce((acc, item) => {
    const key = item.recipe[category];
    const categoryGroup = acc[key] ?? [];

    return { ...acc, [key]: [...categoryGroup, item.id] };
  }, {});
};

export const dishTypeListSelector = createSelector(
  allRecipesSelector,
  (recipes) => Object.keys(groupByCategory(recipes, "dishType"))
);

export const mealTypeListSelector = createSelector(
  allRecipesSelector,
  (recipes) => Object.keys(groupByCategory(recipes, "mealType"))
);

export const cuisineTypeListSelector = createSelector(
  allRecipesSelector,
  (recipes) => Object.keys(groupByCategory(recipes, "cuisineType"))
);

export const cookingTimeListSelector = createSelector(
  allRecipesSelector,
  (recipes) => Object.keys(groupByCategory(recipes, "totalTime"))
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
