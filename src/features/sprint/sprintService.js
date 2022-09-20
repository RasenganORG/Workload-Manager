import axios from "axios";
const SPRINT_URL = "http://localhost:8080/api/sprint/"

const addSprint = async (data) => {
  const response = await axios.post(`${SPRINT_URL}add`, data);

  return response.data
}

const getSprintsByProject = async (projectId) => {
  const response = await axios.get(`${SPRINT_URL}getSprintsByProject/${projectId}`)

  return response.data
}


const sprintService = {
  addSprint,
  getSprintsByProject
}

export default sprintService
