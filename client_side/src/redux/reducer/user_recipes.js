import {
  REQUEST,
  SUCCESS,
  FAILURE,
  USER_GET_RECIPES,
  USER_DELETE_RECIPE,
} from "../constants";

import { idAsKeyForUser } from "../utils/idAsKey";

const initialState = {
  entities: {},
  loading: false,
  success: false,
};

const user_recipes = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case USER_GET_RECIPES + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_RECIPES + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        entities: idAsKeyForUser(data),
      };

    case USER_GET_RECIPES + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_DELETE_RECIPE + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DELETE_RECIPE + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        entities: idAsKeyForUser(data.recipes),
      };

    case USER_DELETE_RECIPE + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default user_recipes;
