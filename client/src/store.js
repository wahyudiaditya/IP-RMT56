import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
// import authFormReducer from "./features/auth/components/authFormSlice";

export default configureStore({
  reducer: {
    auths: authReducer,
    // authForm: authFormReducer,
  },
});
