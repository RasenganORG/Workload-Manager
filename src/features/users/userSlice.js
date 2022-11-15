import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService.js";

const initialState = {
  userList: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (project, thunkAPI) => {
  try {
    return await userService.getAllUsers()
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getUser = createAsyncThunk('users/getUser', async (userId, thunkAPI) => {
  try {
    return await userService.getUser(userId)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateUser = createAsyncThunk('users/updateUser', async (userData, thunkAPI) => {
  try {
    const { data, userId } = userData
    return await userService.updateUser(data, userId)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateUsersProject = createAsyncThunk('users/updateUserProjects', async (userData, thunkAPI) => {
  try {
    const { data, projectId } = userData
    return await userService.updateUsersProject(userData, projectId)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.userList = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userList = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userList = null
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUsersProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUsersProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateUsersProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const userAction = userSlice.actions;
export const { reset } = userSlice.actions
export default userSlice.reducer
