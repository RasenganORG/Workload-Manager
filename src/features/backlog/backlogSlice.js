import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backlogService from "./backlogService";

const initialState = {
  backlogItems: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}


export const getBacklogItems = createAsyncThunk('backlog/getAll', async (_, thunkAPI) => {
  try {
    return await backlogService.getBacklogItems()
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



export const backlogSlice = createSlice({
  name: 'backlog',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.backlogItems = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBacklogItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBacklogItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.backlogItems = action.payload
      })
      .addCase(getBacklogItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const backlogActions = backlogSlice.actions
export const { reset } = backlogSlice.actions

export default backlogSlice.reducer