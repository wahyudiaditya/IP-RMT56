import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalFunFactsOpen: false,
  },
  reducers: {
    openFunFactsModal: (state) => {
      state.modalFunFactsOpen = true;
    },
    closeFunFactsModal: (state) => {
      state.modalFunFactsOpen = false;
    },
  },
});

export const { openFunFactsModal, closeFunFactsModal } = modalSlice.actions;

export default modalSlice.reducer;
