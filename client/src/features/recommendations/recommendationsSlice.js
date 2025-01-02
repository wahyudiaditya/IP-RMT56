import { createSlice } from "@reduxjs/toolkit";
import { swalError } from "../../utils/swallAlert";
import { myRecMovie } from "../../utils/http-client";

export const recommendationsSlice = createSlice({
  name: "recommendation",
  initialState: {
    userRecommendations: [],
  },
  reducers: {
    setUserRecommendations: (state, action) => {
      state.userRecommendations = action.payload;
    },
  },
});

export const { setUserRecommendations } = recommendationsSlice.actions;

export const fetchUserRecommendations = () => {
  return async (dispatch) => {
    try {
      const { data } = await myRecMovie.get("users/recommendations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setUserRecommendations(data));
    } catch (error) {
      swalError(error.response.data.message);
    }
  };
};

export default recommendationsSlice.reducer;
