import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Make sure this is correctly set up to combine your reducers

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* other middleware if any */),
  devTools: process.env.NODE_ENV !== "production", // Automatically use Redux DevTools in development
});

export default store;
