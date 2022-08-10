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
const getProject = async (projectId) => {
  const response = await axios.get(`${PROJECT_URL}${projectId}`)

  return response.data
}

//add a task
const addTask = async (taskData, projectId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/add-task`, taskData)

  return response.data
}
//update a task
const updateTask = async (taskData, taskId, projectId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/tasks/${taskId}`, taskData)

  return response.data
}

const projectsService = {
  getProjects,
  addProject,
  getProject,
  addTask,
  updateTask
}

export default projectsService
