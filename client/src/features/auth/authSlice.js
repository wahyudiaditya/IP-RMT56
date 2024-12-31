import { createSlice } from "@reduxjs/toolkit";
import { myRecMovie } from "../../../helpers/http-client";
import { swalSuccess } from "../../../helpers/swallToast";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.data = action.payload;
    },
    setRegister: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLogin, setRegister } = authSlice.actions;

export const login = (email, password) => {
  return async (dispatch) => {
    const { data } = await myRecMovie.post("auths/login", {
      email,
      password,
    });
    localStorage.setItem("access_token", data.access_token);
    swalSuccess("Login Successfully");
    dispatch(setLogin(data));
  };
};

export const register = (email, password) => {
  return async (dispatch) => {
    await myRecMovie.post("auths/register", {
      email,
      password,
    });
    swalSuccess("Register Successfully");
  };
};

export default authSlice.reducer;
