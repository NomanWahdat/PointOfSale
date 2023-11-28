import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: {},
  isEdit: false
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    dataAssign: (state, action) => {
      state.rowData = action.payload;
      state.isEdit = true;
    },

    dataRemove: state => {
      state.rowData = {};
      state.isEdit = false;
    }
  }
});
export const editActions = editSlice.actions;

export default editSlice.reducer;
