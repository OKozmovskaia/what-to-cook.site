import {
  USER_GET_PRODUCTS,
  USER_DELETE_PRODUCT,
  USER_UPDATE_PRODUCT,
  REQUEST,
  SUCCESS,
  FAILURE,
} from "../constants";

import { idAsKeyForUser } from "../utils/idAsKey";

const initialState = {
  entities: {},
  loading: false,
  success: false,
};

const user_product = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case USER_GET_PRODUCTS + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_PRODUCTS + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: idAsKeyForUser(data.productList),
      };

    case USER_GET_PRODUCTS + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_UPDATE_PRODUCT + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_UPDATE_PRODUCT + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: idAsKeyForUser(data.productList),
      };

    case USER_UPDATE_PRODUCT + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_DELETE_PRODUCT + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DELETE_PRODUCT + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: idAsKeyForUser(data.productList),
      };

    case USER_DELETE_PRODUCT + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default user_product;
