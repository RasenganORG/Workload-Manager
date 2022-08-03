import axios from "axios";
const ALL_PROJECTS_URL = "http://localhost:8080/api/projects/"

//get all projects
const getProjects = async () => {
	const PROJECTS_URL = "http://localhost:8080/api/projects/"

	const response = await axios.get(PROJECTS_URL);

	return response.data
}

//add a project
const addProject = async (projectData) => {
	const ADD_PROJECT_URL = "http://localhost:8080/api/project/"
	const response = await axios.post(ADD_PROJECT_URL, projectData)

	return response.data
}

//get an individual project 
const getProject = async (projectId) => {
	const GET_PROJECT_URL = `http://localhost:8080/api/project/${projectId}`
	const response = await axios.get(GET_PROJECT_URL)

	return response.data
}
const projectsService = {
	getProjects,
	addProject,
	getProject
}

export default projectsService
