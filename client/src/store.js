import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import moviesReducer from "./features/movies/moviesSlice";
// import authFormReducer from "./features/auth/components/authFormSlice";

export default configureStore({
  reducer: {
    auths: authReducer,
    movies: moviesReducer,
    // authForm: authFormReducer,
  },
});
