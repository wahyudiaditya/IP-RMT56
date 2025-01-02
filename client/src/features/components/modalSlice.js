import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalFunFactsOpen: false,
    modalRecommendationOpen: false,
    modalUpdateProfile: false,
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
    openUpdateProfileModal: (state) => {
      state.modalUpdateProfile = true;
    },
    closeUpdateProfileModal: (state) => {
      state.modalUpdateProfile = false;
    },
  },
});

export const {
  openFunFactsModal,
  closeFunFactsModal,
  openRecommendationModal,
  closeRecommendationModal,
  openUpdateProfileModal,
  closeUpdateProfileModal,
} = modalSlice.actions;

export default modalSlice.reducer;
