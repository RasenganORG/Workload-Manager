import axios from "axios";
const USERS_URL = "http://localhost:8080/api/users/"

//get all users
const getAllUsers = async () => {
  const response = await axios.get(USERS_URL);

  return response.data
}

const userService = {
  getAllUsers
}

export default userService
