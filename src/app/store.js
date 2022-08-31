import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectsSlice"
import userReducer from "../features/users/userSlice";
import billingReducer from "../features/billing/billingSlice"
import utpReducer from "../features/users_tasks_projects/user_task_projectSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: userReducer,
    billing: billingReducer,
    users_tasks_projects: utpReducer
  }
})
