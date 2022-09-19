import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectsSlice"
import userReducer from "../features/users/userSlice";
import billingReducer from "../features/billing/billingSlice"
import tasksReducer from "../features/tasks/tasksSlice"
import loggedTimeReducer from '../features/loggedTime/LoggedTimeSlice'
import userProjecReducer from '../features/userProject/userProjectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: userReducer,
    billing: billingReducer,
    tasks: tasksReducer,
    loggedTime: loggedTimeReducer,
    userProjectEntries: userProjecReducer
  }
})
