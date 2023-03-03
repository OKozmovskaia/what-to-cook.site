import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import api from "./middleware/api";
import generateId from "./middleware/generateId";
import rootReducer from "./reducer";

const preloadedState = {};
export default configureStore({
  middleware: [thunk, api, generateId],
  reducer: rootReducer,
  preloadedState,
});
