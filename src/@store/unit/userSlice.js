import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUnit: {}
};

export const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    selectUnit: (state, action) => {
      state.selectedUnit = action.payload;
    }
  }
});
export const unitActions = unitSlice.actions;

export default unitSlice.reducer;
