import { USER_CREATE, REQUEST, SUCCESS, FAILURE } from "../constants";

const initialState = {
  token: localStorage.getItem("TOKEN"),
  loading: false,
  loaded: false,
  error: null,
};

const user = (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case USER_CREATE + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_CREATE + SUCCESS:
      return {
        ...state,
        token: data.token,
        username: data.username,
        email: data.email,
        loading: false,
        loaded: true,
        error: null,
      };

    case USER_CREATE + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        error,
      };

    default:
      return state;
  }
};

export default user;
