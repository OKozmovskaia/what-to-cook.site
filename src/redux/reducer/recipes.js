import {
  LOAD_RECIPES,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_RECIPES,
} from "../constants";
import { idAsKey } from "../utils/idAsKey";

const initialState = {
  entities: {},
  categories: [
    { name: "Dish", label: "dishType" },
    { name: "Daytime", label: "mealType" },
    { name: "Cuisine", label: "cuisineType" },
    { name: "Cooking time", label: "totalTime" },
  ],
  loading: false,
  loaded: false,
  error: null,
};

const recipes = (state = initialState, action) => {
  const { type, data, newFilter, newRecipesList, error } = action;
  const { userFilters } = state;

  switch (type) {
    case LOAD_RECIPES + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_RECIPES + SUCCESS:
      return {
        ...state,
        entities: idAsKey(data.recipes),
        loading: false,
        loaded: true,
      };

    case LOAD_RECIPES + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    case ADD_FILTER:
      return {
        ...state,
        userFilters: { ...userFilters, ...newFilter },
      };

    case REMOVE_FILTER:
      return {
        ...state,
        userFilters: newFilter,
      };

    case UPDATE_RECIPES:
      return {
        ...state,
        filtered: newRecipesList,
      };
    default:
      return state;
  }
};

export default recipes;
