import { REQUEST, SUCCESS, FAILURE } from "../constants";

const createPostParams = (data) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

const api = (store) => (next) => async (action) => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, postData, ...rest } = action;
  console.log("POST DATA: ", postData);
  next({ ...rest, type: type + REQUEST });

  try {
    const params = postData ? createPostParams(postData) : {};

    const res = await fetch(callAPI, params);
    const data = await res.json();

    if (!res.ok) throw data;

    return next({ ...rest, type: type + SUCCESS, data });
  } catch (error) {
    throw next({ ...rest, type: type + FAILURE, error });
  }
};

export default api;
