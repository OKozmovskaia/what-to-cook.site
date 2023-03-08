import { REQUEST, SUCCESS, FAILURE, SET_MESSAGE } from "../constants";

const createPostParams = (data) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

const createAuthHeader = (token) => ({
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const api = (store) => (next) => async (action) => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, postData, token, ...rest } = action;

  next({ ...rest, type: type + REQUEST });

  try {
    const params = token
      ? createAuthHeader(token)
      : postData
      ? createPostParams(postData)
      : {};

    const res = await fetch(callAPI, params);
    const data = await res.json();

    if (!res.ok) throw data;

    next({ ...rest, type: type + SUCCESS, data });
    if (data.message) next({ ...rest, type: SET_MESSAGE, data: data.message });
  } catch (data) {
    next({ ...rest, type: type + FAILURE, data });
    if (data.message) next({ ...rest, type: SET_MESSAGE, data: data.message });
  }
};

export default api;
