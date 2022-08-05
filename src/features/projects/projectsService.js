import axios from "axios";
const PROJECTS_URL = "http://localhost:8080/api/projects/"
const PROJECT_URL = "http://localhost:8080/api/project/"
//get all projects
const getProjects = async () => {
  const response = await axios.get(PROJECTS_URL);

  return response.data
}

//add a project
const addProject = async (projectData) => {
  const response = await axios.post(PROJECT_URL, projectData)

  return response.data
}

//get an individual project 
const getProject = async (projectId) => {
  const response = await axios.get(`${PROJECT_URL}${projectId}`)

  return response.data
}

//update project 
const updateProject = async (projectData, projectId) => {
  const response = await axios.put(`${PROJECT_URL}${projectId}/add-task`, projectData)

  return response.data
}
const projectsService = {
  getProjects,
  addProject,
  getProject,
  updateProject
}

export default projectsService
