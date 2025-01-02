import { createSlice } from "@reduxjs/toolkit";
import { swalError } from "../../utils/swallAlert";
import { myRecMovie } from "../../utils/http-client";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await myRecMovie.get("users/profiles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setUser(data.user));
    } catch (error) {
      swalError(error);
    }
  };
};

export const submitUpdateProfile = (name, profilePicture, actors, genres) => {
  return async () => {
    await myRecMovie.put(
      "users/profiles",
      {
        name,
        profilePicture,
        favoriteActors: actors,
        favoriteGenres: genres,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  };
};

export default userSlice.reducer;
