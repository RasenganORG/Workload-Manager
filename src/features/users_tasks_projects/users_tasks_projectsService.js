import axios from "axios";
const UTP_URL = "http://localhost:8080/api/user_task_project/"

//UTP = user_task_prokect

//get all entries
const getUTP = async () => {
  const response = await axios.get(UTP_URL);

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

const utpService = {
  getUTP,
  addUTP,
  updateUTP,
  deleteUTP,
  deleteProjectUTP
}

export default utpService
