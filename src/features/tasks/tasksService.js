import axios from "axios";
const UTP_URL = "http://localhost:8080/api/tasks/"
const ALL_TASKS_URL = "http://localhost:8080/api/tasks/get-all"

//UTP = user_task_project

//get all entries
const getTask = async () => {
  const response = await axios.get(UTP_URL);

  return response.data
}

const getAllTasks = async () => {
  const response = await axios.get(ALL_TASKS_URL)

  return response.data
}
//add utp
const addTask = async (data) => {
  const response = await axios.post(UTP_URL, data)

  return response.data
}

//update utp
const updateTask = async (utpData, utpId) => {
  const response = await axios.put(`${UTP_URL}${utpId}`, utpData)

  return response.data
}

//delete utp 
const deleteTask = async (utpId) => {
  const response = await axios.delete(`${UTP_URL}${utpId}`)

  return response.data
}

//delete all utp entries related to a project 
const deleteProjectTasks = async (projectId) => {
  const response = await axios.delete(`${UTP_URL}project-delete/${projectId}`)

  return response.data

}

//update the task entries so that all the tasks assigned to a user that was deleted from a project
//would be moved to unassigned
const removeUsersFromTasks = async (usersArr, projectId) => {
  const response = await axios.put(`${UTP_URL}remove-users/${projectId}`, usersArr)

  return response.data

}

const taskService = {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  deleteProjectTasks,
  removeUsersFromTasks
}

export default taskService
