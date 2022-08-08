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

  },
})

export const userAction = userSlice.actions;
export const { reset } = userSlice.actions
export default userSlice.reducer
