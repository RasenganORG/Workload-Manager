import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./tasksService";

const initialState = {
  tasks: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  reloadTasks: true,
  message: ''
}

export const addTask = createAsyncThunk('tasks/add', async (task, thunkAPI) => {
  try {
    return await taskService.addTask(task)
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

export const getAllTasks = createAsyncThunk('tasks/getAll', async (task, thunkAPI) => {
  try {
    return await taskService.getAllTasks()
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

export const getTask = createAsyncThunk('tasks/get', async (task, thunkAPI) => {
  try {
    return await taskService.getTask()
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

export const updateTask = createAsyncThunk('tasks/update', async (taskInfo, thunkAPI) => {
  try {
    const { taskData, taskId } = taskInfo
    return await taskService.updateTask(taskData, taskId)
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

export const deleteTask = createAsyncThunk('tasks/delete', async (taskId, thunkAPI) => {
  try {
    return await taskService.deleteTask(taskId)
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

export const deleteProjectTasks = createAsyncThunk('tasks/deleteProject', async (projectId, thunkAPI) => {
  try {
    return await taskService.deleteProjectTasks(projectId)
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

export const removeUsersFromTasks = createAsyncThunk('tasks/removeUsers', async (data, thunkAPI) => {
  try {
    const { usersArr, projectId } = data

    return await taskService.removeUsersFromTasks(usersArr, projectId)
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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.tasks = null
    },
    resetReloadTasks: (state) => {
      state.reloadTasks = false
    },
    resetTasksSuccess: (state) => {
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reloadTasks = true

      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProjectTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProjectTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteProjectTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
        state.reloadTasks = true

      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeUsersFromTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUsersFromTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(removeUsersFromTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const tasksActions = tasksSlice.actions
export const { reset, resetReloadTasks, resetTasksSuccess } = tasksSlice.actions

export default tasksSlice.reducer
