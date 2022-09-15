import axios from "axios";
const LOGGED_TIME_URL = "http://localhost:8080/api/loggedTime/"

//get all entries
const addLoggedTime = async (data) => {
  const response = await axios.post(`${LOGGED_TIME_URL}add`, data);

  return response.data
}

const getAllLoggedTime = async () => {
  const response = await axios.get(`${LOGGED_TIME_URL}get-all`)

  return response.data
}

const loggedTimeService = {
  addLoggedTime,
  getAllLoggedTime
}

export default loggedTimeService
