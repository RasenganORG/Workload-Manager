import axios from "axios";
const SPRINT_URL = "http://localhost:8083/api/sprint/"

const addSprint = async (data) => {
  const response = await axios.post(`${SPRINT_URL}add`, data);

  return response.data
}

const getSprintsByProject = async (projectId) => {
  const response = await axios.get(`${SPRINT_URL}getSprintsByProject/${projectId}`)

  return response.data
}

const getAllSprints = async () => {
  const response = await axios.get(`${SPRINT_URL}getAll`)

  return response.data
}

const sprintService = {
  addSprint,
  getSprintsByProject,
  getAllSprints
}

export default sprintService
