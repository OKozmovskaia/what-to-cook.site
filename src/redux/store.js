import { applyMiddleware, configureStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";

import api from "./middleware/api";
import generateId from "./middleware/generateId";
import reducer from "./reducer";

const enhancer = applyMiddleware(thunk, api, generateId);

export default configureStore(reducer, composeWithDevTools(enhancer));
