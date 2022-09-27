
import axios from "axios";
const USER_PROJECT_URL = "http://localhost:8080/api/userProject/"

//add an array of users to the userProject table
const addUserProject = async (usersArray) => {
  const response = await axios.post(`${USER_PROJECT_URL}add`, usersArray)

  return response.data
}
//remove all projects with a given id
const removeUserProjects = async (projectId) => {
  const response = await axios.delete(`${USER_PROJECT_URL}${projectId}`)

  return response.data
}
//remove all users with a given id
const removeProjectUsers = async (userId) => {
  const response = await axios.delete(`${USER_PROJECT_URL}${userId}`)

  return response.data
}

//receive an array of users and remove it from the project
const removeUsersFromProject = async (data) => {
  ///data should be passed as an object with a projectId key and an iu
  const response = await axios.delete(`${USER_PROJECT_URL}removeUsersFromProject`, { data: data })
  return response.data
}


//get all projects where an user is present
const getUserProjects = async (userId) => {
  const response = await axios.get(`${USER_PROJECT_URL}getUserProject/${userId}`)
  return response.data
}
//get all users from a project
const getProjectUsers = async (projectId) => {
  const response = await axios.get(`${USER_PROJECT_URL}getProjectUsers/${projectId}`)

  return response.data
}
//get all userProject entries
const getAllProjectUserEntries = async () => {
  const response = await axios.get(`${USER_PROJECT_URL}getAll/`)

  return response.data
}

const userProjectService = {
  addUserProject,
  removeUserProjects,
  removeProjectUsers,
  removeUsersFromProject,
  getUserProjects,
  getProjectUsers,
  getAllProjectUserEntries
}

export default userProjectService
