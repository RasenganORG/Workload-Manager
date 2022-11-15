import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import billingService from "./billingService";

const initialState = {
  billingOptions: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}

export const getBillingOptions = createAsyncThunk('billing/getBillingOptions', async (billingOptions, thunkAPI) => {
  try {
    return await billingService.getBillingOptions()
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

export const addBilling = createAsyncThunk('billing/addBilling', async (billingData, thunkAPI) => {
  try {
    return await billingService.addBilling(billingData)
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

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBillingOptions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBillingOptions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.billingOptions = action.payload
      })
      .addCase(getBillingOptions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.billingOptions = null
      })
      .addCase(addBilling.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addBilling.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addBilling.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.billingOptions = null
      })
  }
})

export const billingActions = billingSlice.actions
export const { reset } = billingSlice.actions
export default billingSlice.reducer
