import axios from "axios";
const BACKLOG_URL = "http://localhost:8083/api/backlog/"

const getBacklogItems = async () => {
  const response = await axios.get(`${BACKLOG_URL}getAll`)

  return response.data
}

const backlogService = {
  getBacklogItems
}

export default backlogService
