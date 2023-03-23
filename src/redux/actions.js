import {
  USER_SAVE_RECIPE,
  USER_GET_RECIPES,
  USER_DELETE_RECIPE,
  USER_SAVE_PRODUCT,
  USER_UPDATE_PRODUCT,
  USER_DELETE_PRODUCT,
  USER_GET_PRODUCTS,
} from "./constants";
import { tokenSelector } from "./selectors";

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
