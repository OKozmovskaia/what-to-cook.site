import {
  LOAD_RECIPES,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_RECIPES,
} from "../constants";

const initialState = {
  entities: [],
  filtered: [],
  filters: [],
  loading: false,
  loaded: false,
  error: null,
};

const recipes = (state = initialState, action) => {
  const { type, data, category, newFilters, updateList, error } = action;
  const { filters } = state;

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
        entities: data.recipes,
        filtered: data.recipes,
        count: data.count,
        loadMore: data.nextChunk,
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
        filters: [...filters, ...category],
      };

    case REMOVE_FILTER:
      return {
        ...state,
        filters: newFilters,
      };

    case UPDATE_RECIPES:
      return {
        ...state,
        filtered: updateList,
      };
    default:
      return state;
  }
};

export default recipes;
