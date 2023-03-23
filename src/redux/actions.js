import {
  USER_LOGIN,
  USER_CREATE,
  USER_LOAD,
  CLEAR_MESSAGE,
  USER_OAUTH,
  USER_OAUTH_CALLBACK,
  USER_FORGOT_PASSWORD,
  USER_RESET_PASSWORD,
  USER_SAVE_RECIPE,
  USER_GET_RECIPES,
  USER_DELETE_RECIPE,
  USER_SAVE_PRODUCT,
  USER_UPDATE_PRODUCT,
  USER_DELETE_PRODUCT,
  USER_GET_PRODUCTS,
} from "./constants";
import { tokenSelector } from "./selectors";

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

export const saveRecipe = (data) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_SAVE_RECIPE,
    callAPI: `/api/save-recipe`,
    postData: data,
    token,
  });
};

export const getAllUserRecipes = () => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_GET_RECIPES,
    callAPI: `/api/get-recipes`,
    token,
  });
};

export const deleteRecipe = (id) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_DELETE_RECIPE,
    callAPI: `/api/delete-recipe/${id}`,
    token,
  });
};

export const saveProduct = (data) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_SAVE_PRODUCT,
    callAPI: `/api/save-product`,
    postData: data,
    token,
  });
};

export const updateProduct = (data) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_UPDATE_PRODUCT,
    callAPI: `/api/update-product`,
    postData: data,
    token,
  });
};

export const getAllUserProducts = () => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_GET_PRODUCTS,
    callAPI: `/api/get-product_list`,
    token,
  });
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = tokenSelector(getState());

  await dispatch({
    type: USER_DELETE_PRODUCT,
    callAPI: `/api/delete-product/${id}`,
    token,
  });
};
