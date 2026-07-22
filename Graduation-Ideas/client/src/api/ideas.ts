import axios from "axios";

const api = axios.create({
  baseURL: "https://gp-brainstorming-production.up.railway.app",
});

export default api;