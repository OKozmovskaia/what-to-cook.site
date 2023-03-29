import {
  USER_CREATE,
  USER_LOAD,
  REQUEST,
  SUCCESS,
  FAILURE,
  USER_LOGIN,
  USER_OAUTH,
  USER_OAUTH_CALLBACK,
} from "../constants";

const initialState = {
  token: JSON.parse(localStorage.getItem("TOKEN")),
  id: JSON.parse(localStorage.getItem("USER_ID")),
  redirectTo: "",
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
        id: data.id,
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
        id: data.id,
        loading: false,
        success: true,
      };

    case USER_LOGIN + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_OAUTH + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_OAUTH + SUCCESS:
      return {
        ...state,
        loading: false,
        redirectTo: data.location,
      };

    case USER_OAUTH + FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case USER_OAUTH_CALLBACK + REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_OAUTH_CALLBACK + SUCCESS:
      return {
        ...state,
        token: data.token,
        id: data.id,
        loading: false,
        success: true,
      };

    case USER_OAUTH_CALLBACK + FAILURE:
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
