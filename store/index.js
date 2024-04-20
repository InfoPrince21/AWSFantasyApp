import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define the initial state and reducers using createSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Extract the action creators and the reducer
const { actions, reducer: userReducer } = userSlice;
const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = actions;

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Export Actions and Store
export { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, store };
