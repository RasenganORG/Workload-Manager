import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loggedTimeService from "./loggedTimeService";

const initialState = {
  loggedTime: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}

export const addLoggedTime = createAsyncThunk('loggedTask/add', async (loggedTimeObj, thunkAPI) => {
  try {
    return await loggedTimeService.addLoggedTime(loggedTimeObj)
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

export const getAllLoggedTime = createAsyncThunk('loggedTask/getAll', async (_, thunkAPI) => {
  try {
    return await loggedTimeService.getAllLoggedTime()
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

export const getLoggedTimeByTask = createAsyncThunk('loggedTask/getTimeByTask', async (taskId, thunkAPI) => {
  try {
    return await loggedTimeService.getLoggedTimeByTask(taskId)
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

export const getLoggedTimeByProject = createAsyncThunk('loggedTask/getTimeByProject', async (projectId, thunkAPI) => {
  try {
    return await loggedTimeService.getLoggedTimeByProject(projectId)
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


export const loggedTimeSlice = createSlice({
  name: 'loggedTime',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.loggedTime = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLoggedTime.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addLoggedTime.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addLoggedTime.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllLoggedTime.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllLoggedTime.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.loggedTime = action.payload
      })
      .addCase(getAllLoggedTime.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLoggedTimeByTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLoggedTimeByTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.loggedTime = action.payload
      })
      .addCase(getLoggedTimeByTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLoggedTimeByProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLoggedTimeByProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.loggedTime = action.payload
      })
      .addCase(getLoggedTimeByProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const loggedTimeActions = loggedTimeSlice.actions
export const { reset } = loggedTimeSlice.actions

export default loggedTimeSlice.reducer