import {
  USER_CREATE,
  USER_LOAD,
  REQUEST,
  SUCCESS,
  FAILURE,
  USER_LOGIN,
} from "../constants";

const initialState = {
  token: localStorage.getItem("TOKEN"),
  loading: false,
  success: false,
};

const user = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case USER_CREATE + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_CREATE + SUCCESS:
      return {
        ...state,
        token: data.token,
        loading: false,
        success: true,
      };

    case USER_CREATE + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_LOAD + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOAD + SUCCESS:
      return {
        ...state,
        email: data.email,
        username: data.username,
        loading: false,
        success: true,
      };

    case USER_LOAD + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_LOGIN + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN + SUCCESS:
      return {
        ...state,
        token: data.token,
        loading: false,
        success: true,
      };

    case USER_LOGIN + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default user;
