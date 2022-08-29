import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectsSlice"
import userReducer from "../features/users/userSlice";
import billingReducer from "../features/billing/billingSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: userReducer,
    billing: billingReducer
  }
})
