import axios from "axios";
const PROJECTS_URL = "http://localhost:8080/api/projects/"
const PROJECT_URL = "http://localhost:8080/api/project/"
//get all projects
const getProjects = async () => {
  const response = await axios.get(PROJECTS_URL);

  return response.data
}

//add a project
const addProject = async (taskData) => {
  const response = await axios.post(PROJECT_URL, taskData)

  return response.data
}

//get an individual project 
const getProjectItem = async (projectId) => {
  const response = await axios.get(`${PROJECT_URL}${projectId}`)

  return response.data
}
//update project 
const updateProject = async (projectData, projectId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}`, projectData)

  return response.data
}
//delete project 
const deleteProject = async (projectId) => {
  const response = await axios.delete(`${PROJECT_URL}${projectId}`)

  return response.data
}

//add a task
const addTask = async (taskData, projectId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/add-task`, taskData)

  return response.data
}

//update a task
const updateTask = async (data, projectId, taskId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/tasks/${taskId}`, data)

  return response.data
}

//delete a task
const deleteTask = async (taskData, projectId, taskID) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/tasks/${taskID}/delete`, taskData)

  return response.data
}

const projectsService = {
  getProjects,
  addProject,
  getProjectItem,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask
}

export default projectsService
