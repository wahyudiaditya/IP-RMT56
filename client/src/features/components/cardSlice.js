import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    detail: false,
  },
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setDetail } = cardSlice.actions;

export const isDetail = (valid) => {
  return (dispatch) => {
    dispatch(setDetail(valid));
  };
};

export default cardSlice.reducer;
