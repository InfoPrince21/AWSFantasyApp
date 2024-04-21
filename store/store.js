import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/users/userSlice";
import { teamReducer } from "../features/teams/teamSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Combine reducers to create a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer,
});

// Apply redux-persist to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor for the Redux store
export const persistor = persistStore(store);
