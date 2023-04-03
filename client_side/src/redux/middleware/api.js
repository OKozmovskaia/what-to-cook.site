import { REQUEST, SUCCESS, FAILURE, SET_MESSAGE } from "../constants";

const createParams = (token, data) => {
  if (token && data) {
    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } else if (token) {
    return {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  } else if (data) {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } else {
    return {};
  }
};

const api = (store) => (next) => async (action) => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, postData, token, ...rest } = action;

  next({ ...rest, type: type + REQUEST });

  try {
    const params = createParams(token ? token : null, postData);
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
