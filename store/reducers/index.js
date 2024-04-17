import { combineReducers } from "redux";
import userReducer from "./userReducer"; // Example reducer, replace with your actual reducers

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers go here
});

export default rootReducer;
