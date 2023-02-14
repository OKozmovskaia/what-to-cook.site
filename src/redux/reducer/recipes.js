import {
  LOAD_RECIPES,
  LOAD_MORE_RECIPES,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_RECIPES,
  REMOVE_ALL_FILTERS,
} from "../constants";
import { idAsKey } from "../utils/idAsKey";

const initialState = {
  entities: {},
  filtered: {},
  userFilters: [],
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
  const { type, data, newFilter, updateRecipes, error } = action;
  const { entities, userFilters } = state;

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
        filtered: idAsKey(data.recipes),
        loadMore: data.nextChunk,
        searchQuery: data.searchQuery,
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

    case LOAD_MORE_RECIPES + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case LOAD_MORE_RECIPES + SUCCESS:
      return {
        ...state,
        entities: { ...entities, ...idAsKey(data.recipes) },
        loadMore: data.nextChunk,
        loading: false,
        loaded: true,
      };

    case LOAD_MORE_RECIPES + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    case ADD_FILTER:
      return {
        ...state,
        userFilters: [...userFilters, newFilter],
      };

    case REMOVE_FILTER:
      return {
        ...state,
        userFilters: newFilter,
      };

    case REMOVE_ALL_FILTERS:
      return {
        ...state,
        userFilters: newFilter,
      };

    case UPDATE_RECIPES:
      return {
        ...state,
        filtered: updateRecipes,
      };
    default:
      return state;
  }
};

export default recipes;
