import { combineReducers } from "redux";
import userReducer from "./userReducer"; // Make sure the path is correct

const rootReducer = combineReducers({
  user: userReducer,
  // Make sure to add other reducers here if you have any
});

export default rootReducer;
