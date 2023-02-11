import { createSelector } from "reselect";
import { v4 as uuidv4 } from "uuid";

export const recipesSelector = (state) => state.recipes.entities;
export const updateRecipesSelector = (state) => state.recipes.filtered;
export const recipesCountSelector = (state) => state.recipes.count;
export const recipesLoadMoreSelector = (state) => state.recipes.loadMore;
export const userFiltersSelector = (state) => state.recipes.userFilters;

export const recipesLoadingSelector = (state) => state.recipes.loading;
export const recipesLoadedSelector = (state) => state.recipes.loaded;

export const recipesListSelector = createSelector(recipesSelector, (recipes) =>
  Object.entries(recipes)
);

// FILTERS SELECTORS

const groupByCategory = (recipes, category) => {
  return recipes.reduce((acc, item) => {
    const id = uuidv4();
    const value = JSON.stringify(item[category.label]);
    const arrValues = [...new Set(Object.values(acc).map((i) => i.value))];

    if (arrValues.includes(value)) {
      return acc;
    } else {
      return {
        ...acc,
        [id]: { name: category.name, label: category.label, value },
      };
    }
  }, {});
};

export const filtersSelector = createSelector(
  recipesSelector,
  (state) => state.recipes.categories,
  (recipes, categories) =>
    categories
      .map((i) => groupByCategory(Object.values(recipes), i))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
);

export const dishTypeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "dishType" ? { ...acc, [key]: value } : acc;
  }, {})
);

export const mealTypeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "mealType" ? { ...acc, [key]: value } : acc;
  }, {})
);

export const cuisineTypeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "cuisineType" ? { ...acc, [key]: value } : acc;
  }, {})
);

export const cookingTimeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "totalTime" ? { ...acc, [key]: value } : acc;
  }, {})
);

export const filtredRecipesSelector = createSelector(
  recipesSelector,
  filtersSelector,
  userFiltersSelector,
  (recipes, filters, userFilters) =>
    Object.entries(recipes).reduce((acc, [id, recipe]) => {
      const hasFilter = userFilters.filter(
        (j) =>
          JSON.stringify(recipe.cuisineType) === filters[j].value ||
          JSON.stringify(recipe.dishType) === filters[j].value ||
          JSON.stringify(recipe.mealType) === filters[j].value
      );

      return hasFilter.length > 0 ? { ...acc, [id]: recipe } : acc;
    }, {})
);
