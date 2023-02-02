import { LOAD_RECIPES, REQUEST, SUCCESS, FAILURE } from "../constants";

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

const recipes = (state = initialState, action) => {
  const { type, data, error } = action;

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
    default:
      return state;
  }
};

export default recipes;
