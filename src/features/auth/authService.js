import axios from "axios";
const REGISTER_URL = "http://localhost:8080/api/user"
const LOGIN_URL = "http://localhost:8080/api/getLoggedUser/"

//register user
const register = async (userData) => {
	const response = await axios.post(REGISTER_URL, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}
//login user
const login = async (userData) => {
	const response = await axios.get(
		`${LOGIN_URL}${userData.email}/?pwd=${userData.password}`
	);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

//logout user
const logout = () => {
	localStorage.removeItem("user")
}
const authService = {
	register,
	logout,
	login
}

export default authService