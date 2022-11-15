import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userProjectService from "./userProjectService";

const initialState = {
  userProjectEntries: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}

export const addUserProject = createAsyncThunk('userProject/add', async (usersArray, thunkAPI) => {
  try {
    return await userProjectService.addUserProject(usersArray)
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

export const removeUserProjects = createAsyncThunk('userProject/removeUserProjects', async (projectId, thunkAPI) => {
  try {
    return await userProjectService.removeUserProjects(projectId)
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

export const removeProjectUsers = createAsyncThunk('userProject/removeProjectUsers', async (userId, thunkAPI) => {
  try {
    return await userProjectService.removeProjectUsers(userId)
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

export const removeUsersFromProject = createAsyncThunk('userProject/removeUsersFromProject', async (userData, thunkAPI) => {
  try {
    return await userProjectService.removeUsersFromProject(userData)
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

export const getUserProjects = createAsyncThunk('userProject/getUserProjects', async (userId, thunkAPI) => {
  try {
    return await userProjectService.getUserProjects(userId)
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

export const getProjectUsers = createAsyncThunk('userProject/getProjectUsers', async (projectId, thunkAPI) => {
  try {
    return await userProjectService.getProjectUsers(projectId)
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

export const getAllUserProjectEntries = createAsyncThunk('userProject/getAll', async (_, thunkAPI) => {
  try {
    return await userProjectService.getAllUserProjectEntries()
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


export const userProjectSlice = createSlice({
  name: 'userProject',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.userProjectEntries = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUserProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addUserProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeUserProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUserProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(removeUserProjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeProjectUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeProjectUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(removeProjectUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeUsersFromProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUsersFromProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(removeUsersFromProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProjectEntries = action.payload
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProjectUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjectUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProjectEntries = action.payload
      })
      .addCase(getProjectUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUserProjectEntries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUserProjectEntries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProjectEntries = action.payload
      })
      .addCase(getAllUserProjectEntries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const userProjectActions = userProjectSlice.actions
export const { reset } = userProjectSlice.actions

export default userProjectSlice.reducer
