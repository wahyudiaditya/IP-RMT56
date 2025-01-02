import { createSlice } from "@reduxjs/toolkit";
import { myRecMovie } from "../../../utils/http-client";
import { swalSuccess } from "../../../utils/swallAlert";

export const authFormSlice = createSlice({
  name: "authForm",
  initialState: {},
  reducers: {},
});

export const googleLogin = (response) => {
  return async () => {
    const { data } = await myRecMovie.post("auths/login/google", {
      clientToken: response.credential,
    });
    localStorage.setItem("access_token", data.access_token);
    const id = JSON.parse(atob(data.access_token.split(".")[1])).id;
    localStorage.setItem("userId", id);
    swalSuccess("Login Successfully");
  };
};

export default authFormSlice.reducer;
