
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


const userProjectService = {
  addUserProject,
  removeUserProjects,
  removeProjectUsers,
  getUserProjects,
  getProjectUsers
}

export default userProjectService
