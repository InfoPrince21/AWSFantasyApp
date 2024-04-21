// src/features/users/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define synchronous reducers here
  },
});

export const teamReducer = teamSlice.reducer;
