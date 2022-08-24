import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectsService from "./projectsService.js";

const initialState = {
  projectList: null,
  currentProject: {
    isSuccess: false,
    project: null
  },
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
}
// TODO
// -projectList
// -currentProject(tasks to be deleted from here)
// -tasks
// remove context from outlet and use nested loading inside tasks
// use dependency[tasksDone] for tasks success
// change name of getProjec to getProjectItem to avoid mixins with getProgentS
export const addProject = createAsyncThunk('projects/addProject', async (project, thunkAPI) => {
  try {
    return await projectsService.addProject(project)
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

export const getProjects = createAsyncThunk('projects/getProjects', async (project, thunkAPI) => {
  try {
    return await projectsService.getProjects()
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
//TODO projecitem in loc de 
export const getProjectItem = createAsyncThunk('projects/getProjectItem', async (projectId, thunkAPI) => {
  try {
    return await projectsService.getProjectItem(projectId)
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

export const addTask = createAsyncThunk('projects/addTask', async (taskInfo, thunkAPI) => {
  try {
    const { taskData, projectId } = taskInfo
    return await projectsService.addTask(taskData, projectId)
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

export const updateTask = createAsyncThunk('projects/updateTask', async (taskInfo, thunkAPI) => {
  try {
    const { data, projectId, taskId } = taskInfo
    console.log(data)
    return await projectsService.updateTask(data, projectId, taskId)
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

export const deleteTask = createAsyncThunk('projects/deleteTask', async (taskInfo, thunkAPI) => {
  try {
    const { data, projectId, taskId } = taskInfo
    return await projectsService.deleteTask(data, projectId, taskId)
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



export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.currentProject = null
    },
    resetCurrentProjectSuccess: (state) => {
      state.currentProject.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.projectList = action.payload
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.projectList = null
      })
      .addCase(addProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProjectItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjectItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentProject.project = action.payload
      })
      .addCase(getProjectItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.currentProject.project = null
      })
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isSuccess = true
        state.currentProject.isSuccess = true
      })
      .addCase(addTask.rejected, (state, action) => {
        state.currentProject.isSuccess = true
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isSuccess = true
        state.currentProject.isSuccess = true

      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        // state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isSuccess = true
        state.currentProject.isSuccess = true

      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })


  },
})

export const projectsActions = projectsSlice.actions;
export const { reset, resetCurrentProjectSuccess } = projectsSlice.actions
export default projectsSlice.reducer
