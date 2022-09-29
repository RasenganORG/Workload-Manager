import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sprintService from "./sprintService";

const initialState = {
  sprints: null,
  currentSprintId: '',
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}


export const addSprint = createAsyncThunk('sprint/add', async (data, thunkAPI) => {
  try {
    return await sprintService.addSprint(data)
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

export const getSprintsByProject = createAsyncThunk('sprint/getSprintsByProject', async (projectId, thunkAPI) => {
  try {
    return await sprintService.getSprintsByProject(projectId)
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

export const getAllSprints = createAsyncThunk('sprint/getAll', async (_, thunkAPI) => {
  try {
    return await sprintService.getAllSprints()
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


export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.sprints = null
    },
    updateCurrentSprintId: (state, action) => {
      state.currentSprintId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSprint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSprint.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addSprint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSprintsByProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSprintsByProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sprints = action.payload
      })
      .addCase(getSprintsByProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllSprints.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllSprints.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sprints = action.payload
      })
      .addCase(getAllSprints.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


  }
})

export const sprintActions = sprintSlice.actions
export const { reset, updateCurrentSprintId } = sprintSlice.actions

export default sprintSlice.reducer

