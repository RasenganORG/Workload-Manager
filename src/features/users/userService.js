import axios from "axios";
const USERS_URL = "http://localhost:8080/api/users/"
const USER_URL = "http://localhost:8080/api/user/"

//get all users
const getAllUsers = async () => {
  const response = await axios.get(USERS_URL);

  return response.data
}

//get an individual user
const getUser = async (userId) => {
  const response = await axios.get(`${USER_URL}${userId}`);

  return response.data
}

//update an user
const updateUser = async (data, userId) => {
  const response = await axios.put(`${USER_URL}${userId}`, data);

  return response.data
}

const updateUsersProject = async (users, projectId) => {
  const response = await axios.put(`${USERS_URL}${projectId}`, users);

  return response.data
}

const userService = {
  getAllUsers,
  getUser,
  updateUser,
  updateUsersProject
}

export default userService
