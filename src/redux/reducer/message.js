import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants";

const initialState = {
  body: "",
  error: false,
  success: false,
};

const message = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        body: data.body,
        error: data.error,
        success: data.success,
      };

    case CLEAR_MESSAGE:
      return initialState;

    default:
      return state;
  }
};

export default message;
