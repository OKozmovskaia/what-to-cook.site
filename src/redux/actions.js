import {
  LOAD_RECIPES,
  LOAD_MORE_RECIPES,
  ADD_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  UPDATE_RECIPES,
  UPDATE_FILTERS,
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
} from "./constants";
import {
  filtredRecipesSelector,
  userFiltersSelector,
  newFiltersSelector,
  tokenSelector,
} from "./selectors";

// RECIPES
export const loadRecipesByQuery = (query) => ({
  type: LOAD_RECIPES,
  callAPI: `/api/find-recipes?q=${query}`,
});

export const loadMoreRecipes = (link) => ({
  type: LOAD_MORE_RECIPES,
  callAPI: `/api/load-more`,
  postData: link,
});

export const updateRecipes = () => async (dispatch, getState) => {
  const updateRecipes = filtredRecipesSelector(getState());
  await dispatch({ type: UPDATE_RECIPES, updateRecipes });
};

export const updateFilters = () => async (dispatch, getState) => {
  const updateFilters = newFiltersSelector(getState());
  await dispatch({ type: UPDATE_FILTERS, updateFilters });
};

export const addFilter = (id) => ({
  type: ADD_FILTER,
  newFilter: id,
});

export const removeFilter = (id) => async (dispatch, getState) => {
  const userFilters = userFiltersSelector(getState());
  const newFilter = userFilters.filter((i) => i !== id);

  await dispatch({
    type: REMOVE_FILTER,
    newFilter,
  });
};

export const removeAllFilters = () => ({
  type: REMOVE_ALL_FILTERS,
  newFilter: [],
});

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
