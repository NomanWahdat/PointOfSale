import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: state => {
      state.user = {};
      state.isAuthenticated = false;
    }
  }
});
export const userActions = userSlice.actions;

export default userSlice.reducer;
