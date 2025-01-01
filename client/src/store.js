import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import moviesReducer from "./features/movies/moviesSlice";
import cardReducer from "./features/components/cardSlice";
import modalReducer from "./features/components/modalSlice";
// import authFormReducer from "./features/auth/components/authFormSlice";

export default configureStore({
  reducer: {
    auths: authReducer,
    movies: moviesReducer,
    card: cardReducer,
    modal: modalReducer,
    // authForm: authFormReducer,
  },
});
