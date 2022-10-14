import axios from "axios";
const LOGGED_TIME_URL = "http://localhost:8083/api/loggedTime/"

//get all entries
const addLoggedTime = async (data) => {
  const response = await axios.post(`${LOGGED_TIME_URL}add`, data);

  return response.data
}

const getAllLoggedTime = async () => {
  const response = await axios.get(`${LOGGED_TIME_URL}getAll`)

  return response.data
}

const getLoggedTimeByTask = async (taskId) => {
  const response = await axios.get(`${LOGGED_TIME_URL}byTask/${taskId}`)
  return response.data
}

const getLoggedTimeByProject = async (projectId) => {
  const response = await axios.get(`${LOGGED_TIME_URL}byProject/${projectId}`)

  return response.data
}
const loggedTimeService = {
  addLoggedTime,
  getAllLoggedTime,
  getLoggedTimeByTask,
  getLoggedTimeByProject
}

export default loggedTimeService
