import { createSlice } from "@reduxjs/toolkit";
import { swalError } from "../../utils/swallAlert";
import { myRecMovie } from "../../utils/http-client";

export const recommendationsSlice = createSlice({
  name: "recommendation",
  initialState: {
    userRecommendations: [],
    usersRecommendations: [],
  },
  reducers: {
    setUserRecommendations: (state, action) => {
      state.userRecommendations = action.payload;
    },
    setUsersRecommendations: (state, action) => {
      state.usersRecommendations = action.payload;
    },
  },
});

export const { setUserRecommendations, setUsersRecommendations } =
  recommendationsSlice.actions;

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

export const fetchUsersRecommendations = () => {
  return async (dispatch) => {
    try {
      const { data } = await myRecMovie.get("recommendations/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(response, "ini apaan ?");
      dispatch(setUsersRecommendations(data.users));
    } catch (error) {
      swalError(error.response.data.message);
    }
  };
};

export default recommendationsSlice.reducer;
