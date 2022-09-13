import axios from "axios";
const UTP_URL = "http://localhost:8080/api/user_task_project/"
const ALL_UTP_URL = "http://localhost:8080/api/user_task_project/get-all"

//UTP = user_task_project

//get all entries
const getUTP = async () => {
  const response = await axios.get(UTP_URL);

  return response.data
}

const getAllUTPs = async () => {
  const response = await axios.get(ALL_UTP_URL)

  return response.data
}
//add utp
const addUTP = async (data) => {
  const response = await axios.post(UTP_URL, data)

  return response.data
}

//update utp
const updateUTP = async (utpData, utpId) => {
  const response = await axios.put(`${UTP_URL}${utpId}`, utpData)

  return response.data
}

//delete utp 
const deleteUTP = async (utpId) => {
  const response = await axios.delete(`${UTP_URL}${utpId}`)

  return response.data
}

//delete all utp entries related to a project 
const deleteProjectUTP = async (projectId) => {
  const response = await axios.delete(`${UTP_URL}project-delete/${projectId}`)

  return response.data

}

//update the task entries so that all the tasks assigned to a user that was deleted from a project
//would be moved to unassigned
const removeUsersFromUTPs = async (usersArr, projectId) => {
  const response = await axios.put(`${UTP_URL}remove-users/${projectId}`, usersArr)

  return response.data

}

const utpService = {
  getUTP,
  addUTP,
  getAllUTPs,
  updateUTP,
  deleteUTP,
  deleteProjectUTP,
  removeUsersFromUTPs
}

export default utpService
