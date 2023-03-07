import {
  USER_CREATE,
  USER_LOAD,
  REQUEST,
  SUCCESS,
  FAILURE,
  CLEAR_MESSAGE,
} from "../constants";

const initialState = {
  token: localStorage.getItem("TOKEN"),
  loading: false,
  loaded: false,
  message: null,
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
        loaded: true,
        message: data.message,
      };

    case USER_CREATE + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.message,
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
        loaded: true,
        message: data.message,
      };

    case USER_LOAD + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.message,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default user;
