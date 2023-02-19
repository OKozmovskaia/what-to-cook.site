import { createSelector } from "reselect";
import { v4 as uuidv4 } from "uuid";

export const recipesSelector = (state) => state.recipes.entities;
export const updateRecipesSelector = (state) => state.recipes.filtered;
export const recipesLoadMoreSelector = (state) => state.recipes.loadMore;
export const searchQuerySelector = (state) => state.recipes.searchQuery;
export const userFiltersSelector = (state) => state.recipes.userFilters;

export const recipesLoadingSelector = (state) => state.recipes.loading;
export const recipesLoadedSelector = (state) => state.recipes.loaded;

export const recipesListSelector = createSelector(
  updateRecipesSelector,
  (recipes) => Object.entries(recipes)
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

const sortObjectByNestedValue = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).sort((x, y) =>
      x[1].label === "totalTime"
        ? x[1].value - y[1].value
        : x[1].value.localeCompare(y[1].value)
    )
  );
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
    return value.label === "dishType"
      ? sortObjectByNestedValue({ ...acc, [key]: value })
      : acc;
  }, {})
);

export const mealTypeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "mealType"
      ? sortObjectByNestedValue({ ...acc, [key]: value })
      : acc;
  }, {})
);

export const cuisineTypeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "cuisineType"
      ? sortObjectByNestedValue({ ...acc, [key]: value })
      : acc;
  }, {})
);

export const cookingTimeListSelector = createSelector(filtersSelector, (list) =>
  Object.entries(list).reduce((acc, [key, value]) => {
    return value.label === "totalTime"
      ? sortObjectByNestedValue({ ...acc, [key]: value })
      : acc;
  }, {})
);

// Recipe always has 1 value for every possible category
// User filter always has category-name and value
// get all unique categories from user filters and check their values with recipe

export const filtredRecipesSelector = createSelector(
  recipesSelector,
  filtersSelector,
  userFiltersSelector,
  (recipes, filters, userFilters) =>
    Object.entries(recipes).reduce((acc, [id, recipe]) => {
      const categories = userFilters.map((i) => filters[i].label);
      const uniqueSet = [...new Set(categories)];
      const values = userFilters.map((i) => filters[i].value);

      const hasFilter = uniqueSet.map((i) => {
        return values.includes(JSON.stringify(recipe[i]));
      });

      return hasFilter.every((i) => i === true)
        ? { ...acc, [id]: recipe }
        : acc;
    }, {})
);
