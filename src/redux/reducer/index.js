import { combineReducers } from "redux";

import recipes from "./recipes";
import user from "./user";
import message from "./message";
import user_recipes from "./user_recipes";

export default combineReducers({
  recipes,
  user,
  message,
  user_recipes,
});
