import axios from "axios";
const PROJECTS_URL = "http://localhost:8080/api/projects/"
const PROJECT_URL = "http://localhost:8080/api/project/"

//get all projects
const getProjects = async () => {
	const response = await axios.get(PROJECTS_URL);

	return response.data
}

//add a project
const addProject = async (projectData) => {
	const response = await axios.post(PROJECT_URL, projectData)

	return response.data
}

const projectsService = {
	getProjects,
	addProject
}

export default projectsService
