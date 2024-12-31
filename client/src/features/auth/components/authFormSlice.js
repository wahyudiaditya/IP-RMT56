// import { createSlice } from "@reduxjs/toolkit";
// import { myRecMovie } from "../../../utils/http-client";
// import { swalSuccess } from "../../../utils/swallAlert";

// export const authFormSlice = createSlice({
//   name: "authForm",
//   initialState: {
//     data: {},
//   },
//   reducers: {
//     setGoogleLogin: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// export const { setGoogleLogin } = authFormSlice;

// export const googleLogin = (response) => {
//   return async (dispatch) => {
//     const { data } = await myRecMovie.post("auths/login/google", {
//       clientToken: response.credential,
//     });
//     localStorage.setItem("access_token", data.access_token);
//     swalSuccess("Login Successfully");
//     dispatch(setGoogleLogin(data));
//   };
// };

// export default authFormSlice.reducer;
