import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalFunFactsOpen: false,
    modalRecommendationOpen: false,
  },
  reducers: {
    openFunFactsModal: (state) => {
      state.modalFunFactsOpen = true;
    },
    closeFunFactsModal: (state) => {
      state.modalFunFactsOpen = false;
    },
    openRecommendationModal: (state) => {
      state.modalRecommendationOpen = true;
    },
    closeRecommendationModal: (state) => {
      state.modalRecommendationOpen = false;
    },
  },
});

export const {
  openFunFactsModal,
  closeFunFactsModal,
  openRecommendationModal,
  closeRecommendationModal,
} = modalSlice.actions;

export default modalSlice.reducer;
