import { combineReducers } from "redux";

import recipes from "./recipes";
import user from "./user";
import message from "./message";

export default combineReducers({
  recipes,
  user,
  message,
});
