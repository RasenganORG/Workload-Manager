import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import utpService from "./users_tasks_projectsService";

const initialState = {
  users_tasks_projects: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}

export const addUTP = createAsyncThunk('user_task_project/add', async (utp, thunkAPI) => {
  try {
    return await utpService.addUTP(utp)
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

export const getAllUTPs = createAsyncThunk('user_task_project/getAll', async (utp, thunkAPI) => {
  try {
    return await utpService.getAllUTPs()
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

export const getUTP = createAsyncThunk('user_task_project/get', async (utp, thunkAPI) => {
  try {
    return await utpService.getUTP()
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

export const updateUTP = createAsyncThunk('user_task_project/update', async (utpInfo, thunkAPI) => {
  try {
    const { utpData, utpId } = utpInfo
    return await utpService.updateUTP(utpData, utpId)
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

export const deleteUTP = createAsyncThunk('user_task_project/delete', async (utpId, thunkAPI) => {
  try {
    return await utpService.deleteUTP(utpId)
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

export const deleteProjectUTP = createAsyncThunk('user_task_project/deleteProject', async (projectId, thunkAPI) => {
  try {
    return await utpService.deleteProjectUTP(projectId)
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

export const removeUsersFromUTPs = createAsyncThunk('user_task_project/removeUsers', async (data, thunkAPI) => {
  try {
    const { usersArr, projectId } = data

    return await utpService.removeUsersFromUTPs(usersArr, projectId)
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

export const utpSlice = createSlice({
  name: 'users_tasks_projects',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.users_tasks_projects = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addUTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUTPs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUTPs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users_tasks_projects = action.payload
      })
      .addCase(getAllUTPs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProjectUTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProjectUTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteProjectUTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateUTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeUsersFromUTPs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUsersFromUTPs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(removeUsersFromUTPs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const utpActions = utpSlice.actions
export const reset = utpService.actions
export default utpSlice.reducer