import {
  USER_LOGIN,
  USER_CREATE,
  USER_LOAD,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  USER_OAUTH,
  USER_OAUTH_CALLBACK,
  USER_FORGOT_PASSWORD,
  USER_RESET_PASSWORD,
} from "../constants";
import { tokenSelector } from "../selectors";

// USER
export const userLogin = (data) => ({
  type: USER_LOGIN,
  callAPI: `/api/log-in`,
  postData: data,
});

export const userCreate = (data) => ({
  type: USER_CREATE,
  callAPI: `/api/sign-up`,
  postData: data,
});

export const userLoad = (token) => ({
  type: USER_LOAD,
  callAPI: `/api/me`,
  token,
});

export const setMessage = (data) => ({
  type: SET_MESSAGE,
  data,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const userOAuth = (provider) => ({
  type: USER_OAUTH,
  callAPI: `/api/oauth/${provider}`,
});

export const userOAuthCallback = (code, provider) => ({
  type: USER_OAUTH_CALLBACK,
  callAPI: `/api/oauth_callback?code=${code}`,
  postData: provider,
});

export const forgotPassword = (data) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_FORGOT_PASSWORD,
    callAPI: `/api/forgot_password`,
    token,
    postData: data,
  });
};

export const resetPassword = (data) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_RESET_PASSWORD,
    callAPI: `/api/reset_password`,
    postData: data,
    token,
  });
};
